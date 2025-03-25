import { useState } from 'react';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import styles from "./auth.module.scss"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
// import LinearProgress from '@mui/joy/LinearProgress';
// import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';


interface JwtPayloadNew extends JwtPayload {
  unique_name: string
}

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
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7003/api/auth/login', {
        username: login,
        password: password,
        isEmployee: isEmployee,
      });

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setError("");
      }
      alert(response.status == 200 ? "Успешно" : "Ошибка");
      if (response.status == 200) {
        navigate("/home");

        dispatch(setUser(response.data.user));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Ошибка при получении токена');
    }
  };



  const GetMe = async () => {
    try {
      // Замените URL на ваш эндпоинт для получения информации о пользователе
      const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа
      const response = await axios.get('https://localhost:7003/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data); // Выводим данные пользователя
    } catch (err) {
      console.error(err);
      setError('Ошибка при получении токена');
    }
  };
  const TestC = async () => {
    try {
      // Замените URL на ваш эндпоинт для получения информации о пользователе
      const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа
      const response = await axios.get('https://localhost:7003/api/auth/test', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data); // Выводим данные пользователя
    } catch (err) {
      console.error(err);
      setError('Ошибка при получении токена');
    }
  };


  const handleGetUsername = () => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayloadNew>(storedToken);
        setUsername(decoded.unique_name); // Предполагается, что имя пользователя хранится в утверждении 'name'
        console.log(decoded.unique_name)
        console.log(decoded)
        setError('');
      } catch (err) {
        console.error('Invalid token', err);
        setError('Неверный токен');
      }
    } else {
      setError('Токен не найден');
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
      <div style={{ display: 'none' }} >
        <h2>Аутентификация</h2>

        <button onClick={handleLogin}>Получить токен</button>
        <button onClick={handleGetUsername}>Получить имя по токену</button>
        <button onClick={GetMe}>GetMe</button>
        <button onClick={TestC}>test</button>

        {token && (
          <div>
            <h3>Ваш токен:</h3>
            <p>{token}</p>
          </div>
        )}

        {username && (
          <div>
            <h3>Имя пользователя:</h3>
            <p>{username}</p>
          </div>
        )}

        {error && (
          <div>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AuthComponent;