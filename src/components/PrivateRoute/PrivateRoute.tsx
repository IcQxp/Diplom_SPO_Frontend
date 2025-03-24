import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PrivateRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  if (!user) {
    return <Navigate to="/Auth" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;