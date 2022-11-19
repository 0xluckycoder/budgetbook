import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './app.scss';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import {
  userAuthApi
} from './store/user/user.slice';

import { Protected } from './components/router/Protected';
import { AuthRedirect } from './components/router/AuthRedirect';

import HomePage from './views/Home/HomePage/HomePage';
import AccountPage from './views/Accounts/AccountsPage/AccountsPage';
import SettingsPage from './views/Settings/SettingsPage/SettingsPage';

import SignInPage from './views/Auth/AuthPage/SignInPage/SignInPage';
import SignUpPage from './views/Auth/AuthPage/SignUpPage/SignUpPage';

function App() {

  const {
    data,
    isLoading,
    isError,
  } = userAuthApi.endpoints.verifyAuth.useQuery();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="app">
            <Route path="home" element={<Protected><HomePage /></Protected>} />
            <Route path="accounts" element={<Protected><AccountPage /></Protected>} />
            <Route path="settings" element={<Protected><SettingsPage /></Protected>} />
          </Route>
          <Route path="auth">
            <Route path="login" element={<AuthRedirect><SignInPage /></AuthRedirect>} />
            <Route path="signup" element={<AuthRedirect><SignUpPage /></AuthRedirect>} />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;