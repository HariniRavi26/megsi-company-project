import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import TopHeader from '../components/TopHeader.jsx';

const DESKTOP_QUERY = '(min-width: 1024px)';

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile / tablet drawer
  const [collapsed, setCollapsed] = useState(false); // desktop sidebar collapse
  const location = useLocation();

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const toggleMenu = () => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setCollapsed((c) => !c);
    } else {
      setDrawerOpen((o) => !o);
    }
  };

  // Close the drawer on route change.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  // Close the drawer if the viewport grows to desktop, and lock page scroll while it is open.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => {
      if (e.matches) setDrawerOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const classes = ['layout'];
  if (drawerOpen) classes.push('is-drawer-open');
  if (collapsed) classes.push('is-collapsed');

  return (
    <div className={classes.join(' ')}>
      <Sidebar onNavigate={closeDrawer} onClose={closeDrawer} />
      <button
        type="button"
        className="layout__overlay"
        aria-label="Close navigation menu"
        tabIndex={drawerOpen ? 0 : -1}
        onClick={closeDrawer}
      />
      <div className="layout__main">
        <TopHeader onMenuClick={toggleMenu} menuOpen={drawerOpen} />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
