import api from '../api/axiosConfig';

const countryService = {
    getAllCountries: async () => {
        return await api.get('/countries');
    }
};

export default countryService;
