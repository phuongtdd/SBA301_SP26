import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks';
import userService from '../../services/userService';
import { validateForm, hasErrors, isRequired, minLength, isEmail } from '../../utils/validation';

const ProfilePage = () => {
    const { user, login } = useAuth(); // We might need to update user context after profile update
    const [formData, setFormData] = useState({
        accountName: '',
        accountEmail: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                accountName: user.accountName || user.name || '',
                accountEmail: user.accountEmail || user.email || ''
            }));
        }
    }, [user]);

    const validationRules = {
        accountName: [isRequired('Name'), minLength(3, 'Name')],
        accountEmail: [isRequired('Email'), isEmail()],
        newPassword: [minLength(3, 'New Password')] // Optional, but if provided must be min 3
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const formErrors = validateForm(formData, validationRules);

        // Custom password validation
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(formErrors);

        if (hasErrors(formErrors)) return;

        try {
            // Update profile logic
            // Note: Ideally backend should have a specific /profile endpoint or we use updateAccount
            // We'll use updateAccount for now.

            const updateData = {
                AccountName: formData.accountName,
                AccountEmail: formData.accountEmail,
                AccountRole: user.accountRole // Keep role same
            };

            if (formData.newPassword) {
                updateData.AccountPassword = formData.newPassword;
            }

            // Assuming user.id or user.accountId exists
            const accountId = user.accountId || user.id;
            await userService.updateAccount(accountId, updateData);

            setSuccessMessage("Profile updated successfully!");
            // Ideally we should reload user context here, but simple alert is fine for now

        } catch (error) {
            console.error("Profile update failed", error);
            setErrorMessage("Failed to update profile. Please try again.");
        }
    };

    return (
        <Container fluid className="py-4">
            <h1 className="mb-4">My Profile</h1>
            <Row>
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.accountName}
                                        onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                        isInvalid={!!errors.accountName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.accountName}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formData.accountEmail}
                                        onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                                        isInvalid={!!errors.accountEmail}
                                        disabled // Often email is unique ID, let's keep it editable but typically it might be locked
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.accountEmail}</Form.Control.Feedback>
                                </Form.Group>

                                <hr className="my-4" />
                                <h5 className="mb-3">Change Password</h5>

                                <Form.Group className="mb-3">
                                    <Form.Label>New Password (leave blank to keep current)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        isInvalid={!!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Update Profile
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
