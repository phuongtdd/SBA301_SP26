import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import Button from '../../components/ui/Button';
import { User, Phone, Mail, Calendar } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const {
        profile,
        loading,
        formData,
        handleFormChange,
        updateProfile
    } = useProfile();

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEditing) return; // Guard against accidental submissions while not in edit mode

        const result = await updateProfile(formData);
        if (result.success) {
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: result.error });
        }
    };

    if (loading) return <div className="container">Loading profile...</div>;
    if (!profile) return <div className="container">Error loading profile.</div>;

    return (
        <div className="profile-page container">
            <div className="profile-card glass">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <User size={64} />
                    </div>
                    <div>
                        <h1 className="profile-name">{profile.customerFullName}</h1>
                        <p className="profile-role">Valued Customer</p>
                    </div>
                </div>

                {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label><User size={16} /> Full Name</label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleFormChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label><Mail size={16} /> Email (ReadOnly)</label>
                            <input value={profile.emailAddress} disabled />
                        </div>
                        <div className="form-group">
                            <label><Phone size={16} /> Telephone</label>
                            <input
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleFormChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label><Calendar size={16} /> Birthday</label>
                            <input
                                name="birthday"
                                type="date"
                                value={formData.birthday}
                                onChange={handleFormChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="profile-actions">
                        {isEditing ? (
                            <>
                                <Button key="save-btn" type="submit" variant="accent">Save Changes</Button>
                                <Button key="cancel-btn" type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                            </>
                        ) : (
                            <Button
                                key="edit-btn"
                                type="button"
                                variant="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsEditing(true);
                                }}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
