import { useState, useCallback, useEffect } from 'react';
import carService from '../services/carService';

const useCars = (autoFetch = true) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCars = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await carService.getAllCars();
            // Assuming backend ApiResponse structure: { code: 200, result: [...], ... }
            setCars(response.result || response.data || response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addCar = async (carData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await carService.addCar(carData);
            await fetchCars(); // Refresh list
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteCar = async (carId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await carService.deleteCar(carId);
            await fetchCars(); // Refresh list
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchCars();
        }
    }, [autoFetch, fetchCars]);

    return { cars, loading, error, fetchCars, addCar, deleteCar };
};

export default useCars;
