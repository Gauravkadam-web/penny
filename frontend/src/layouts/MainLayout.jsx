import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { useApp } from '../context/AppContext';

export const MainLayout = () => {
  const { notification } = useApp();

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {notification && (
          <div className={`toast toast--${notification.type}`} style={{ margin: 'var(--space-4) var(--space-5)' }}>
            {notification.message}
          </div>
        )}
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
