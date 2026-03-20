import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import QuickActions from './QuickActions';

export default function SiteLayout({ onOpenContact }) {
  return (
    <div className="site-shell">
      <Header onOpenContact={onOpenContact} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <QuickActions onOpenContact={onOpenContact} />
    </div>
  );
}
