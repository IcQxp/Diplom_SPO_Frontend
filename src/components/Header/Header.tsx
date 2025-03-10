// components/Header.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { RootState } from '../../store/store'; // Обновите путь к RootState

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  console.log("Рендер хеддер");
  return (
    <header className={styles.header}>
      <p>
        Header
      </p>
      <div>
        <p>User: {user ? user.lastname : 'No user'}</p> {/* Пример использования */}
      </div>
    </header>
  );
};