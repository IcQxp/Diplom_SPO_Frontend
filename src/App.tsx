import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HomePage } from './components/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import AuthComponent from './auth/auth';
import { FilesList } from './components/FilesList/FilesList';
import { DocumentPage } from './pages/Documents/DocumentPage/DocumentPage';
import { Profile } from './pages/Profile/Profile';
import { getMe } from './api/api-utils';
import { setUser } from './store/userSlice';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await getMe(token);
          dispatch(setUser(response.user));
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token'); // Удаляем токен, если произошла ошибка
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>; // Компонент загрузки
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Home" />} />
          <Route path="Home" element={<HomePage />} />
          <Route path="Rating" element={<HomePage />} />
          <Route path="Auth" element={<AuthComponent />} />

          {/* Защищенные маршруты */}
          <Route element={<PrivateRoute />}>
            <Route path="Admin">
              <Route path="Documents" element={<FilesList />} />
              <Route path="Document/:id" element={<DocumentPage />} />
            </Route>
            <Route path="Profile" element={<Profile />} />
          </Route>

          {/* Страница 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;