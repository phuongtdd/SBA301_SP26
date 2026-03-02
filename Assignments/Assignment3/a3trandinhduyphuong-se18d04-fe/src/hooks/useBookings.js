import { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';

export const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await bookingService.getMyBookings();
            setBookings(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch bookings', err);
            setError(err.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return {
        bookings,
        loading,
        error,
        refreshBookings: fetchBookings
    };
};
