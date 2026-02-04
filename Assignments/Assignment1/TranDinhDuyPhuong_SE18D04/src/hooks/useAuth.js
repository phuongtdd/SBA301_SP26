import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * @returns {Object} Auth context value containing user, login, logout, isAdmin, etc.
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;
