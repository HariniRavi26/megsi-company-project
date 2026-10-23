import { useEffect, useRef, useState } from 'react';
import { Menu, Search, Bell, CircleHelp, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { currentUser } from '../data/mockData.js';

function UkFlag() {
  return (
    <svg className="flag" viewBox="0 0 60 40" aria-hidden="true">
      <clipPath id="flagClip">
        <rect width="60" height="40" rx="4" />
      </clipPath>
      <g clipPath="url(#flagClip)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#c8102e" strokeWidth="3" />
        <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
        <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="8" />
      </g>
    </svg>
  );
}

function Dropdown({ button, children, align = 'right', label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className="dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
      >
        {button}
      </button>
      {open && (
        <div className={`dropdown__menu dropdown__menu--${align}`} role="menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function TopHeader({ onMenuClick, menuOpen }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('UK');

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn topbar__menu"
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <Menu size={22} />
      </button>

      <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
        <Search size={18} className="search__icon" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients, sites, guards, incidents, documents..."
          aria-label="Search clients, sites, guards, incidents, documents"
        />
      </form>

      <div className="topbar__actions">
        <button type="button" className="icon-btn topbar__bell" aria-label={`${currentUser.notifications} notifications`}>
          <Bell size={22} />
          <span className="badge-dot">{currentUser.notifications}</span>
        </button>

        <button type="button" className="icon-btn topbar__help" aria-label="Help">
          <CircleHelp size={24} />
        </button>

        <div className="topbar__lang">
          <Dropdown
            label="Change language"
            button={
              <>
                <UkFlag />
                <span className="lang-code">{language}</span>
                <ChevronDown size={14} />
              </>
            }
          >
            <button type="button" role="menuitem" onClick={() => setLanguage('UK')}>English (UK)</button>
            <button type="button" role="menuitem" onClick={() => setLanguage('US')}>English (US)</button>
            <button type="button" role="menuitem" onClick={() => setLanguage('IE')}>English (IE)</button>
          </Dropdown>
        </div>

        <Dropdown
          label="Open profile menu"
          button={
            <>
              <span className="avatar avatar--user" aria-hidden="true">{currentUser.initials}</span>
              <span className="user-meta">
                <strong>{currentUser.name}</strong>
                <small>{currentUser.role}</small>
              </span>
              <ChevronDown size={16} className="user-chevron" />
            </>
          }
        >
          <button type="button" role="menuitem"><User size={15} /> My profile</button>
          <button type="button" role="menuitem"><Settings size={15} /> Settings</button>
          <button type="button" role="menuitem"><LogOut size={15} /> Sign out</button>
        </Dropdown>
      </div>
    </header>
  );
}
