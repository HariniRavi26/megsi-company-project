import { useState } from 'react';
import { Home, CalendarDays, UserPlus, Shield, ListPlus, FileText, AlertTriangle } from 'lucide-react';

const ACTIONS = [
  { id: 'shift', label: 'Assign Shift', icon: UserPlus },
  { id: 'deploy', label: 'Deploy Guard', icon: Shield },
  { id: 'task', label: 'Create Task', icon: ListPlus },
  { id: 'log', label: 'Log Operation', icon: FileText },
  { id: 'issue', label: 'Report Issue', icon: AlertTriangle, danger: true },
];

export default function OperationsHeader({ clock, open }) {
  return (
    <section className="welcome">
      <div className="welcome__text">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Home size={12} aria-hidden="true" />
          <span>Operations</span>
        </nav>
        <h1>Operations</h1>
        <p>Manage day-to-day security operations, deployments and live activities.</p>
      </div>
      <div className="welcome__right">
        <button type="button" className="datetime datetime--btn" onClick={() => open({ kind: 'clock' })} aria-label="Change date and time">
          <CalendarDays size={16} aria-hidden="true" />
          <span>{clock.dateLabel}</span>
          <strong>{clock.time}</strong>
        </button>
        <div className="quick-actions">
          {ACTIONS.map(({ id, label, icon: Icon, danger }) => (
            <button type="button" key={id} className={`quick-btn${danger ? ' quick-btn--danger' : ''}`} onClick={() => open({ kind: 'form', form: id })}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
