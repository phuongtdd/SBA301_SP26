import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { validateForm, hasErrors, isRequired, minLength } from '../../utils/validation';
import logoImage from '../../assets/logo.png';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    // Validation rules
    const validationRules = {
        username: [isRequired('Username'), minLength(3, 'Username')],
        password: [isRequired('Password'), minLength(3, 'Password')]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form
        const formErrors = validateForm({ username, password }, validationRules);
        setErrors(formErrors);

        if (hasErrors(formErrors)) {
            return;
        }

        setIsLoading(true);

        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));

        const result = login(username, password);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    {/* Logo */}
                    <div className="login-logo">
                        <img src={logoImage} alt="FUNews Logo" className="login-logo-image" />
                        <h1>FUNews</h1>
                        <p>Management System</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        <h2>Welcome Back</h2>
                        <p className="login-subtitle">Sign in to access the admin panel</p>

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Username</label>
                            <div className="input-with-icon">
                                <User size={18} className="input-icon" />
                                <input
                                    id="username"
                                    type="text"
                                    className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (errors.username) {
                                            setErrors({ ...errors, username: null });
                                        }
                                    }}
                                />
                            </div>
                            {errors.username && <div className="form-error">{errors.username}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) {
                                            setErrors({ ...errors, password: null });
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <div className="form-error">{errors.password}</div>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className="login-hint">
                            <p>Demo credentials: <strong>Admin</strong> / <strong>Admin</strong></p>
                        </div>
                    </form>
                </div>

                {/* Background decoration */}
                <div className="login-decoration">
                    <div className="decoration-circle circle-1"></div>
                    <div className="decoration-circle circle-2"></div>
                    <div className="decoration-circle circle-3"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

