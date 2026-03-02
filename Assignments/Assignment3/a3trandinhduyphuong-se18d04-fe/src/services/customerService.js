import api from '../api/axiosConfig';

const customerService = {
    getCustomers: async () => {
        return await api.get('/customers');
    },
    deleteCustomer: async (id) => {
        return await api.delete(`/customers/${id}`);
    }
};

export default customerService;
