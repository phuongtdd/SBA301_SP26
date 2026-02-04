import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../../hooks';
import newsArticleService from '../../services/newsArticleService';
import categoryService from '../../services/categoryService';
import { getCategoryName, getStatusName } from '../../data/mockData';
import { Eye } from 'lucide-react';

const NewsHistoryPage = () => {
    const { user } = useAuth();
    const [myNews, setMyNews] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadHistory();
    }, [user]);

    const loadHistory = async () => {
        if (!user) return;
        try {
            const accountId = user.accountId || user.id;
            const [newsData, categoryData] = await Promise.all([
                newsArticleService.getNewsByCreator(accountId),
                categoryService.getAllCategories()
            ]);

            setMyNews(Array.isArray(newsData) ? newsData : (newsData?.data || [])); // Handle potential wrapping
            setCategories(Array.isArray(categoryData) ? categoryData : []);
        } catch (error) {
            console.error("Failed to load news history", error);
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">My News History</h1>
                    <p className="page-subtitle text-muted">List of news articles created by you</p>
                </Col>
            </Row>

            <Card className="shadow-sm">
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                <th>Modified Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myNews.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-muted">
                                        You haven't created any news articles yet.
                                    </td>
                                </tr>
                            ) : (
                                myNews.map((news) => (
                                    <tr key={news.newsArticleId}>
                                        <td>{news.newsArticleId}</td>
                                        <td>
                                            <div className="news-title-cell">
                                                <span className="fw-semibold d-block">{news.newsTitle}</span>
                                                <small className="text-muted">{news.headline}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <Badge bg="primary">
                                                {getCategoryName(news.categoryId, categories)}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge bg={(news.newsStatus === 1 || news.isActive === true) ? 'success' : 'danger'}>
                                                {getStatusName(news.newsStatus !== undefined ? news.newsStatus : news.isActive)}
                                            </Badge>
                                        </td>
                                        <td>{news.createdDate}</td>
                                        <td>{news.modifiedDate || '-'}</td>
                                        <td>
                                            <Button variant="outline-info" size="sm" title="View">
                                                <Eye size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NewsHistoryPage;
