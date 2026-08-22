import React from 'react';
import { Wallet, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <header className="navbar">
      <a href="/" className="navbar__brand">
        <Wallet size={24} color="var(--color-ledger)" />
        <span>Penny</span>
        <span className="badge badge--success">V1</span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} color="var(--color-gold)" /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
