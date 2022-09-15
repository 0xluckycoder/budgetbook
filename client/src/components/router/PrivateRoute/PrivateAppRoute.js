import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../../views/Home/HomePage/HomePage';
import AccountPage from '../../../views/Accounts/AccountsPage/AccountsPage';

export const PrivateAppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="app">
                    <Route path="home" element={<HomePage />} />
                    <Route path="accounts" element={<AccountPage />} />
                    {/* <Route path="settings" element={<Settings />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}