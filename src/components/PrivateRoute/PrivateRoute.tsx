import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PrivateRoute: React.FC = () => {
const location =  useLocation();

  const user = useSelector((state: RootState) => state.user.userInfo);
  if (!user) {
    return <Navigate to="/Auth" replace />;
  }

  if (user.roleId==0 && location.pathname.includes("admin")) {
    return <Navigate to="/Home" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;