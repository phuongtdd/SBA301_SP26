import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">Experience <span className="accent-text">Luxury</span> Beyond Compare</h1>
                    <p className="hero-subtitle">Discover the perfect blend of comfort and elegance at FUMiniHotel. Your sanctuary in the heart of the city.</p>
                    <div className="hero-actions">
                        <Link to="/rooms">
                            <Button size="lg" variant="accent">Explore Rooms</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="lg" variant="outline">Join Us</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
