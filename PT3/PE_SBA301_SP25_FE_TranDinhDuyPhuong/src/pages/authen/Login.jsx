import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await authService.login(credentials);
            if (response.code === 200 || response.status === 'OK') {
                const token = response.result?.token || response.token;
                login(token);
                navigate('/');
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>🚗</div>
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your AutoManage account</p>
                {error && <div className="error-message">⚠️ {error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="you@example.com"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
