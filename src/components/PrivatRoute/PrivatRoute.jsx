import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectorAuthIsLoggedIn } from '../../redux/auth/authSelectors';

export const PrivatRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};
