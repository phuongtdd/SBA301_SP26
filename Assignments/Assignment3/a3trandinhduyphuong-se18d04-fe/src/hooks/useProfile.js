import { useState, useEffect } from 'react';
import profileService from '../services/profileService';

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        telephone: '',
        birthday: ''
    });

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const data = await profileService.getProfile();
            setProfile(data);
            setFormData({
                fullName: data.customerFullName,
                telephone: data.telephone,
                birthday: data.customerBirthday?.split('T')[0] || '',
            });
            setError(null);
        } catch (err) {
            console.error('Failed to fetch profile', err);
            setError(err.message || 'Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const updateProfile = async (updatedData) => {
        try {
            // Map frontend fields to backend DTO
            const mappedData = {
                customerFullName: updatedData.fullName,
                telephone: updatedData.telephone,
                customerBirthday: updatedData.birthday
            };
            const updated = await profileService.updateProfile(mappedData);
            setProfile(updated);
            return { success: true, data: updated };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update profile' };
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return {
        profile,
        loading,
        error,
        formData,
        setFormData,
        handleFormChange,
        updateProfile,
        refreshProfile: fetchProfile
    };
};
