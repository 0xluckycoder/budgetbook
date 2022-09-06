import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="app">
                    <Route path="home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}