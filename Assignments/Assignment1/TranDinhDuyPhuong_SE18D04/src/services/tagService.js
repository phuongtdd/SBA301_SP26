import api from './api';

const getAllTags = async () => {
    const response = await api.get('/tags');
    return response.data;
};

const getTagById = async (id) => {
    const response = await api.get(`/tags/${id}`);
    return response.data;
};

const createTag = async (tagData) => {
    const response = await api.post('/tags', tagData);
    return response.data;
};

const updateTag = async (id, tagData) => {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
};

const deleteTag = async (id) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
};

const searchTags = async (keyword) => {
    const response = await api.get(`/tags/search?keyword=${keyword}`);
    return response.data;
};

const tagService = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    searchTags
};

export default tagService;
