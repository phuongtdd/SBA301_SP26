import api from './api';

const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data?.data || response.data; // Try to extract data, fallback to response.data

    if (data && data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    login,
    logout,
    getCurrentUser,
};

export default authService;