import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Stack } from 'react-bootstrap';
import { Plus, Edit, Trash2, Shield, UserCircle } from 'lucide-react';
import { getRoleName } from '../../data/mockData';
import userService from '../../services/userService';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { validateForm, hasErrors, isRequired, minLength, maxLength, isEmail } from '../../utils/validation';

const UsersPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        accountName: '',
        accountEmail: '',
        accountRole: 2,
        accountPassword: ''
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            const data = await userService.getAllAccounts();
            setAccounts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to load accounts", error);
        }
    };

    const filteredAccounts = accounts.filter(acc =>
        (acc.accountName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (acc.accountEmail?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (account = null) => {
        setErrors({});
        if (account) {
            setSelectedAccount(account);
            setFormData({
                accountName: account.accountName,
                accountEmail: account.accountEmail,
                accountRole: account.accountRole,
                accountPassword: '' // Don't show password when editing
            });
        } else {
            setSelectedAccount(null);
            setFormData({
                accountName: '',
                accountEmail: '',
                accountRole: 2,
                accountPassword: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAccount(null);
        setErrors({});
        setFormData({
            accountName: '',
            accountEmail: '',
            accountRole: 2,
            accountPassword: ''
        });
    };

    // Validation rules - password required only for new users
    const getValidationRules = () => ({
        accountName: [
            isRequired('Username'),
            minLength(3, 'Username'),
            maxLength(50, 'Username')
        ],
        accountEmail: [
            isRequired('Email'),
            isEmail()
        ],
        accountPassword: selectedAccount
            ? [] // Password optional when editing
            : [isRequired('Password'), minLength(3, 'Password')]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const formErrors = validateForm(formData, getValidationRules());
        setErrors(formErrors);

        if (hasErrors(formErrors)) {
            return;
        }

        try {
            if (selectedAccount) {
                // Update
                const updateData = {
                    AccountName: formData.accountName,
                    AccountEmail: formData.accountEmail,
                    AccountRole: parseInt(formData.accountRole)
                };
                if (formData.accountPassword) {
                    updateData.AccountPassword = formData.accountPassword;
                }
                await userService.updateAccount(selectedAccount.accountId, updateData);
            } else {
                // Create
                await userService.createAccount({
                    AccountName: formData.accountName,
                    AccountEmail: formData.accountEmail,
                    AccountRole: parseInt(formData.accountRole),
                    AccountPassword: formData.accountPassword
                });
            }
            loadAccounts();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save account", error);
        }
    };

    const handleDelete = (account) => {
        setSelectedAccount(account);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await userService.deleteAccount(selectedAccount.accountId);
            loadAccounts();
            setSelectedAccount(null);
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error("Failed to delete account", error);
        }
    };

    return (
        <Container fluid className="users-page py-4">
            {/* Page Header */}
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">User Management</h1>
                    <p className="page-subtitle text-muted">Manage system accounts and permissions</p>
                </Col>
            </Row>

            {/* Toolbar */}
            <Row className="mb-4 align-items-center">
                <Col md={6}>
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search users..."
                    />
                </Col>
                <Col md={6} className="text-md-end mt-3 mt-md-0">
                    <Button variant="primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} className="me-2" />
                        Add User
                    </Button>
                </Col>
            </Row>

            {/* Table */}
            <Card className="shadow-sm">
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccounts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredAccounts.map((account) => (
                                    <tr key={account.accountId}>
                                        <td>{account.accountId}</td>
                                        <td>
                                            <Stack direction="horizontal" gap={2} className="align-items-center">
                                                <UserCircle size={32} className="text-secondary" />
                                                <span className="fw-semibold">{account.accountName}</span>
                                            </Stack>
                                        </td>
                                        <td>{account.accountEmail}</td>
                                        <td>
                                            <Badge bg={account.accountRole === 1 ? 'warning' : 'info'} className="d-flex align-items-center" style={{ width: 'fit-content' }}>
                                                {account.accountRole === 1 && <Shield size={12} className="me-1" />}
                                                {getRoleName(account.accountRole)}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    title="Edit"
                                                    onClick={() => handleOpenModal(account)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    title="Delete"
                                                    onClick={() => handleDelete(account)}
                                                    disabled={account.accountId === 1} // Prevent deleting main admin
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </Stack>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedAccount ? 'Edit User' : 'Add New User'}
                footer={
                    <>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            {selectedAccount ? 'Update' : 'Create'}
                        </Button>
                    </>
                }
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username *</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!errors.accountName}
                            value={formData.accountName}
                            onChange={(e) => {
                                setFormData({ ...formData, accountName: e.target.value });
                                if (errors.accountName) setErrors({ ...errors, accountName: null });
                            }}
                            placeholder="Enter username"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.accountName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            isInvalid={!!errors.accountEmail}
                            value={formData.accountEmail}
                            onChange={(e) => {
                                setFormData({ ...formData, accountEmail: e.target.value });
                                if (errors.accountEmail) setErrors({ ...errors, accountEmail: null });
                            }}
                            placeholder="Enter email address"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.accountEmail}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Password {selectedAccount ? '(leave blank to keep current)' : '*'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={!!errors.accountPassword}
                            value={formData.accountPassword}
                            onChange={(e) => {
                                setFormData({ ...formData, accountPassword: e.target.value });
                                if (errors.accountPassword) setErrors({ ...errors, accountPassword: null });
                            }}
                            placeholder="Enter password"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.accountPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role *</Form.Label>
                        <Form.Select
                            value={formData.accountRole}
                            onChange={(e) => setFormData({ ...formData, accountRole: e.target.value })}
                        >
                            <option value={1}>Admin</option>
                            <option value={2}>Staff</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${selectedAccount?.accountName}"? This action cannot be undone.`}
            />
        </Container>
    );
};

export default UsersPage;
