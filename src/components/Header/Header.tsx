import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { RootState } from '../../store/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserResponse } from '../../pages/auth/auth';
import { Button } from '@mui/material';
import { clearUser } from '../../store/userSlice';

export const Header: React.FC = () => {
  const user: UserResponse | null = useSelector((state: RootState) => state.user.userInfo);
  const location = useLocation();
  const navigate = useNavigate();

  const [Loading, setLoading] = useState<boolean>(true);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
const dispatch = useDispatch();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (location.pathname.toLowerCase() === '/auth') {
    return null;
  }

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Link to={"/home"} style={{ display: "flex", flexDirection: "row", gap: "12px", alignItems: "center", textDecoration: "none" }}>
        <img src='/icons/socials/logo2.svg' alt='Logo' style={{ maxHeight: "40px" ,width:"100%"}} />
        <div className={styles.logo}>MyUniversity</div>
      </Link>
      <div className={styles.userInfo}>
        {!user ?

          <Button loading={Loading} onClick={() => navigate('/auth')} variant='contained'>Войти</Button>
          : <>
{ user.roleId===0&&           <p className={styles.whoiam}>Вы: <Link to={`/profile/${user.id}`} style={{ textDecoration: "none", color: "#000" }}> {`${user.lastname || ''} ${user.firstname || ''}`.trim() || 'Unknown User'} </Link></p>}
            {user.roleId===1&&<Button variant="contained" size='medium' sx={{fontSize:"min(3vw, 16px)"}} onClick={() => navigate("/admin")}>
              Администрирование
            </Button>}
            <Button onClick={handleLogout} size='medium' variant="contained" sx={{ backgroundColor: "#e53935", fontSize:"min(3vw, 16px)" }}>
              Выйти
            </Button>

          </>
        }
      </div>
    </header>
  );
};