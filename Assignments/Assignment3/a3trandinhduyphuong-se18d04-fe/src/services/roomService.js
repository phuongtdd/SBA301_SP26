import api from '../api/axiosConfig';

const roomService = {
    getRooms: async () => {
        return await api.get('/rooms');
    },
    getRoomById: async (id) => {
        return await api.get(`/rooms/${id}`);
    },
    createRoom: async (roomData) => {
        return await api.post('/rooms', roomData);
    },
    updateRoom: async (id, roomData) => {
        return await api.put(`/rooms/${id}`, roomData);
    },
    getRoomTypes: async () => {
        return await api.get('/roomtypes');
    },
    deleteRoom: async (id) => {
        return await api.delete(`/rooms/${id}`);
    }
};

export default roomService;
