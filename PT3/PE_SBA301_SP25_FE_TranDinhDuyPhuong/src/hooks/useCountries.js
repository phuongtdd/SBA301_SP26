import { useState, useEffect, useCallback } from 'react';
import countryService from '../services/countryService';

const useCountries = (autoFetch = true) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await countryService.getAllCountries();
            setCountries(response.result || response.data || response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchCountries();
        }
    }, [autoFetch, fetchCountries]);

    return { countries, loading, error, fetchCountries };
};

export default useCountries;
