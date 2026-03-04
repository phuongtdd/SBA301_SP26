import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        emailAddress: '',
        memberPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await authService.register(formData);
            if (response.code === 200 || response.status === 'OK') {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>✨</div>
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join AutoManage and start managing your fleet</p>
                {error && <div className="error-message">⚠️ {error}</div>}
                {success && <div className="success-message">✅ {success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="emailAddress"
                            placeholder="you@example.com"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="memberPassword"
                            placeholder="Create a strong password"
                            value={formData.memberPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
