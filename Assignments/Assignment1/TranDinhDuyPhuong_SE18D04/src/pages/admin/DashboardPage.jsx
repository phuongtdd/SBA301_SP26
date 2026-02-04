import { useState, useEffect } from 'react';
import { Newspaper, FolderTree, Users, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';
import { getCategoryName, getStatusName } from '../../data/mockData';
import newsArticleService from '../../services/newsArticleService';
import categoryService from '../../services/categoryService';
import userService from '../../services/userService';
import './DashboardPage.css';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalNews: 0,
        activeNews: 0,
        totalCategories: 0,
        totalUsers: 0
    });

    const [recentNews, setRecentNews] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [newsData, categoryData, userData] = await Promise.all([
                    newsArticleService.getAllNews(),
                    categoryService.getAllCategories(),
                    userService.getAllAccounts()
                ]);

                // Calculate stats
                const safeNewsData = Array.isArray(newsData) ? newsData : [];
                const safeCategoryData = Array.isArray(categoryData) ? categoryData : [];
                const safeUserData = Array.isArray(userData) ? userData : [];

                const activeNews = safeNewsData.filter(n => n.newsStatus === 1);

                setStats({
                    totalNews: safeNewsData.length,
                    activeNews: activeNews.length,
                    totalCategories: safeCategoryData.length,
                    totalUsers: safeUserData.length
                });

                // Get recent news (last 5)
                const sorted = [...safeNewsData].sort((a, b) =>
                    new Date(b.createdDate) - new Date(a.createdDate)
                );
                setRecentNews(sorted.slice(0, 5));
                setCategories(safeCategoryData);

            } catch (error) {
                console.error("Failed to load dashboard data", error);
            }
        };

        loadDashboardData();
    }, []);

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Welcome back! Here's an overview of your news management system.</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon primary">
                        <Newspaper size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalNews}</h3>
                        <p>Total News Articles</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon success">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.activeNews}</h3>
                        <p>Active Articles</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon warning">
                        <FolderTree size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalCategories}</h3>
                        <p>Categories</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon info">
                        <Users size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalUsers}</h3>
                        <p>System Users</p>
                    </div>
                </div>
            </div>

            {/* Recent News */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Recent News Articles</h2>
                    <a href="/admin/news" className="btn btn-secondary btn-sm">View All</a>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentNews.map((news) => (
                                <tr key={news.newsArticleId}>
                                    <td>
                                        <div className="news-title-cell">
                                            <span className="news-title">{news.newsTitle}</span>
                                            <span className="news-headline">{news.headline}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary">
                                            {getCategoryName(news.categoryId, categories)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${news.newsStatus === 1 ? 'badge-success' : 'badge-danger'}`}>
                                            {getStatusName(news.newsStatus)}
                                        </span>
                                    </td>
                                    <td>{news.createdDate}</td>
                                    <td>
                                        <div className="actions-cell">
                                            <button className="btn btn-ghost btn-icon" title="View">
                                                <Eye size={16} />
                                            </button>
                                            <button className="btn btn-ghost btn-icon" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
