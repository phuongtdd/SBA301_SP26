import React, { useState, useEffect } from 'react';
import customerService from '../../services/customerService';
import { User, Mail, Phone, Trash2, Edit2 } from 'lucide-react';
import './StaffTable.css';

const StaffCustomers = () => {
    const [customers, setCustomers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await customerService.getCustomers();
            setCustomers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await customerService.deleteCustomer(id);
                fetchCustomers();
            } catch (err) {
                alert(err.message || 'Delete failed');
            }
        }
    };

    return (
        <div className="staff-page container">
            <div className="staff-header">
                <h1>Manage <span className="accent-text">Customers</span></h1>
            </div>

            <div className="table-container glass">
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>Birthday</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.customerId}>
                                <td className="font-bold">{customer.customerFullName}</td>
                                <td>{customer.emailAddress}</td>
                                <td>{customer.telephone}</td>
                                <td>{customer.customerBirthday ? new Date(customer.customerBirthday).toLocaleDateString() : 'N/A'}</td>
                                <td className="actions-cell">
                                    {/* Edit functionality can be added similarly to StaffRooms */}
                                    <button className="action-btn delete" onClick={() => handleDelete(customer.customerId)}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffCustomers;
