import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { loggedIn } = useSelector((state) => state.auth);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

