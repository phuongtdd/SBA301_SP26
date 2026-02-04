import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks';
import logoImage from '../../assets/logo.png';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img src={logoImage} alt="FUNews Logo" className="logo-image" />
                    <div className="logo-text">
                        <h1>FUNews</h1>
                        <span>Management System</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                <button className="header-icon-btn">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>

                <div className="user-menu" ref={dropdownRef}>
                    <button
                        className="user-menu-btn"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="user-avatar">
                            <User size={20} />
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user?.accountName || 'Guest'}</span>
                            <span className="user-role">{user?.roleName || (user?.accountRole === 1 ? 'Admin' : 'Staff')}</span>
                        </div>
                        <ChevronDown size={16} className={`chevron ${dropdownOpen ? 'open' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="user-dropdown">
                            <div className="dropdown-header">
                                <span className="dropdown-email">{user?.accountEmail}</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={handleLogout}>
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
