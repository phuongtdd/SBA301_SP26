import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderTree,
    Newspaper,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

import { useAuth } from '../../hooks';

const Sidebar = () => {
    const { user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    // Default items common to all or handled conditionally
    const allMenuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true, roles: [1, 2] },
        { path: '/admin/categories', icon: FolderTree, label: 'Category', roles: [2] },
        { path: '/admin/news', icon: Newspaper, label: 'News', roles: [2] },
        { path: '/admin/history', icon: Newspaper, label: 'My History', roles: [2] },
        { path: '/admin/users', icon: Users, label: 'Users', roles: [1] }, // Admin only
        { path: '/admin/profile', icon: Users, label: 'Profile', roles: [2] },
        { path: '/admin/settings', icon: Settings, label: 'Settings', roles: [1, 2] },
    ];

    const userRole = user?.accountRole || user?.role;
    const filteredMenu = allMenuItems.filter(item => item.roles.includes(userRole));

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <nav className="sidebar-nav">
                <div className="nav-label">Navigation</div>
                <ul className="nav-menu">
                    {filteredMenu.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <item.icon size={20} className="nav-icon" />
                                <span className="nav-text">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? 'Expand' : 'Collapse'}
            >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
        </aside>
    );
};

export default Sidebar;
