// components/Layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';
import { Footer } from '../Footer/Footer';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main style={{marginTop:"100px", minHeight:"100vh"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;