import React, { useEffect, useMemo, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Alert, CircularProgress, Stack, Tab, Tabs, TextField } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../api/client';
import { PremiumButton } from '../components/ui';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminChatsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'immobilienverwaltung';
  const chatId = Number(searchParams.get('chat') || 0) || null;
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [unreadSummary, setUnreadSummary] = useState({ unreadChats: 0, immobilienverwaltungUnreadChats: 0, dienstleistungenUnreadChats: 0 });

  const refreshList = async (preferredChatId = chatId) => {
    const payload = await apiFetch(`/admin/chats?category=${category}`);
    const nextConversations = payload.conversations || [];
    setConversations(nextConversations);
    setUnreadSummary(payload.unread || { unreadChats: 0, immobilienverwaltungUnreadChats: 0, dienstleistungenUnreadChats: 0 });

    if (!nextConversations.length) {
      setSearchParams({ category }, { replace: true });
      return;
    }

    const preferredExists = preferredChatId && nextConversations.some((entry) => entry.id === preferredChatId);
    if (!preferredExists) {
      setSearchParams({ category, chat: String(nextConversations[0].id) }, { replace: true });
    }
  };

  useEffect(() => {
    setSelectedConversation(null);
    setMessage('');
    setLoading(true);
    refreshList(null).catch((err) => setFeedback({ error: err.message, success: '' })).finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    if (!chatId) {
      setSelectedConversation(null);
      return;
    }
    setDetailLoading(true);
    apiFetch(`/admin/chats/${chatId}`)
      .then((payload) => setSelectedConversation(payload.conversation))
      .catch((err) => setFeedback({ error: err.message, success: '' }))
      .finally(() => setDetailLoading(false));
  }, [chatId]);

  const openerMessage = useMemo(() => selectedConversation?.messages?.[0] || null, [selectedConversation]);
  const threadMessages = useMemo(() => (selectedConversation?.messages || []).slice(1), [selectedConversation]);
  const openerBubbleClass = openerMessage?.senderRole === 'admin' ? 'is-own' : 'is-other';

  const handleReply = async (event) => {
    event.preventDefault();
    setFeedback({ error: '', success: '' });
    try {
      await apiFetch(`/admin/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify({ message }) });
      setMessage('');
      setFeedback({ error: '', success: 'Antwort gesendet.' });
      await refreshList(chatId);
      const payload = await apiFetch(`/admin/chats/${chatId}`);
      setSelectedConversation(payload.conversation);
    } catch (err) {
      setFeedback({ error: err.message, success: '' });
    }
  };

  return (
    <section className="section">
      <div className="container compact-shell stack-gap">
        <div className="admin-card">
          <p className="eyebrow">Admin</p>
          <h1>Chats {unreadSummary.unreadChats > 0 ? <span className="inline-badge">{unreadSummary.unreadChats}</span> : null}</h1>
          <p>Alle Konversationen sind nach Immobilienverwaltung und Dienstleistungen getrennt.</p>
        </div>
        <Tabs value={category} onChange={(_e, value) => setSearchParams({ category: value })} sx={{ mb: 1 }}>
          <Tab value="immobilienverwaltung" label={`Immobilienverwaltung${unreadSummary.immobilienverwaltungUnreadChats ? ` (${unreadSummary.immobilienverwaltungUnreadChats})` : ''}`} />
          <Tab value="dienstleistungen" label={`Dienstleistungen${unreadSummary.dienstleistungenUnreadChats ? ` (${unreadSummary.dienstleistungenUnreadChats})` : ''}`} />
        </Tabs>

        <div className="chat-layout">
          <aside className="chat-sidebar">
            {loading ? <Stack alignItems="center" sx={{ py: 5 }}><CircularProgress /></Stack> : conversations.length ? conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`chat-list-item ${conversation.id === chatId ? 'is-active' : ''} ${conversation.adminHasUnread ? 'is-unread' : ''}`}
                onClick={() => setSearchParams({ category, chat: String(conversation.id) })}
              >
                <div className="chat-list-item-top">
                  <strong>{conversation.subject}</strong>
                  {conversation.adminHasUnread ? <span className="chat-unread-dot" aria-label="Ungelesener Chat" /> : null}
                </div>
                <span>{conversation.userName} · {conversation.userEmail}</span>
                <small>{formatDate(conversation.updatedAt)}</small>
              </button>
            )) : <div className="chat-empty-card">Keine Chats in diesem Bereich.</div>}
          </aside>

          <div className="chat-detail-card">
            {feedback.error ? <Alert severity="error" sx={{ mb: 2 }}>{feedback.error}</Alert> : null}
            {feedback.success ? <Alert severity="success" sx={{ mb: 2 }}>{feedback.success}</Alert> : null}
            {detailLoading ? <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack> : selectedConversation ? (
              <>
                <div className="chat-scroll-area">
                <div className="chat-topic-card">
                  <p className="eyebrow">Chat eröffnet mit</p>
                  <h2>{selectedConversation.subject}</h2>
                  <p><strong>Nutzer:</strong> {selectedConversation.user.name} · {selectedConversation.user.email}</p>
                  {selectedConversation.serviceLabel ? <p><strong>Leistung:</strong> {selectedConversation.serviceLabel}</p> : null}
                  {selectedConversation.apartmentTitle ? <p><strong>Wohnung:</strong> {selectedConversation.apartmentTitle}</p> : null}
                  {selectedConversation.apartmentSlug ? (
                    <p><strong>Anzeige:</strong> <a href={`/#/immobilienverwaltung/wohnungen/${selectedConversation.apartmentSlug}`}>öffnen</a></p>
                  ) : null}
                  {openerMessage ? (
                    <div className={`chat-opener-message ${openerBubbleClass}`}>
                      <strong>{openerMessage.senderName}</strong>
                      <p>{openerMessage.message}</p>
                      <small>{formatDate(openerMessage.createdAt)}</small>
                    </div>
                  ) : null}
                </div>
                <div className="chat-thread">
                  {threadMessages.map((entry) => (
                    <div key={entry.id} className={`chat-bubble ${entry.senderRole === 'admin' ? 'is-own' : 'is-other'}`}>
                      <strong>{entry.senderName}</strong>
                      <p>{entry.message}</p>
                      <small>{formatDate(entry.createdAt)}</small>
                    </div>
                  ))}
                </div>
                </div>
                <form className="chat-reply-form" onSubmit={handleReply}>
                  <TextField
                    multiline
                    minRows={4}
                    label="Antwort im Chat"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    fullWidth
                    required
                  />
                  <div className="form-actions">
                    <PremiumButton type="submit" endIcon={<SendRoundedIcon />}>Antwort senden</PremiumButton>
                    <PremiumButton type="button" variant="outlined" onClick={() => navigate('/admin')}>Zum Admin-Bereich</PremiumButton>
                  </div>
                </form>
              </>
            ) : <div className="chat-empty-card">Wählen Sie links einen Chat aus.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
