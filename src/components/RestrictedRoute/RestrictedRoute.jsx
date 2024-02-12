import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectorAuthIsLoggedIn } from '../../redux/auth/authSelectors';

export const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  return isLoggedIn ? <Navigate to="/contacts" replace /> : children;
};
