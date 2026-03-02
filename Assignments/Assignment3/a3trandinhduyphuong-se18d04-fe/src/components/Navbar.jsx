import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Hotel, User, LogOut, Menu } from 'lucide-react';
import './Navbar.css';
import Button from './ui/Button';

const Navbar = () => {
    const { user, logout, isStaff, isCustomer } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <Hotel size={32} className="logo-icon" />
                    <span className="logo-text">FUMini<span className="accent-text">Hotel</span></span>
                </Link>

                <div className="nav-links">
                    <Link to="/rooms" className="nav-link">Rooms</Link>

                    {isCustomer && (
                        <>
                            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </>
                    )}

                    {isStaff && (
                        <>
                            <Link to="/staff/rooms" className="nav-link">Manage Rooms</Link>
                            <Link to="/staff/customers" className="nav-link">Customers</Link>
                            <Link to="/staff/bookings" className="nav-link">Reservations</Link>
                        </>
                    )}

                    <div className="nav-actions">
                        {user ? (
                            <div className="user-menu">
                                <span className="user-email">{user.email}</span>
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="accent" size="sm">Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
