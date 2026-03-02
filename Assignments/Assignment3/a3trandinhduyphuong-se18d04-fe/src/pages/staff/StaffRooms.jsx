import React, { useState, useEffect } from 'react';
import roomService from '../../services/roomService';
import Button from '../../components/ui/Button';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import './StaffTable.css';

const StaffRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [formData, setFormData] = useState({
        roomNumber: '',
        roomDescription: '',
        roomMaxCapacity: 2,
        roomPricePerDay: 0,
        roomTypeId: 1,
        roomStatus: 1
    });


    useEffect(() => {
        fetchRooms();
        fetchRoomTypes();
    }, []);

    const fetchRooms = async () => {
        try {
            const data = await roomService.getRooms();
            setRooms(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoomTypes = async () => {
        try {
            // axios interceptor returns response.data directly (the ApiResponse object)
            // so structure is: { code, result: [...roomTypes], message }
            const apiResponse = await roomService.getRoomTypes();
            const types = apiResponse?.data ?? apiResponse;
            setRoomTypes(Array.isArray(types) ? types : []);
        } catch (err) {
            console.error('Failed to fetch room types', err);
        }
    };

    const handleDeleteClick = (room) => {
        setCurrentRoom(room);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!currentRoom) return;
        try {
            await roomService.deleteRoom(currentRoom.roomId);
            setShowDeleteModal(false);
            setCurrentRoom(null);
            fetchRooms();
        } catch (err) {
            alert(err.message || 'Delete failed');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentRoom) {
                await roomService.updateRoom(currentRoom.roomId, formData);
            } else {
                await roomService.createRoom(formData);
            }
            setShowModal(false);
            fetchRooms();
        } catch (err) {
            alert(err.message || 'Action failed');
        }
    };

    const openModal = (room = null) => {
        if (room) {
            setCurrentRoom(room);
            setFormData({
                roomNumber: room.roomNumber,
                roomDescription: room.roomDescription,
                roomMaxCapacity: room.roomMaxCapacity,
                roomPricePerDay: room.roomPricePerDay,
                roomTypeId: room.roomType?.roomTypeId || (roomTypes.length > 0 ? roomTypes[0].roomTypeId : 1),
                roomStatus: room.roomStatus
            });
        } else {
            setCurrentRoom(null);
            setFormData({
                roomNumber: '',
                roomDescription: '',
                roomMaxCapacity: 2,
                roomPricePerDay: 0,
                roomTypeId: roomTypes.length > 0 ? roomTypes[0].roomTypeId : 1,
                roomStatus: 1
            });
        }
        setShowModal(true);
    };

    return (
        <div className="staff-page container">
            <div className="staff-header">
                <h1>Manage <span className="accent-text">Rooms</span></h1>
                <Button onClick={() => openModal()} variant="accent">
                    <Plus size={18} /> Add New Room
                </Button>
            </div>

            <div className="table-container glass">
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room.roomId}>
                                <td className="font-bold">{room.roomNumber}</td>
                                <td>{room.roomType?.roomTypeName}</td>
                                <td>{room.roomMaxCapacity} Guests</td>
                                <td className="price-col">${room.roomPricePerDay}</td>
                                <td>
                                    <span className={`status-dot ${room.roomStatus === 1 ? 'status-active' : 'status-inactive'}`}></span>
                                    {room.roomStatus === 1 ? 'Available' : 'Unavailable'}
                                </td>
                                <td className="actions-cell">
                                    <button className="action-btn edit" onClick={() => openModal(room)}><Edit2 size={16} /></button>
                                    <button className="action-btn delete" onClick={() => handleDeleteClick(room)}><Trash2 size={16} /></button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass">
                        <h2>{currentRoom ? 'Edit Room' : 'Add New Room'}</h2>
                        <form onSubmit={handleSubmit} className="staff-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Room Number</label>
                                    <input value={formData.roomNumber} onChange={e => setFormData({ ...formData, roomNumber: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Price Per Day</label>
                                    <input type="number" value={formData.roomPricePerDay} onChange={e => setFormData({ ...formData, roomPricePerDay: parseFloat(e.target.value) })} required />
                                </div>
                                <div className="form-group">
                                    <label>Capacity</label>
                                    <input type="number" value={formData.roomMaxCapacity} onChange={e => setFormData({ ...formData, roomMaxCapacity: parseInt(e.target.value) })} required />
                                </div>
                                <div className="form-group">
                                    <label>Room Type</label>
                                    <select
                                        value={formData.roomTypeId}
                                        onChange={e => setFormData({ ...formData, roomTypeId: parseInt(e.target.value) })}
                                        required
                                        className="staff-select"
                                    >
                                        {roomTypes.map(type => (
                                            <option key={type.roomTypeId} value={type.roomTypeId}>
                                                {type.roomTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={formData.roomDescription} onChange={e => setFormData({ ...formData, roomDescription: e.target.value })} required />
                            </div>
                            <div className="modal-actions">
                                <Button type="submit" variant="accent">Save Room</Button>
                                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content glass delete-confirm-modal" onClick={e => e.stopPropagation()}>
                        <div className="delete-icon-wrapper">
                            <Trash2 size={48} className="text-error" />
                        </div>
                        <h2>Delete Room?</h2>
                        <p className="delete-msg">
                            Are you sure you want to delete <strong>Room {currentRoom?.roomNumber}</strong>?
                            This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                            <Button variant="accent" className="btn-error" onClick={confirmDelete}>Delete Room</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default StaffRooms;
