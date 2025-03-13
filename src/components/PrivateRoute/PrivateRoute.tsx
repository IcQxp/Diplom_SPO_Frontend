import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PrivateRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  if (!user) {
    // Если пользователь не авторизован, перенаправляем на страницу авторизации
    return <Navigate to="/Auth" replace />;
  }

  // Если пользователь авторизован, отображаем дочерние компоненты
  return <Outlet />;
};

export default PrivateRoute;