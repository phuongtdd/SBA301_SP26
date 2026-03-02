import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    // eslint-disable-next-line react-hooks/immutability
                    logout();
                } else {
                    const rawRole = decoded.role || decoded.scope || '';
                    const normalizedRole = rawRole.replace('ROLE_', '');
                    setUser({
                        email: decoded.sub,
                        role: normalizedRole,
                    });
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        const rawRole = decoded.role || decoded.scope || '';
        const normalizedRole = rawRole.replace('ROLE_', '');
        const userData = {
            email: decoded.sub,
            role: normalizedRole,
        };
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const isStaffUser = (u) => u?.role === 'STAFF' || u?.role === 'ROLE_STAFF';
    const isCustomerUser = (u) => u?.role === 'CUSTOMER' || u?.role === 'ROLE_CUSTOMER';

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            isStaff: isStaffUser(user),
            isCustomer: isCustomerUser(user)
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
