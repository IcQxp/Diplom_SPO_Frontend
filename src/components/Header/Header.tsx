// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import styles from './Header.module.scss';
// import { RootState } from '../../store/store';
// import { useLocation, useNavigate } from 'react-router-dom';

// export const Header: React.FC = () => {
//   const user = useSelector((state: RootState) => state.user.userInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsButtonDisabled(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (location.pathname.toLowerCase() === '/auth') {
//     return null;
//   }

//   if (!user) {
//     return (
//       <header className={styles.header}>
//         <button disabled={isButtonDisabled} onClick={() => navigate('/auth')}>Войти</button>
//       </header>
//     );
//   }

//   const fullName = `${user.lastname || ''} ${user.firstname || ''}`.trim() || 'Unknown User';

//   return (
//     <header className={styles.header}>
//       <div>
//         <p>Вы: {fullName}</p>
//       </div>
//     </header>
//   );
// };
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Отслеживание скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Разблокировка кнопки через 1 секунду
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Не отображать Header на странице /auth
  if (location.pathname.toLowerCase() === '/auth') {
    return null;
  }

  // Если пользователь не авторизован
  if (!user) {
    return (
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <button disabled={isButtonDisabled} onClick={() => navigate('/auth')} className={styles.loginButton}>
          Войти
        </button>
      </header>
    );
  }

  // Если пользователь авторизован
  const fullName = `${user.lastname || ''} ${user.firstname || ''}`.trim() || 'Unknown User';

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>MyApp</div>
      <div className={styles.userInfo}>
        <p>Вы: {fullName}</p>
        <button className={styles.logoutButton} onClick={() => console.log('Logout')}>
          Выйти
        </button>
      </div>
    </header>
  );
};