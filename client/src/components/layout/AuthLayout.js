import React from 'react';
import { AuthTopNav } from '../AuthTopNav/AuthTopNav';

export const AuthLayout = ({ children }) => {
    return (
        <div>
            <AuthTopNav />
            {children}
        </div>
    );
}