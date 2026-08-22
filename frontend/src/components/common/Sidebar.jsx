import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Tag } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/expenses', label: 'Expenses', icon: Receipt },
    { path: '/categories', label: 'Categories', icon: Tag },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.activeLink : {}),
              })}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: 'var(--color-card)',
    borderRight: '1px solid var(--color-card-border)',
    padding: '24px 16px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: 'var(--border-radius-sm)',
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all var(--transition-speed)',
  },
  activeLink: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
  },
};
