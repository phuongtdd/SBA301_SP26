import api from '../api/axiosConfig';

const bookingService = {
    getMyBookings: async () => {
        return await api.get('/bookings/my');
    },
    getAllBookings: async () => {
        return await api.get('/bookings');
    },
    createBooking: async (bookingData) => {
        return await api.post('/bookings', bookingData);
    }
};

export default bookingService;
