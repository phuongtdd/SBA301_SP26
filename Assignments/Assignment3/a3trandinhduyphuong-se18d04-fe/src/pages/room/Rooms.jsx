import React, { useState } from 'react';
import { useRooms } from '../../hooks/useRooms';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import BookingModal from './BookingModal';
import { Search, Users, Maximize } from 'lucide-react';
import './Rooms.css';

const Rooms = () => {
    const {
        filteredRooms,
        loading,
        searchTerm,
        setSearchTerm
    } = useRooms();

    const { user } = useAuth();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBookNow = (room) => {
        if (!user) {
            alert('Please login as a customer to book rooms.');
            return;
        }
        if (user.role !== 'CUSTOMER') {
            alert('Only customers can book rooms.');
            return;
        }
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    return (
        <div className="rooms-page container">
            <header className="rooms-header">
                <h1 className="rooms-title">Our <span className="accent-text">Rooms</span></h1>
                <div className="search-bar glass">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search by room number or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div className="loading-spinner">Loading luxurious rooms...</div>
            ) : (
                <div className="rooms-grid">
                    {filteredRooms.map(room => (
                        <div key={room.roomId} className="room-card glass">
                            <div className="room-image-container">
                                <img
                                    src={`https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800`}
                                    alt={room.roomNumber}
                                    className="room-image"
                                />
                                <div className="room-badge">{room.roomType?.roomTypeName}</div>
                            </div>
                            <div className="room-info">
                                <div className="room-header-flex">
                                    <h3 className="room-number">Room {room.roomNumber}</h3>
                                    <span className="room-price">${room.roomPricePerDay}<small>/night</small></span>
                                </div>
                                <p className="room-desc">{room.roomDescription}</p>
                                <div className="room-details">
                                    <div className="detail-item">
                                        <Users size={16} />
                                        <span>Max {room.roomMaxCapacity} Guests</span>
                                    </div>
                                    <div className="detail-item">
                                        <Maximize size={16} />
                                        <span>Status: {room.roomStatus === 1 ? 'Available' : 'Unavailable'}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="accent"
                                    className="w-full"
                                    disabled={room.roomStatus !== 1}
                                    onClick={() => handleBookNow(room)}
                                >
                                    {room.roomStatus === 1 ? 'Book Now' : 'Currently Occupied'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <BookingModal
                    room={selectedRoom}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Rooms;
