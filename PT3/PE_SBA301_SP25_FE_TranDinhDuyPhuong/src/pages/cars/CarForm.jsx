import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import useCars from '../../hooks/useCars';
import useCountries from '../../hooks/useCountries';

const CarForm = () => {
    const [formData, setFormData] = useState({
        carName: '',
        unitsInStock: '',
        unitPrice: '',
        countryId: ''
    });
    const { addCar, loading: addingCar } = useCars(false);
    const { countries, loading: loadingCountries } = useCountries();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (formData.carName.length <= 10) {
            return "Car name must be longer than 10 characters";
        }
        const units = parseInt(formData.unitsInStock);
        if (isNaN(units) || units < 5 || units > 20) {
            return "Units in stock must be between 5 and 20";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const formattedData = {
                ...formData,
                unitsInStock: parseInt(formData.unitsInStock),
                unitPrice: parseInt(formData.unitPrice),
                countryId: parseInt(formData.countryId)
            };
            await addCar(formattedData);
            navigate('/cars');
        } catch (err) {
            setError(err.message || 'Failed to add car');
        }
    };

    return (
        <Container className="py-5 d-flex justify-content-center">
            <Card
                className="border-0 w-100"
                style={{
                    maxWidth: '620px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden'
                }}
            >
                <Card.Header
                    className="border-0 pt-4 px-4 text-center"
                    style={{ background: 'linear-gradient(135deg, #f8fafc, #eef2ff)', paddingBottom: '1.25rem' }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚘</div>
                    <h3 className="mb-1 fw-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>Add New Car</h3>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Fill in the vehicle details below</p>
                </Card.Header>
                <Card.Body className="p-4">
                    {error && (
                        <Alert variant="danger" className="d-flex align-items-center gap-2 border-0" style={{ borderRadius: '10px', fontSize: '0.9rem' }}>
                            <span>⚠️</span> {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold" style={{ fontSize: '0.85rem', color: '#0f172a' }}>Car Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="carName"
                                value={formData.carName}
                                onChange={handleChange}
                                required
                                placeholder="E.g. Toyota Corolla XE 2026 (Must be > 10 characters)"
                                style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0' }}
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold" style={{ fontSize: '0.85rem', color: '#0f172a' }}>Units In Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="unitsInStock"
                                        value={formData.unitsInStock}
                                        onChange={handleChange}
                                        required
                                        min="5"
                                        max="20"
                                        placeholder="Min 5, Max 20"
                                        style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold" style={{ fontSize: '0.85rem', color: '#0f172a' }}>Unit Price ($)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="unitPrice"
                                        value={formData.unitPrice}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter price"
                                        style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold" style={{ fontSize: '0.85rem', color: '#0f172a' }}>Country of Origin</Form.Label>
                            <Form.Select
                                name="countryId"
                                value={formData.countryId}
                                onChange={handleChange}
                                required
                                disabled={loadingCountries}
                                style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0' }}
                            >
                                <option value="">Select a country...</option>
                                {countries.map(country => (
                                    <option key={country.countryId} value={country.countryId}>
                                        {country.countryName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex gap-2 justify-content-end mt-4">
                            <Button
                                variant="light"
                                className="px-4 fw-semibold"
                                onClick={() => navigate('/cars')}
                                style={{ borderRadius: '10px', color: '#475569', border: '1.5px solid #e2e8f0' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 fw-semibold"
                                disabled={addingCar}
                                style={{
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                                    border: 'none',
                                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                                }}
                            >
                                {addingCar ? 'Saving...' : '✓ Save Car'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CarForm;
