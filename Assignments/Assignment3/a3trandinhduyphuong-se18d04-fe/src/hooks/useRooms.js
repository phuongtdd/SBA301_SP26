import { useState, useEffect } from 'react';
import roomService from '../services/roomService';

export const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const data = await roomService.getRooms();
            setRooms(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch rooms', err);
            setError(err.message || 'Failed to fetch rooms');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(room =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType?.roomTypeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        rooms,
        filteredRooms,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshRooms: fetchRooms
    };
};
