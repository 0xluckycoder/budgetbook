import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Accounts from '../pages/Accounts/Accounts';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="app">
                    <Route path="home" element={<Home />} />
                    <Route path="accounts" element={<Accounts />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}