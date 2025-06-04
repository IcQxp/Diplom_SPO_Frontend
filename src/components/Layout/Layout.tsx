// components/Layout/Layout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';
import { Footer } from '../Footer/Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <div className={styles.layout}>
      <Header />
      <main className={`${!location.pathname.toLowerCase().includes("auth")&&styles.marginT}`} style={{minHeight:"100vh"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;