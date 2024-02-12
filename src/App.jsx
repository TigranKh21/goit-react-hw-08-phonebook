import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiRefresh } from './redux/auth/authSlice.js';
import {
  Navigation,
  PrivatRoute,
  RestrictedRoute,
  SharedLoyaut,
} from 'components/index.js';

const ContactsPage = lazy(() => import('./pages/ContactsPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiRefresh());
  }, [dispatch]);

  return (
    <>
      <SharedLoyaut>
        <Suspense>
          <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route
              path="/contacts"
              element={
                <PrivatRoute>
                  <ContactsPage />
                </PrivatRoute>
              }
            />

            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegisterPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />
          </Routes>
        </Suspense>
      </SharedLoyaut>
    </>
  );
};
