import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Stack } from 'react-bootstrap';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getCategoryName, getAccountName, getStatusName, initialTags } from '../../data/mockData';
import newsArticleService from '../../services/newsArticleService';
import categoryService from '../../services/categoryService';
import userService from '../../services/userService';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { useAuth } from '../../hooks';
import { validateForm, hasErrors, isRequired, minLength, maxLength } from '../../utils/validation';

const NewsPage = () => {
    const { user } = useAuth();
    const [newsArticles, setNewsArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [tags, setTags] = useState(initialTags); // Use mock tags for now
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        newsTitle: '',
        headline: '',
        newsContent: '',
        newsSource: '',
        categoryId: '',
        newsStatus: 1,
        tags: [] // Array of TagIDs
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [newsData, categoryData, accountData] = await Promise.all([
                newsArticleService.getAllNews(),
                categoryService.getAllCategories(),
                userService.getAllAccounts()
            ]);
            setNewsArticles(Array.isArray(newsData) ? newsData : []);
            setCategories(Array.isArray(categoryData) ? categoryData : []);
            setAccounts(Array.isArray(accountData) ? accountData : []);
        } catch (error) {
            console.error("Failed to load data", error);
        }
    };



    const filteredNews = newsArticles.filter(news => {
        const matchesSearch =
            (news.newsTitle?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (news.headline?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (news.newsContent?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        const matchesCategory = !filterCategory || news.categoryId === parseInt(filterCategory);
        const matchesStatus = filterStatus === '' || news.newsStatus === parseInt(filterStatus);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleOpenModal = (news = null) => {
        setErrors({});
        if (news) {
            setSelectedNews(news);
            setFormData({
                newsTitle: news.newsTitle,
                headline: news.headline,
                newsContent: news.newsContent,
                newsSource: news.newsSource,
                categoryId: news.categoryId,
                newsStatus: news.newsStatus,
                tags: news.tags || []
            });
        } else {
            setSelectedNews(null);
            setFormData({
                newsTitle: '',
                headline: '',
                newsContent: '',
                newsSource: '',
                categoryId: categories[0]?.categoryId || '',
                newsStatus: 1,
                tags: []
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
        setErrors({});
    };

    const handleViewNews = (news) => {
        setSelectedNews(news);
        setIsViewModalOpen(true);
    };

    // Validation rules
    const validationRules = {
        newsTitle: [
            isRequired('Title'),
            minLength(5, 'Title'),
            maxLength(200, 'Title')
        ],
        headline: [
            isRequired('Headline'),
            minLength(10, 'Headline'),
            maxLength(300, 'Headline')
        ],
        categoryId: [isRequired('Category')],
        newsContent: [
            isRequired('Content'),
            minLength(20, 'Content')
        ]
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
            if (selectedNews) {
                // Update
                await newsArticleService.updateNews(selectedNews.newsArticleId, {
                    ...formData,
                    categoryId: parseInt(formData.categoryId),
                    isActive: formData.newsStatus === 1,
                    updatedById: user?.id
                });
            } else {
                // Create
                await newsArticleService.createNews({
                    ...formData,
                    categoryId: parseInt(formData.categoryId),
                    isActive: formData.newsStatus === 1,
                    createdById: user?.accountId || user?.id,
                    updatedById: user?.accountId || user?.id
                });
            }
            loadData();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save news", error);
        }
    };

    const handleDelete = (news) => {
        setSelectedNews(news);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await newsArticleService.deleteNews(selectedNews.newsArticleId);
            loadData();
            setSelectedNews(null);
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error("Failed to delete news", error);
        }
    };

    const handleTagChange = (e) => {
        const options = e.target.options;
        const selectedTags = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedTags.push(parseInt(options[i].value));
            }
        }
        setFormData({ ...formData, tags: selectedTags });
    };

    return (
        <Container fluid className="news-page py-4">
            {/* Page Header */}
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">News Article Management</h1>
                    <p className="page-subtitle ">Create, manage, and publish news articles</p>
                </Col>
            </Row>

            {/* Toolbar */}
            <Row className="mb-4 align-items-center g-3">
                <Col md={4}>
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search news..."
                    />
                </Col>
                <Col md="auto">
                    <Form.Select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md="auto">
                    <Form.Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </Form.Select>
                </Col>
                <Col md="auto" className="ms-md-auto">
                    <Button variant="primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} className="me-2" />
                        Add Article
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
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNews.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 ">
                                        No news articles found
                                    </td>
                                </tr>
                            ) : (
                                filteredNews.map((news) => (
                                    <tr key={news.newsArticleId}>
                                        <td>{news.newsArticleId}</td>
                                        <td>
                                            <div className="news-title-cell">
                                                <span className="fw-semibold d-block">{news.newsTitle}</span>
                                                <small >{news.headline}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <Badge bg="primary">
                                                {getCategoryName(news.categoryId, categories)}
                                            </Badge>
                                        </td>
                                        <td>{getAccountName(news.createdById, accounts)}</td>
                                        <td>
                                            <Badge bg={(news.newsStatus === 1 || news.isActive === true) ? 'success' : 'danger'}>
                                                {getStatusName(news.newsStatus !== undefined ? news.newsStatus : news.isActive)}
                                            </Badge>
                                        </td>
                                        <td>{news.createdDate}</td>
                                        <td>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button
                                                    variant="outline-info"
                                                    size="sm"
                                                    title="View"
                                                    onClick={() => handleViewNews(news)}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    title="Edit"
                                                    onClick={() => handleOpenModal(news)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    title="Delete"
                                                    onClick={() => handleDelete(news)}
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
                title={selectedNews ? 'Edit News Article' : 'Add New Article'}
                size="lg"
                footer={
                    <>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            {selectedNews ? 'Update' : 'Create'}
                        </Button>
                    </>
                }
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title *</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!errors.newsTitle}
                            value={formData.newsTitle}
                            onChange={(e) => {
                                setFormData({ ...formData, newsTitle: e.target.value });
                                if (errors.newsTitle) setErrors({ ...errors, newsTitle: null });
                            }}
                            placeholder="Enter article title"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.newsTitle}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Headline *</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!errors.headline}
                            value={formData.headline}
                            onChange={(e) => {
                                setFormData({ ...formData, headline: e.target.value });
                                if (errors.headline) setErrors({ ...errors, headline: null });
                            }}
                            placeholder="Enter headline"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.headline}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Category *</Form.Label>
                                <Form.Select
                                    isInvalid={!!errors.categoryId}
                                    value={formData.categoryId}
                                    onChange={(e) => {
                                        setFormData({ ...formData, categoryId: e.target.value });
                                        if (errors.categoryId) setErrors({ ...errors, categoryId: null });
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.categoryId} value={cat.categoryId}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.categoryId}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={formData.newsStatus}
                                    onChange={(e) => setFormData({ ...formData, newsStatus: parseInt(e.target.value) })}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags</Form.Label>
                        <Form.Select
                            multiple
                            value={formData.tags}
                            onChange={handleTagChange}
                            style={{ height: '100px' }}
                        >
                            {tags.map(tag => (
                                <option key={tag.TagID} value={tag.TagID}>
                                    {tag.TagName}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Hold Ctrl/Cmd to select multiple tags
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>News Source</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.newsSource}
                            onChange={(e) => setFormData({ ...formData, newsSource: e.target.value })}
                            placeholder="Enter news source"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content *</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            isInvalid={!!errors.newsContent}
                            value={formData.newsContent}
                            onChange={(e) => {
                                setFormData({ ...formData, newsContent: e.target.value });
                                if (errors.newsContent) setErrors({ ...errors, newsContent: null });
                            }}
                            placeholder="Enter article content"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.newsContent}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal>

            {/* View Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="View Article"
                size="lg"
                footer={
                    <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
                        Close
                    </Button>
                }
            >
                {selectedNews && (
                    <div className="news-view">
                        <h2 className="h4 mb-2">{selectedNews.newsTitle}</h2>
                        <p className="lead mb-3">{selectedNews.headline}</p>
                        <Stack direction="horizontal" gap={2} className="mb-4 flex-wrap">
                            <Badge bg="primary">
                                {getCategoryName(selectedNews.categoryId, categories)}
                            </Badge>
                            <Badge bg={selectedNews.newsStatus === 1 ? 'success' : 'danger'}>
                                {getStatusName(selectedNews.newsStatus)}
                            </Badge>
                            <small >
                                By {getAccountName(selectedNews.createdById, accounts)} • {selectedNews.createdDate}
                            </small>
                        </Stack>

                        {selectedNews.tags && selectedNews.tags.length > 0 && (
                            <div className="mb-3">
                                <strong>Tags: </strong>
                                {selectedNews.tags.map(tagId => {
                                    const tag = tags.find(t => t.TagID === tagId);
                                    return tag ? <Badge bg="secondary" className="me-1" key={tagId}>{tag.TagName}</Badge> : null;
                                })}
                            </div>
                        )}

                        <div className="news-view-content mb-3">
                            <p>{selectedNews.newsContent}</p>
                        </div>
                        {selectedNews.newsSource && (
                            <p className=" fst-italic">Source: {selectedNews.newsSource}</p>
                        )}
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete News Article"
                message={`Are you sure you want to delete "${selectedNews?.newsTitle}"? This action cannot be undone.`}
            />
        </Container>
    );
};

export default NewsPage;
