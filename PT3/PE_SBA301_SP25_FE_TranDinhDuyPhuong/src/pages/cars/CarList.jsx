import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import useCars from '../../hooks/useCars';
import { useAuth } from '../../contexts/AuthContext';

const CarList = () => {
    const { cars, loading, error, deleteCar } = useCars();
    const { isAdmin } = useAuth();

    const handleDelete = async (carId) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await deleteCar(carId);
            } catch (err) {
                alert('Failed to delete car: ' + (err.message || err));
            }
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3 text-muted fw-medium">Loading inventory...</p>
            </div>
        </Container>
    );

    if (error) return (
        <Container className="mt-5">
            <div className="alert alert-danger d-flex align-items-center gap-2 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <span style={{ fontSize: '1.3rem' }}>⚠️</span>
                Error loading cars: {error.message || error}
            </div>
        </Container>
    );

    return (
        <Container className="py-5" style={{ maxWidth: '1100px' }}>
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>Car Inventory</h2>
                    <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                        {cars && cars.length > 0 ? `${cars.length} vehicle${cars.length > 1 ? 's' : ''} in database` : 'No vehicles yet'}
                    </p>
                </div>
                {isAdmin && (
                    <Button
                        as={Link}
                        to="/cars/add"
                        className="fw-semibold px-4 d-flex align-items-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                            border: 'none',
                            borderRadius: '10px',
                            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                            padding: '0.65rem 1.5rem'
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>+</span> Add New Car
                    </Button>
                )}
            </div>

            {/* Card wrapping the table */}
            <Card className="border-0" style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="mb-0 align-middle">
                            <thead style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderBottom: '2px solid #e2e8f0' }}>
                                <tr>
                                    <th className="py-3 px-4 border-0 text-muted" style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ID</th>
                                    <th className="py-3 px-4 border-0 text-muted" style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Car Name</th>
                                    <th className="py-3 px-3 border-0 text-muted" style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Stock</th>
                                    <th className="py-3 px-3 border-0 text-muted" style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Price</th>
                                    <th className="py-3 px-3 border-0 text-muted" style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Country</th>
                                    {isAdmin && <th className="py-3 px-4 text-end border-0 text-muted" style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {cars && cars.length > 0 ? (
                                    cars.map((car, index) => (
                                        <tr key={car.carId} style={{ borderBottom: '1px solid #f1f5f9', animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both` }}>
                                            <td className="px-4" style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>#{car.carId}</td>
                                            <td className="px-4 fw-semibold" style={{ color: '#0f172a' }}>{car.carName}</td>
                                            <td className="px-3">
                                                <Badge
                                                    bg={car.unitsInStock > 10 ? 'success' : (car.unitsInStock > 0 ? 'warning' : 'danger')}
                                                    className="rounded-pill px-3 py-2"
                                                    style={{ fontWeight: 600, fontSize: '0.8rem' }}
                                                >
                                                    {car.unitsInStock} units
                                                </Badge>
                                            </td>
                                            <td className="px-3" style={{ fontWeight: 600, color: '#475569' }}>${car.unitPrice?.toLocaleString()}</td>
                                            <td className="px-3">
                                                <span className="d-flex align-items-center gap-1">
                                                    <span style={{ color: '#64748b' }}>{car.country?.countryName || 'N/A'}</span>
                                                </span>
                                            </td>
                                            {isAdmin && (
                                                <td className="px-4 text-end">
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(car.carId)}
                                                        className="rounded-pill fw-semibold px-3"
                                                        style={{ fontSize: '0.8rem', borderWidth: '1.5px' }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={isAdmin ? 6 : 5} className="text-center py-5">
                                            <div className="py-4">
                                                <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.4 }}>🚗</div>
                                                <h5 className="fw-bold mb-2" style={{ color: '#475569' }}>No vehicles found</h5>
                                                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Start by adding some cars to see them here.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CarList;
