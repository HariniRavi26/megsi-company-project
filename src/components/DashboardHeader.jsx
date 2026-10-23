import { useCallback, useEffect, useState } from 'react';
import { Home, CalendarDays, UserPlus, Building2, CalendarPlus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Modal from './Modal.jsx';
import { currentUser, mockNow, quickActions } from '../data/mockData.js';

const ICONS = {
  userPlus: UserPlus,
  building: Building2,
  calendarPlus: CalendarPlus,
  alert: AlertTriangle,
};

function ActionForm({ action, onCancel, onSubmit }) {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.currentTarget).entries());
        onSubmit(action, values);
      }}
    >
      <p className="form__hint">Saved in this browser for this prototype. No external service is contacted.</p>
      {action.fields.map((f) => (
        <label className="field" key={f.name}>
          <span>{f.label}</span>
          {f.type === 'select' && (
            <select name={f.name} defaultValue={f.options[0]}>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
          {f.type === 'textarea' && <textarea name={f.name} rows={3} placeholder={f.placeholder} />}
          {!['select', 'textarea'].includes(f.type) && (
            <input name={f.name} type={f.type} placeholder={f.placeholder} />
          )}
        </label>
      ))}
      <div className="form__actions">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={`btn-primary${action.danger ? ' btn-primary--danger' : ''}`}>
          {action.label}
        </button>
      </div>
    </form>
  );
}

export default function DashboardHeader() {
  const [activeAction, setActiveAction] = useState(null);
  const [toast, setToast] = useState('');

  const closeModal = useCallback(() => setActiveAction(null), []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSubmit = (action, values) => {
    const storageKey = `megsi-${action.id === 'client' ? 'clients' : action.id === 'site' ? 'sites' : action.id === 'guard' ? 'guards' : action.id === 'shift' ? 'shifts' : 'incidents'}`;
    let existing = [];
    try { existing = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { existing = []; }
    const record = { id: Date.now(), ...values, createdAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify([record, ...existing]));
    window.dispatchEvent(new CustomEvent('megsi-data-changed', { detail: { type: action.id, record } }));
    setActiveAction(null);
    setToast(`${action.title} saved successfully.`);
  };

  return (
    <section className="welcome">
      <div className="welcome__text">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Home size={12} aria-hidden="true" />
          <span>Dashboard</span>
        </nav>
        <h1>
          Good afternoon, {currentUser.firstName} <span aria-hidden="true">👋</span>
        </h1>
        <p>Here&apos;s what&apos;s happening with your security operations today.</p>
      </div>

      <div className="welcome__right">
        <div className="datetime">
          <CalendarDays size={16} aria-hidden="true" />
          <span>{mockNow.dateLabel}</span>
          <strong>{mockNow.time}</strong>
        </div>

        <div className="quick-actions">
          {quickActions.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <button
                type="button"
                key={a.id}
                className={`quick-btn${a.danger ? ' quick-btn--danger' : ''}`}
                onClick={() => setActiveAction(a)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeAction && (
        <Modal title={activeAction.title} onClose={closeModal}>
          <ActionForm action={activeAction} onCancel={closeModal} onSubmit={handleSubmit} />
        </Modal>
      )}

      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>{toast}</span>
        </div>
      )}
    </section>
  );
}
