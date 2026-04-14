<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Methode nicht erlaubt.']);
    exit;
}

function json_response(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_env_file(string $path): array {
    if (!is_file($path)) {
        return [];
    }

    $vars = [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $value = trim($parts[1]);
        $value = trim($value, "\"'");

        $vars[$key] = $value;
    }

    return $vars;
}

function env_value(string $key, ?string $default = null): ?string {
    static $vars = null;

    if ($vars === null) {
        $baseDir = dirname(__DIR__);
        $vars = [];

        $customEnvFile = getenv('ENV_FILE');
        if ($customEnvFile && is_file($customEnvFile)) {
            $vars = array_merge($vars, load_env_file($customEnvFile));
        }

        $candidateFiles = [
            $baseDir . DIRECTORY_SEPARATOR . '.env',
            dirname($baseDir) . DIRECTORY_SEPARATOR . '.env',
        ];

        foreach ($candidateFiles as $file) {
            if (is_file($file)) {
                $vars = array_merge($vars, load_env_file($file));
            }
        }
    }

    $value = getenv($key);
    if ($value !== false) {
        return $value;
    }

    return $vars[$key] ?? $default;
}

function normalize_line_breaks(string $value): string {
    return preg_replace("/\r\n|\r|\n/", "\n", $value) ?? $value;
}

function sanitize_header_value(string $value): string {
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function e(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function format_message_html(string $message): string {
    $safe = e(normalize_line_breaks($message));
    return nl2br($safe, false);
}

function build_subject(string $type, string $service): string {
    if ($type === 'Immobilienverwaltung') {
        return 'Neue Anfrage Immobilienverwaltung';
    }

    if ($service !== '') {
        return 'Neue Dienstleistungsanfrage: ' . $service;
    }

    return 'Neue Dienstleistungsanfrage';
}

function smtp_expect($socket, array $expectedCodes): string {
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;

        if (preg_match('/^([0-9]{3})\s/', $line, $matches)) {
            $code = (int)$matches[1];

            if (in_array($code, $expectedCodes, true)) {
                return $response;
            }

            throw new RuntimeException('SMTP-Fehler: ' . trim($response));
        }
    }

    throw new RuntimeException('Keine gültige SMTP-Antwort erhalten.');
}

function smtp_command($socket, string $command, array $expectedCodes): string {
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $expectedCodes);
}

function smtp_send_mail(array $config, string $fromEmail, string $toEmail, string $rawMessage): void {
    $host = $config['host'];
    $port = (int)$config['port'];
    $encryption = strtolower($config['encryption'] ?? 'tls');
    $username = $config['username'] ?? '';
    $password = $config['password'] ?? '';
    $timeout = 20;

    $remoteHost = ($encryption === 'ssl' ? 'ssl://' : '') . $host;
    $socket = @stream_socket_client($remoteHost . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT);

    if (!$socket) {
        throw new RuntimeException('SMTP-Verbindung fehlgeschlagen: ' . $errstr . ' (' . $errno . ')');
    }

    stream_set_timeout($socket, $timeout);

    try {
        smtp_expect($socket, [220]);
        $hostname = gethostname() ?: 'localhost';

        smtp_command($socket, 'EHLO ' . $hostname, [250]);

        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);

            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('TLS konnte nicht aktiviert werden.');
            }

            smtp_command($socket, 'EHLO ' . $hostname, [250]);
        }

        if ($username !== '') {
            smtp_command($socket, 'AUTH LOGIN', [334]);
            smtp_command($socket, base64_encode($username), [334]);
            smtp_command($socket, base64_encode($password), [235]);
        }

        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $messageData = preg_replace("/(?<!\r)\n/", "\r\n", $rawMessage) ?? $rawMessage;
        $messageData = str_replace("\r\n.", "\r\n..", $messageData);

        fwrite($socket, $messageData . "\r\n.\r\n");
        smtp_expect($socket, [250]);
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    json_response(400, ['ok' => false, 'message' => 'Ungültige Anfrage.']);
}

