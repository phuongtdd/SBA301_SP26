import React, { useState, useEffect } from 'react';
import { X, Calendar, CreditCard } from 'lucide-react';
import Button from '../../components/ui/Button';
import bookingService from '../../services/bookingService';
import './BookingModal.css';

const BookingModal = ({ room, onClose }) => {
    const [dates, setDates] = useState({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalDays, setTotalDays] = useState(1);

    useEffect(() => {
        const start = new Date(dates.startDate);
        const end = new Date(dates.endDate);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setTotalDays(diff > 0 ? diff : 0);
    }, [dates]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (totalDays <= 0) {
            setError('Check-out must be after check-in');
            return;
        }

        setLoading(true);
        setError('');

        const bookingData = {
            bookingDetails: [{
                roomId: room.roomId,
                startDate: dates.startDate,
                endDate: dates.endDate
            }]
        };

        try {
            await bookingService.createBooking(bookingData);
            alert('Booking successful! Check "My Bookings" for details.');
            onClose();
        } catch (err) {
            setError(err.message || 'Booking failed. Room might be unavailable.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="booking-modal glass" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 className="modal-title">Book <span className="accent-text">Room {room.roomNumber}</span></h2>
                <p className="modal-subtitle">{room.roomType?.roomTypeName} - ${room.roomPricePerDay}/night</p>

                {error && <div className="alert alert-error mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="date-inputs">
                        <div className="form-group">
                            <label><Calendar size={16} /> Check-in</label>
                            <input
                                type="date"
                                value={dates.startDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={e => setDates({ ...dates, startDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><Calendar size={16} /> Check-out</label>
                            <input
                                type="date"
                                value={dates.endDate}
                                min={dates.startDate}
                                onChange={e => setDates({ ...dates, endDate: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="booking-summary">
                        <div className="summary-row">
                            <span>Price per night</span>
                            <span>${room.roomPricePerDay}</span>
                        </div>
                        <div className="summary-row">
                            <span>Duration</span>
                            <span>{totalDays} nights</span>
                        </div>
                        <div className="total-row">
                            <span>Total Price</span>
                            <span>${room.roomPricePerDay * totalDays}</span>
                        </div>
                    </div>

                    <Button type="submit" variant="accent" className="w-full" disabled={loading || totalDays <= 0}>
                        <CreditCard size={18} className="mr-2" />
                        {loading ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
