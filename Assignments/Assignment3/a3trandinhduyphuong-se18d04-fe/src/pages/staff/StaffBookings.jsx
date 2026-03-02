/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import { Calendar, User, DollarSign, ListFilter } from 'lucide-react';
import './StaffTable.css';

const StaffBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await bookingService.getAllBookings();
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await bookingService.updateBookingStatus(id, status);
            fetchBookings();
        } catch (err) {
            alert(err.message || 'Failed to update status');
        }
    };

    return (
        <div className="staff-page container">
            <div className="staff-header">
                <h1>Manage <span className="accent-text">Bookings</span></h1>
            </div>

            <div className="table-container glass">
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Rooms</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.bookingReservationId}>
                                <td>#{booking.bookingReservationId}</td>
                                <td className="font-bold">{booking.customerName || `ID: ${booking.customerId}`}</td>
                                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td className="price-col">${booking.totalPrice}</td>
                                <td>
                                    {booking.bookingDetails?.map(d => d.roomNumber).join(', ') || 'N/A'}
                                </td>
                                <td>
                                    <span className={`status-pill status-${booking.bookingStatus}`}>
                                        {booking.bookingStatus === 1 ? 'Active' : booking.bookingStatus === 0 ? 'Cancelled' : 'Completed'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <select
                                        value={booking.bookingStatus}
                                        onChange={(e) => updateStatus(booking.bookingReservationId, e.target.value)}
                                        className="status-select"
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Cancelled</option>
                                        <option value="2">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffBookings;
