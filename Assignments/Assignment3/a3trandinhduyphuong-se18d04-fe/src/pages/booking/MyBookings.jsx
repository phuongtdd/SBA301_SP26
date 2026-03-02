import React from 'react';
import { useBookings } from '../../hooks/useBookings';
import { Calendar, CreditCard, Hotel, ChevronRight } from 'lucide-react';
import './MyBookings.css';

const MyBookings = () => {
    const { bookings, loading } = useBookings();

    const getStatusText = (status) => {
        switch (status) {
            case 1: return <span className="status-badge active">Active</span>;
            case 0: return <span className="status-badge cancelled">Cancelled</span>;
            case 2: return <span className="status-badge completed">Completed</span>;
            default: return <span className="status-badge">Unknown</span>;
        }
    };

    if (loading) return <div className="container">Loading your bookings...</div>;

    return (
        <div className="bookings-page container">
            <h1 className="bookings-title">My <span className="accent-text">Reservations</span></h1>

            {bookings.length === 0 ? (
                <div className="empty-state glass">
                    <Hotel size={48} className="empty-icon" />
                    <h3>No bookings yet</h3>
                    <p>Your history of luxurious stays will appear here.</p>
                </div>
            ) : (
                <div className="bookings-list">
                    {bookings.map(booking => (
                        <div key={booking.bookingReservationId} className="booking-card glass">
                            <div className="booking-main">
                                <div className="booking-header">
                                    <div className="booking-id">ID: #{booking.bookingReservationId}</div>
                                    {getStatusText(booking.bookingStatus)}
                                </div>

                                <div className="booking-content-grid">
                                    <div className="content-item">
                                        <Calendar size={18} />
                                        <div className="item-details">
                                            <label>Reservation Date</label>
                                            <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="content-item">
                                        <CreditCard size={18} />
                                        <div className="item-details">
                                            <label>Total Price</label>
                                            <span className="price-text">${booking.totalPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="booking-details-section">
                                    <h4>Room Details</h4>
                                    <div className="details-grid">
                                        {booking.bookingDetails.map((detail, idx) => (
                                            <div key={idx} className="room-detail-pill">
                                                Room {detail.roomNumber} - ${detail.actualPrice}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="booking-arrow">
                                <ChevronRight size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
