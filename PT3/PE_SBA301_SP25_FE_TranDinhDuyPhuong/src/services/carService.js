import api from '../api/axiosConfig';

const carService = {
    getAllCars: async () => {
        return await api.get('/cars');
    },

    addCar: async (carData) => {
        return await api.post('/cars', carData);
    },

    deleteCar: async (carId) => {
        return await api.delete(`/cars/${carId}`);
    }
};

export default carService;
