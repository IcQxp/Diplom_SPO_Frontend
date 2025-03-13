import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { RootState } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const location = useLocation();
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Отключаем кнопку на одну секунду
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000); // 1000 миллисекунд = 1 секунда

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  // Не отображаем Header на странице авторизации
  if (location.pathname.toLowerCase() === '/auth') {
    return null;
  }

  // Если пользователь не загружен, отображаем заглушку
  if (!user) {
    return (
      <header className={styles.header}>
        <button disabled={isButtonDisabled} onClick={() => navigate('/auth')}>Войти</button>
      </header>
    );
  }

  // Проверяем наличие полей lastname и firstname
  const fullName = `${user.lastname || ''} ${user.firstname || ''}`.trim() || 'Unknown User';

  return (
    <header className={styles.header}>
      <div>
        <p>Вы: {fullName}</p>
      </div>
    </header>
  );
};