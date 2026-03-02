import api from '../api/axiosConfig';

const authService = {
    login: async (credentials) => {
        const data = await api.post('/auth/login', credentials);
        // Extract token and user from possible response structures
        const token = data.data?.token || data.result?.token || data.token;
        const user = data.data?.user || data.result?.user || data.user;

        if (token) {
            localStorage.setItem('token', token);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        }
        return { ...data, token, user };
    },
    register: async (userData) => {
        return await api.post('/auth/register', userData);
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default authService;
