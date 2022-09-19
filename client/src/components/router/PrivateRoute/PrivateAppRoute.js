import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../../views/Home/HomePage/HomePage';
import AccountPage from '../../../views/Accounts/AccountsPage/AccountsPage';
import SettingsPage from '../../../views/Settings/SettingsPage/SettingsPage';

export const PrivateAppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="app">
                    <Route path="home" element={<HomePage />} />
                    <Route path="accounts" element={<AccountPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}