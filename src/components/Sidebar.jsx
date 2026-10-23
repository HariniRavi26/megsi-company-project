import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { navGroups } from '../data/navigation.js';

function Logo() {
  return (
    <div className="logo" aria-label="MEGSI Security Workforce Management">
      <svg className="logo__mark" viewBox="0 0 64 56" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82ff" />
            <stop offset="1" stopColor="#1d4fd8" />
          </linearGradient>
        </defs>
        <path d="M32 3 6 12v16c0 13 10.5 21.5 26 25 15.5-3.5 26-12 26-25V12L32 3Z" fill="url(#logoGrad)" />
        <path
          d="M19 38V21l13 14 13-14v17"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="logo__text">
        <span className="logo__name">MEGSI</span>
        <span className="logo__tag">SECURITY WORKFORCE MANAGEMENT</span>
      </div>
    </div>
  );
}

export default function Sidebar({ onNavigate, onClose }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__top">
        <Logo />
        <button type="button" className="sidebar__close" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar__nav">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.title}>
            {group.slug ? (
              <NavLink
                to={`/${group.slug}`}
                end
                onClick={onNavigate}
                className={({ isActive }) => `nav-group__title nav-group__title--link${isActive ? ' is-active' : ''}`}
              >
                {group.title}
              </NavLink>
            ) : (
              <p className="nav-group__title">{group.title}</p>
            )}
            <ul>
              {group.items.map(({ label, slug, icon: Icon }) => (
                <li key={label}>
                  <NavLink
                    to={`/${slug}`}
                    end
                    onClick={onNavigate}
                    className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
                  >
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
