import React, { useEffect, useMemo, useState } from 'react';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Alert, CircularProgress, Stack, TextField } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/client';
import { PremiumButton } from '../components/ui';
import { useAuth } from '../auth/AuthContext';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function UserChatsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [unreadSummary, setUnreadSummary] = useState({ unreadChats: 0, unreadMessages: 0 });
  const activeId = id ? Number(id) : null;

  const refreshList = async (preferredId = activeId) => {
    const payload = await apiFetch('/chats/my');
    setConversations(payload.conversations || []);
    setUnreadSummary(payload.unread || { unreadChats: 0, unreadMessages: 0 });
    if (!preferredId && payload.conversations?.length) {
      navigate(`/konto/nachrichten/${payload.conversations[0].id}`, { replace: true });
    }
  };

  useEffect(() => {
    setLoading(true);
    refreshList().catch((err) => setFeedback({ error: err.message, success: '' })).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeId) return;
    setDetailLoading(true);
    apiFetch(`/chats/${activeId}`)
      .then((payload) => setSelectedConversation(payload.conversation))
      .catch((err) => setFeedback({ error: err.message, success: '' }))
      .finally(() => setDetailLoading(false));
  }, [activeId]);

  const openerMessage = useMemo(() => selectedConversation?.messages?.[0] || null, [selectedConversation]);
  const threadMessages = useMemo(() => (selectedConversation?.messages || []).slice(1), [selectedConversation]);
  const openerBubbleClass = openerMessage?.senderRole === 'user' ? 'is-own' : 'is-other';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ error: '', success: '' });
    try {
      await apiFetch(`/chats/${activeId}/messages`, { method: 'POST', body: JSON.stringify({ message }) });
      setMessage('');
      setFeedback({ error: '', success: 'Nachricht gesendet.' });
      await refreshList(activeId);
      const payload = await apiFetch(`/chats/${activeId}`);
      setSelectedConversation(payload.conversation);
    } catch (err) {
      setFeedback({ error: err.message, success: '' });
    }
  };

  if (isAdmin) {
    return <Navigate to="/admin/chats" replace />;
  }

  if (loading) {
    return <Stack alignItems="center" sx={{ py: 8 }}><CircularProgress /></Stack>;
  }

  return (
    <section className="section">
      <div className="container compact-shell stack-gap">
        <div className="admin-card">
          <p className="eyebrow">Persönlicher Bereich</p>
          <h1>Nachrichten {unreadSummary.unreadChats > 0 ? <span className="inline-badge">{unreadSummary.unreadChats}</span> : null}</h1>
          <p>Hier sehen Sie alle Anfragen und Antworten von AS Immobilienverwaltung &amp; Dienstleistungen.</p>
        </div>

        <div className="chat-layout">
          <aside className="chat-sidebar">
            {conversations.length ? conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`chat-list-item ${conversation.id === activeId ? 'is-active' : ''} ${conversation.userHasUnread ? 'is-unread' : ''}`}
                onClick={() => navigate(`/konto/nachrichten/${conversation.id}`)}
              >
                <div className="chat-list-item-top">
                  <strong>{conversation.subject}</strong>
                  {conversation.userHasUnread ? <span className="chat-unread-dot" aria-label="Ungelesener Chat" /> : null}
                </div>
                <span>{conversation.lastMessage}</span>
                <small>{formatDate(conversation.updatedAt)}</small>
              </button>
            )) : <div className="chat-empty-card">Noch keine Chats vorhanden.</div>}
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
                  {selectedConversation.serviceLabel ? <p><strong>Leistung:</strong> {selectedConversation.serviceLabel}</p> : null}
                  {selectedConversation.apartmentTitle ? <p><strong>Wohnung:</strong> {selectedConversation.apartmentTitle}</p> : null}
                  {openerMessage ? (
                    <div className={`chat-opener-message ${openerBubbleClass}`}>
                      <strong>{openerMessage.senderName}</strong>
                      <p>{openerMessage.message}</p>
                      <small>{formatDate(openerMessage.createdAt)}</small>
                    </div>
                  ) : null}
                </div>
                <div className="chat-thread">
                  {threadMessages.length ? threadMessages.map((entry) => (
                    <div key={entry.id} className={`chat-bubble ${entry.senderRole === 'user' ? 'is-own' : 'is-other'}`}>
                      <strong>{entry.senderName}</strong>
                      <p>{entry.message}</p>
                      <small>{formatDate(entry.createdAt)}</small>
                    </div>
                  )) : (
                    <div className="chat-empty-card compact"><ForumRoundedIcon fontSize="small" /> Noch keine weitere Antwort vorhanden.</div>
                  )}
                </div>
                </div>
                <form className="chat-reply-form" onSubmit={handleSubmit}>
                  <TextField
                    multiline
                    minRows={4}
                    label="Antwort schreiben"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    fullWidth
                    required
                  />
                  <div className="form-actions">
                    <PremiumButton type="submit" endIcon={<SendRoundedIcon />}>Im Chat antworten</PremiumButton>
                  </div>
                </form>
              </>
            ) : (
              <div className="chat-empty-card">Wählen Sie links einen Chat aus.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
