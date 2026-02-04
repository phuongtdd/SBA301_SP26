/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Stack } from 'react-bootstrap';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getStatusName } from '../../data/mockData';
import categoryService from '../../services/categoryService';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { validateForm, hasErrors, isRequired, minLength, maxLength } from '../../utils/validation';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        CategoryName: '',
        CategoryDescription: '',
        ParentCategoryID: '',
        IsActive: true
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    };

    const filteredCategories = categories.filter(cat =>
        (cat.categoryName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (cat.categoryDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (category = null) => {
        setErrors({});
        if (category) {
            setSelectedCategory(category);
            setFormData({
                categoryName: category.categoryName,
                categoryDescription: category.categoryDescription,
                parentCategoryId: category.parentCategoryId || '',
                isActive: category.isActive
            });
        } else {
            setSelectedCategory(null);
            setFormData({
                categoryName: '',
                categoryDescription: '',
                parentCategoryId: '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
        setErrors({});
        setFormData({
            categoryName: '',
            categoryDescription: '',
            parentCategoryId: '',
            isActive: true
        });
    };

    // Validation rules
    const validationRules = {
        categoryName: [
            isRequired('Category name'),
            minLength(2, 'Category name'),
            maxLength(100, 'Category name')
        ],
        categoryDescription: [maxLength(500, 'Description')]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const formErrors = validateForm(formData, validationRules);
        setErrors(formErrors);

        if (hasErrors(formErrors)) {
            return;
        }

        try {
            if (selectedCategory) {
                // Update
                await categoryService.updateCategory(selectedCategory.categoryId, {
                    ...formData,
                    parentCategoryId: formData.parentCategoryId || null
                });
            } else {
                // Create
                await categoryService.createCategory({
                    ...formData,
                    parentCategoryId: formData.parentCategoryId || null
                });
            }
            loadCategories();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save category", error);
            // Optionally set global error state here
        }
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await categoryService.deleteCategory(selectedCategory.categoryId);
            loadCategories();
            setSelectedCategory(null);
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error("Failed to delete category", error);
        }
    };

    const getParentCategoryName = (parentId) => {
        if (!parentId) return '-';
        const parent = categories.find(c => c.categoryId === parentId);
        return parent ? parent.categoryName : '-';
    };

    return (
        <Container fluid className="category-page py-4">
            {/* Page Header */}
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">Category Management</h1>
                    <p className="page-subtitle text-muted">Manage news categories and their hierarchy</p>
                </Col>
            </Row>

            {/* Toolbar */}
            <Row className="mb-4 align-items-center">
                <Col md={6}>
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search categories..."
                    />
                </Col>
                <Col md={6} className="text-md-end mt-3 mt-md-0">
                    <Button variant="primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} className="me-2" />
                        Add Category
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
                                <th>Name</th>
                                <th>Description</th>
                                <th>Parent Category</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">
                                        No categories found
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr key={category.categoryId}>
                                        <td>{category.categoryId}</td>
                                        <td><strong>{category.categoryName}</strong></td>
                                        <td className="description-cell">{category.categoryDescription}</td>
                                        <td>{getParentCategoryName(category.parentCategoryId)}</td>
                                        <td>
                                            <Badge bg={category.isActive ? 'success' : 'danger'}>
                                                {getStatusName(category.isActive)}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    title="Edit"
                                                    onClick={() => handleOpenModal(category)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    title="Delete"
                                                    onClick={() => handleDelete(category)}
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
                title={selectedCategory ? 'Edit Category' : 'Add New Category'}
                footer={
                    <>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            {selectedCategory ? 'Update' : 'Create'}
                        </Button>
                    </>
                }
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name *</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!errors.categoryName}
                            value={formData.categoryName}
                            onChange={(e) => {
                                setFormData({ ...formData, categoryName: e.target.value });
                                if (errors.categoryName) setErrors({ ...errors, categoryName: null });
                            }}
                            placeholder="Enter category name"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.categoryName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            isInvalid={!!errors.categoryDescription}
                            value={formData.categoryDescription}
                            onChange={(e) => {
                                setFormData({ ...formData, categoryDescription: e.target.value });
                                if (errors.categoryDescription) setErrors({ ...errors, categoryDescription: null });
                            }}
                            placeholder="Enter category description"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.categoryDescription}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Parent Category</Form.Label>
                        <Form.Select
                            value={formData.parentCategoryId}
                            onChange={(e) => setFormData({ ...formData, parentCategoryId: e.target.value ? parseInt(e.target.value) : '' })}
                        >
                            <option value="">None (Top Level)</option>
                            {categories
                                .filter(c => c.categoryId !== selectedCategory?.categoryId)
                                .map(cat => (
                                    <option key={cat.categoryId} value={cat.categoryId}>
                                        {cat.categoryName}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={formData.isActive ? '1' : '0'}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === '1' })}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message={`Are you sure you want to delete "${selectedCategory?.CategoryName}"? This action cannot be undone.`}
            />
        </Container>
    );
};

export default CategoryPage;