$email = trim((string)($data['email'] ?? ''));
$type = trim((string)($data['type'] ?? ''));
$service = trim((string)($data['service'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$honeypot = trim((string)($data['website'] ?? ''));
$consent = (bool)($data['consent'] ?? false);
$startedAt = (int)($data['startedAt'] ?? 0);

if ($honeypot !== '') {
    json_response(400, ['ok' => false, 'message' => 'Anfrage konnte nicht verarbeitet werden.']);
}

$minSeconds = max(2, (int)(env_value('MIN_FORM_FILL_SECONDS', '4') ?? '4'));
$nowMillis = (int)round(microtime(true) * 1000);

if ($startedAt <= 0 || (($nowMillis - $startedAt) / 1000) < $minSeconds) {
    json_response(429, ['ok' => false, 'message' => 'Das Formular wurde zu schnell abgesendet. Bitte versuche es erneut.']);
}

$errors = [];

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 190) {
    $errors['email'] = 'Bitte eine gültige E-Mail-Adresse eingeben.';
}

$allowedTypes = ['Immobilienverwaltung', 'Dienstleistungen'];
if (!in_array($type, $allowedTypes, true)) {
    $errors['type'] = 'Ungültige Anfrageart.';
}

$allowedServices = ['', 'Mietmaschinist als Dienstleister', 'Maschinenverleih mit Maschinist'];
if ($type === 'Dienstleistungen' && !in_array($service, $allowedServices, true)) {
    $errors['service'] = 'Ungültige Dienstleistungsart.';
}

if ($type === 'Immobilienverwaltung') {
    $service = 'Immobilienverwaltung';
}

if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    $errors['message'] = 'Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.';
}

if (!$consent) {
    $errors['consent'] = 'Die Datenschutzerklärung muss bestätigt werden.';
}

if ($errors !== []) {
    json_response(422, ['ok' => false, 'message' => 'Bitte Eingaben prüfen.', 'errors' => $errors]);
}

$typeRecipients = [
    'Immobilienverwaltung' => 'a.striemer@as-immobilienverwaltung.de',
    'Dienstleistungen' => 'f.striemer@as-immobilienverwaltung.de',
];

$config = [
    'host' => env_value('SMTP_HOST', ''),
    'port' => env_value('SMTP_PORT', '587'),
    'encryption' => env_value('SMTP_ENCRYPTION', 'tls'),
    'username' => env_value('SMTP_USERNAME', ''),
    'password' => env_value('SMTP_PASSWORD', ''),
    'from_address' => env_value('MAIL_FROM_ADDRESS', ''),
    'from_name' => env_value('MAIL_FROM_NAME', 'Website Anfrageformular'),
    'to_address' => $typeRecipients[$type] ?? '',
];

foreach (['host', 'port', 'from_address', 'to_address'] as $requiredKey) {
    if (($config[$requiredKey] ?? '') === '') {
        json_response(500, ['ok' => false, 'message' => 'E-Mail-Konfiguration ist unvollständig.']);
    }
}

if (($config['username'] ?? '') !== '' && ($config['password'] ?? '') === '') {
    json_response(500, ['ok' => false, 'message' => 'SMTP-Passwort fehlt in der Konfiguration.']);
}

$fromAddress = sanitize_header_value($config['from_address']);
$toAddress = sanitize_header_value($config['to_address']);
$fromName = sanitize_header_value($config['from_name']);
$replyTo = sanitize_header_value($email);
$subject = sanitize_header_value(build_subject($type, $service));

$textBody = implode("\n", [
    $subject,
    str_repeat('=', mb_strlen($subject)),
    '',
    'Es ist eine neue Anfrage über das Anfrageformular eingegangen.',
    '',
    'Bereich: ' . $type,
    'Leistungsart: ' . $service,
    'E-Mail: ' . $email,
    '',
    'Nachricht:',
    normalize_line_breaks($message),
    '',
    'Direkt antworten: ' . $email,
]);

$replyMailTo = 'mailto:' . e($email);
$replyButtonMailTo = 'mailto:' . e($email) . '?subject=' . rawurlencode('Re: ' . $subject);

$htmlBody = '<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>' . e($subject) . '</title>
</head>
<body style="margin:0; padding:0; background:#efefee; font-family:Arial, Helvetica, sans-serif; color:#1f2327;">
  <div style="margin:0; padding:32px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:720px; border-collapse:collapse;">
            <tr>
              <td style="padding:0 0 14px 0; text-align:center; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#6d7378;">
                AS Immobilienverwaltung & Dienstleistungen
              </td>
            </tr>

            <tr>
              <td style="background:linear-gradient(135deg, #1f2327 0%, #3a4045 58%, #8f958f 100%); border-radius:22px 22px 0 0; padding:34px 32px 28px 32px; color:#ffffff;">
                <div style="font-size:13px; line-height:1.4; letter-spacing:0.08em; text-transform:uppercase; opacity:0.9;">
                  Website Anfrage
                </div>
                <h1 style="margin:10px 0 0 0; font-size:28px; line-height:1.25; font-weight:700; color:#ffffff;">
                  ' . e($subject) . '
                </h1>
              </td>
            </tr>

            <tr>
              <td style="background:#ffffff; border-left:1px solid #d9d7d2; border-right:1px solid #d9d7d2; padding:30px 32px 8px 32px;">
                <p style="margin:0 0 24px 0; font-size:16px; line-height:1.7; color:#495057;">
                  Über das Anfrageformular der Website ist eine neue Anfrage eingegangen.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate; border-spacing:0; background:#f7f6f4; border:1px solid #e1ddd6; border-radius:16px; overflow:hidden;">
                  <tr>
                    <td style="padding:14px 18px; width:165px; font-size:14px; font-weight:700; color:#5e6469; border-bottom:1px solid #e1ddd6;">Bereich</td>
                    <td style="padding:14px 18px; font-size:15px; color:#1f2327; border-bottom:1px solid #e1ddd6;">' . e($type) . '</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px; width:165px; font-size:14px; font-weight:700; color:#5e6469; border-bottom:1px solid #e1ddd6;">Leistungsart</td>
                    <td style="padding:14px 18px; font-size:15px; color:#1f2327; border-bottom:1px solid #e1ddd6;">' . e($service) . '</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px; width:165px; font-size:14px; font-weight:700; color:#5e6469;">E-Mail</td>
                    <td style="padding:14px 18px; font-size:15px; color:#1f2327;">
                      <a href="' . $replyMailTo . '" style="color:#2f353a; text-decoration:none; font-weight:700;">' . e($email) . '</a>
                    </td>
                  </tr>
                </table>

                <div style="height:26px; line-height:26px;">&nbsp;</div>

                <div style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#6d7378;">
                  Nachricht
                </div>

                <div style="background:#fcfcfb; border:1px solid #e1ddd6; border-left:5px solid #3a4045; border-radius:16px; padding:20px 22px; font-size:16px; line-height:1.75; color:#283038;">
                  ' . format_message_html($message) . '
                </div>

                <div style="height:28px; line-height:28px;">&nbsp;</div>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="border-radius:12px; background:#1f2327;">
                      <a href="' . $replyButtonMailTo . '" style="display:inline-block; padding:14px 22px; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:12px;">
                        Direkt auf diese Anfrage antworten
                      </a>
                    </td>
                  </tr>
                </table>

                <div style="height:26px; line-height:26px;">&nbsp;</div>
              </td>
            </tr>

            <tr>
              <td style="background:#f7f6f4; border:1px solid #d9d7d2; border-top:none; border-radius:0 0 22px 22px; padding:18px 32px 22px 32px; font-size:13px; line-height:1.6; color:#757a7e;">
                Diese Nachricht wurde automatisch über das Anfrageformular der Website versendet.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>';

$boundary = '=_Part_' . bin2hex(random_bytes(12));

$headers = [
    'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . ' <' . $fromAddress . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'Date: ' . date(DATE_RFC2822),
];

$rawMessage = 'Subject: ' . mb_encode_mimeheader($subject, 'UTF-8') . "\r\n"
    . 'To: <' . $toAddress . ">\r\n"
    . implode("\r\n", $headers)
    . "\r\n\r\n"
    . '--' . $boundary . "\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $textBody . "\r\n\r\n"
    . '--' . $boundary . "\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $htmlBody . "\r\n\r\n"
    . '--' . $boundary . '--';

try {
    smtp_send_mail($config, $fromAddress, $toAddress, $rawMessage);
    json_response(200, ['ok' => true, 'message' => 'Anfrage erfolgreich versendet.']);
} catch (Throwable $e) {
    error_log('Anfrageformular Mailfehler: ' . $e->getMessage());
    json_response(500, ['ok' => false, 'message' => 'Die E-Mail konnte momentan nicht versendet werden.']);
}
