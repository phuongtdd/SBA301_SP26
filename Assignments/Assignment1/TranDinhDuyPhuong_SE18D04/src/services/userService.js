import api from './api';

const getAllAccounts = async () => {
    const response = await api.get('/accounts');
    return response.data?.data || [];
};

const getAccountById = async (id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
};

const createAccount = async (accountData) => {
    const response = await api.post('/accounts', accountData);
    return response.data;
};

const updateAccount = async (id, accountData) => {
    const response = await api.put(`/accounts/${id}`, accountData);
    return response.data;
};

const deleteAccount = async (id) => {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
};

const searchAccounts = async (keyword) => {
    const response = await api.get(`/accounts/search?keyword=${keyword}`);
    return response.data;
};

const userService = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
    searchAccounts
};

export default userService;
