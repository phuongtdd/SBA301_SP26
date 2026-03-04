import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

const Home = () => {
    const { user, isAdmin } = useAuth();

    return (
        <div className="home-container modern-ui">
            <main className="home-content">
                <section className="hero-section">
                    {/* Floating decoration */}
                    <div className="hero-decor hero-decor-1"></div>
                    <div className="hero-decor hero-decor-2"></div>
                    <div className="hero-decor hero-decor-3"></div>

                    <div className="hero-inner">
                        <span className="hero-badge">🚗 Premium Fleet Management</span>
                        <h2 className="hero-title">
                            Manage Your Fleet<br />with <strong>Precision</strong>
                        </h2>
                        <p className="hero-description">
                            An intuitive platform to track, organize, and administer your car inventory seamlessly. Designed for efficiency and scale.
                        </p>
                        <div className="hero-actions">
                            <Link to="/cars" className="hero-btn primary-btn">
                                <span>Explore Inventory</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                            {!user && (
                                <Link to="/register" className="hero-btn outline-btn">
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Vehicles Managed</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Countries</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">99.9%</span>
                            <span className="stat-label">Uptime</span>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="section-header">
                        <span className="section-tag">Features</span>
                        <h3 className="section-title">Everything you need</h3>
                        <p className="section-desc">Powerful tools to manage your entire fleet from one dashboard.</p>
                    </div>
                    <div className="modern-grid">
                        <div className="modern-card" style={{ animationDelay: '0.1s' }}>
                            <div className="card-icon">🚘</div>
                            <h3>Modern Inventory</h3>
                            <p>Instantly browse and search through all available vehicles across our highly optimized digital system.</p>
                            <Link to="/cars" className="action-link">
                                View Cars
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                        {isAdmin && (
                            <div className="modern-card admin-card" style={{ animationDelay: '0.2s' }}>
                                <div className="card-icon admin-icon">⚙️</div>
                                <h3>Administration</h3>
                                <p>Seamlessly add new vehicles and modify system variables. Full control at your fingertips.</p>
                                <Link to="/cars/add" className="action-link">
                                    Add New Car
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </Link>
                            </div>
                        )}
                        <div className="modern-card" style={{ animationDelay: '0.3s' }}>
                            <div className="card-icon">🌍</div>
                            <h3>Global Reach</h3>
                            <p>Organize cars efficiently with built-in country and brand filtering designed for international scale.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <div className="footer-inner">
                    <p>&copy; 2026 AutoManage System &mdash; Elevating your processes.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
