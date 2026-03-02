import api from '../api/axiosConfig';

const profileService = {
    getProfile: async () => {
        return await api.get('/customers/profile');
    },
    updateProfile: async (profileData) => {
        return await api.put('/customers/profile', profileData);
    }
};

export default profileService;
