import { useState } from 'react';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import styles from "./auth.module.scss"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

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
const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7003/api/auth/login', {
        username: login,
        password: password,
        isEmployee: false,
      });

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setError("");
      }
      alert(response.status==200?"Успешно":"Ошибка");
      if (response.status==200)
      {
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

  return (
    <main className={styles.page} >
      <div className={styles.container}>
        <h2 className={styles.title}> Вход </h2>
        <div className={styles.login__container}>
        <p className={styles.login__title}>Login</p>
        <input placeholder='Login'
        type='login'
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        className={`${styles.login__input}`} />
        </div>
        <div className={styles.password__container}>
        <p className={styles.password__title}>Password</p>
        <input  placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`${styles.password__input}`} />
        </div>
        <div className={`${styles.buttons__container}`} >
          <button className={`${styles.registration__button}`}>
            Зарегистрироваться
          </button>
          <button className={`${styles.auth__button}`} onClick={handleLogin}>
            Войти
          </button>
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