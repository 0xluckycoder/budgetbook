import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../../views/Home/HomePage/HomePage';
import AccountPage from '../../../views/Accounts/AccountsPage/AccountsPage';
import SettingsPage from '../../../views/Settings/SettingsPage/SettingsPage';
import SignInPage from '../../../views/Auth/AuthPage/SignInPage/SignInPage';
import SignUpPage from '../../../views/Auth/AuthPage/SignUpPage/SignUpPage';

export const PrivateAppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth">
                    <Route path="login" element={<SignInPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                </Route>
                <Route path="app">
                    <Route path="home" element={<HomePage />} />
                    <Route path="accounts" element={<AccountPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}