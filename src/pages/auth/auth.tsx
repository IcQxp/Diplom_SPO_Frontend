import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./auth.module.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Key from '@mui/icons-material/Key';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { RootState } from '../../store/store';

export interface UserResponse {
  lastname?: string;
  firstname?: string;
  patronymic?: string;
  login?: string;
  gender?: string;
  id: number;
  email?: string;
  telephone?: string;
  rolename?: string;
  roleId: number;
  birthDate: string;
}

const AuthComponent = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.user.userInfo);
  const fromPath = new URLSearchParams(location.search).get('redirect') || '/home'; // ✅ Получаем путь для редиректа

  // Используем useEffect для навигации
  useEffect(() => {

    if (user) {
      // navigate("/Home");
      navigate(fromPath, { replace: true }); // ✅ Редирект уже не фиксированный
    }
  }, [user, navigate]);






  const handleLogin = async () => {
    try {
      const response = await axios.post('https://lyashovilyabackend.loca.lt/api/auth/login', {
        username: login,
        password: password,
        isEmployee: isEmployee,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      alert(response.status == 200 ? "Успешно" : "Ошибка");
      if (response.status == 200) {
        // navigate("/home");


        navigate(fromPath, { replace: true }); // ✅ Редирект уже не фиксированный
        dispatch(setUser(response.data.user));

      }
    } catch (err: any) {
      console.error(err);
    }
  };


  // const minLength = 8;
  return (
    <main className={styles.page} >
      <div className={styles.container}>
        <h2 className={styles.title}> Вход </h2>
        <div className={styles.login__container}>
          <p className={styles.login__title}>Login</p>
          <Input color="neutral" variant="outlined" placeholder='Login'
            type='login'
            onChange={(e) => setLogin(e.target.value)}
            value={login} className={styles.input}
          // sx={{fontFamily: 'PixelizerBold'}}
          />
        </div>
        <div className={`${styles.password__container} ${styles.input}`}>
          <p className={styles.password__title}>Password</p>
          <Stack spacing={0.5} sx={{ '--hue': Math.min(password.length * 10, 120) }} >
            <Input
              className={styles.input}
              type="password"
              placeholder="Введите пароль…"
              startDecorator={<Key />}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {/* <LinearProgress

              determinate
              size="sm"
              value={Math.min((password.length * 100) / minLength, 100)}
              sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
            />
            <Typography
              level="body-xs"
              sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
              {password.length < 3 && 'Очень слабый'}
              {password.length >= 3 && password.length < 6 && 'Слабый'}
              {password.length >= 6 && password.length < 8 && 'Надёжный'}
              {password.length >= 8 && 'Очень надёжный'}
            </Typography> */}
          </Stack>



        </div>
        <div className={`${styles.buttons__container}`} >
          <div>
            <label htmlFor='employeeCheckBox' className={styles.checkbox__label}>
              Войти как администратор
            </label>
            <Checkbox id='employeeCheckBox' checked={isEmployee} onChange={(e) => setIsEmployee(e.target.checked)} />
          </div>

          <Button size="small" variant="contained" onClick={handleLogin}>Войти</Button>

        </div>
      </div>
    </main>
  );
};

export default AuthComponent;