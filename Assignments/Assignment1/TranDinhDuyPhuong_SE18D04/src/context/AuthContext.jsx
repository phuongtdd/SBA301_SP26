import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const data = await authService.login(username, password);
            if (data) {
                // eslint-disable-next-line no-unused-vars
                const userData = {
                    id: data.accountId || data.AccountID,
                    accountId: data.accountId || data.AccountID,
                    name: data.accountName || data.AccountName,
                    accountName: data.accountName || data.AccountName,
                    email: data.accountEmail || data.AccountEmail,
                    accountEmail: data.accountEmail || data.AccountEmail,
                    role: data.accountRole || data.AccountRole,
                    accountRole: data.accountRole || data.AccountRole,
                    roleName: (data.accountRole || data.AccountRole) === 1 ? 'Admin' : 'Staff',
                    token: data.token
                };
                setUser(userData);

                // We also need to update local storage with this normalized object if authService uses it
                // But authService.login sets local storage with 'data'. 
                // We should probably update authService to store this normalized data or just rely on context.
                // The issue is verify authService.login implementation. 
                // If I change context here, it only affects current session. 
                // On reload, it loads from localStorage.
                // So I MUST update authService login to save the RIGHT object, or handle it here.
                // Actually authService.login handles the saving. 
                // So I should probably update `authService.js` to normalize BEFORE saving.
                // But since I am in `AuthContext`, I can just override it in localStorage here if I want, 
                // but better to fix `authService`.

                // Let's fix `authService.js` instead? No, AuthContext is the consumer.
                // If I fix it here, I should also save it to localStorage here to persist the normalized structure.
                localStorage.setItem('user', JSON.stringify(userData));

                return { success: true, user: userData };
            }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const isAdmin = () => {
        return user?.accountRole === 1 || user?.role === 1;
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
