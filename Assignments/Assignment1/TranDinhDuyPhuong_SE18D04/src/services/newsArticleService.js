import api from './api';

const getAllNews = async () => {
    const response = await api.get('/news');
    return response.data?.data || [];
};

const getNewsById = async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
};

const createNews = async (newsData) => {
    const response = await api.post('/news', newsData);
    return response.data;
};

const updateNews = async (id, newsData) => {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
};

const deleteNews = async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
};

const searchNews = async (keyword) => {
    const response = await api.get(`/news/search?keyword=${keyword}`);
    return response.data;
};

const getNewsByCreator = async (accountId) => {
    const response = await api.get(`/news/creator/${accountId}`);
    return response.data;
};

const getActiveNews = async () => {
    const response = await api.get('/news/active');
    return response.data;
};

const newsArticleService = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    searchNews,
    getNewsByCreator,
    getActiveNews
};

export default newsArticleService;
