import { useState } from 'react';
import { Save, Bell, Lock, Palette, Globe } from 'lucide-react';
import { useAuth } from '../../hooks';
import './SettingsPage.css';

const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);

    const [profileSettings, setProfileSettings] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        newsUpdates: true
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'system', label: 'System', icon: Globe },
    ];

    return (
        <div className="settings-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">Manage your account and system preferences</p>
                </div>
            </div>

            <div className="settings-container">
                {/* Tabs */}
                <div className="settings-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Profile Information</h3>
                            <p className="settings-section-desc">Update your personal information</p>

                            <div className="form-group">
                                <label className="form-label">Display Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={profileSettings.name}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={profileSettings.email}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={user?.roleName || 'Unknown'}
                                    disabled
                                />
                            </div>

                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={16} />
                                {saved ? 'Saved!' : 'Save Changes'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Notification Preferences</h3>
                            <p className="settings-section-desc">Configure how you receive notifications</p>

                            <div className="settings-toggle-list">
                                <div className="settings-toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Email Notifications</span>
                                        <span className="toggle-desc">Receive notifications via email</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.emailNotifications}
                                            onChange={(e) => setNotificationSettings({
                                                ...notificationSettings,
                                                emailNotifications: e.target.checked
                                            })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="settings-toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Push Notifications</span>
                                        <span className="toggle-desc">Receive push notifications in browser</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.pushNotifications}
                                            onChange={(e) => setNotificationSettings({
                                                ...notificationSettings,
                                                pushNotifications: e.target.checked
                                            })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="settings-toggle-item">
                                    <div className="toggle-info">
                                        <span className="toggle-label">News Updates</span>
                                        <span className="toggle-desc">Get notified about new articles</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings.newsUpdates}
                                            onChange={(e) => setNotificationSettings({
                                                ...notificationSettings,
                                                newsUpdates: e.target.checked
                                            })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={16} />
                                {saved ? 'Saved!' : 'Save Changes'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Appearance</h3>
                            <p className="settings-section-desc">Customize the look and feel</p>

                            <div className="theme-options">
                                <div className="theme-option active">
                                    <div className="theme-preview dark"></div>
                                    <span>Dark</span>
                                </div>
                                <div className="theme-option">
                                    <div className="theme-preview light"></div>
                                    <span>Light</span>
                                </div>
                                <div className="theme-option">
                                    <div className="theme-preview system"></div>
                                    <span>System</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">System Information</h3>
                            <p className="settings-section-desc">Application details and version</p>

                            <div className="system-info">
                                <div className="info-row">
                                    <span className="info-label">Application</span>
                                    <span className="info-value">FU News Management System</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Version</span>
                                    <span className="info-value">1.0.0</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Framework</span>
                                    <span className="info-value">React 19 + Vite</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Last Updated</span>
                                    <span className="info-value">February 2026</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
