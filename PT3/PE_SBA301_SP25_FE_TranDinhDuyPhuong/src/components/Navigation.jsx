import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const Navigation = () => {
    const { user, login, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Modal state
    const [showLogin, setShowLogin] = useState(false);

    // Login form state
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShowLogin(false);
        setError('');
        setCredentials({ email: '', password: '' });
    };

    const handleShow = () => setShowLogin(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await authService.login(credentials);
            if (response.code === 200 || response.status === 'OK') {
                const token = response.result?.token || response.token;
                login(token);
                handleClose();
                navigate('/');
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-4 shadow-sm border-bottom">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        DE180212 - Trần Đình Duy Phương PE Spring 25
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>

                            {/* According to user requirement: dropdown = Car Management */}
                            <NavDropdown title="Car Management" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/cars">List all cars</NavDropdown.Item>
                                {isAdmin && (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/cars/add">Create a new car</NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {user ? (
                                <div className="d-flex align-items-center gap-3">
                                    <span className="text-muted">
                                        Welcome, <strong>{user.email}</strong> ({user.role})
                                    </span>
                                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="d-flex gap-2">
                                    <Button variant="primary" onClick={handleShow}>
                                        Login
                                    </Button>
                                    <Button variant="outline-secondary" as={Link} to="/register">
                                        Register
                                    </Button>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Login Dialog with Close Button */}
            <Modal show={showLogin} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Login to Cars Management System</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-100 text-center">
                        <small className="text-muted">
                            Don't have an account? <Link to="/register" onClick={handleClose}>Register here</Link>
                        </small>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Navigation;
