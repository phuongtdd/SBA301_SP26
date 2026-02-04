# FUNewsManagementSystem - ReactJS Frontend

> **Assignment 01 - SBA301**  
> Họ và tên: Trần Đình Duy Phương  
> Lớp: SE18D04

## 📋 Mục Lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Yêu cầu hệ thống](#2-yêu-cầu-hệ-thống)
3. [Bước 1: Khởi tạo Project](#3-bước-1-khởi-tạo-project)
4. [Bước 2: Cài đặt Dependencies](#4-bước-2-cài-đặt-dependencies)
5. [Bước 3: Thiết lập cấu trúc thư mục](#5-bước-3-thiết-lập-cấu-trúc-thư-mục)
6. [Bước 4: Tạo Design System (CSS)](#6-bước-4-tạo-design-system-css)
7. [Bước 5: Tạo Mock Data](#7-bước-5-tạo-mock-data)
8. [Bước 6: Tạo Authentication Context](#8-bước-6-tạo-authentication-context)
9. [Bước 7: Tạo Layout Components](#9-bước-7-tạo-layout-components)
10. [Bước 8: Tạo Common Components](#10-bước-8-tạo-common-components)
11. [Bước 9: Tạo Login Page](#11-bước-9-tạo-login-page)
12. [Bước 10: Tạo Admin Pages](#12-bước-10-tạo-admin-pages)
13. [Bước 11: Cấu hình Routing](#13-bước-11-cấu-hình-routing)
14. [Bước 12: Chạy và Test](#14-bước-12-chạy-và-test)
15. [Kết quả](#15-kết-quả)

---

## 1. Giới thiệu

**FUNewsManagementSystem** là hệ thống quản lý tin tức cho trường đại học, được xây dựng bằng ReactJS với Vite template. Hệ thống bao gồm các chức năng:

- Quản lý tài khoản người dùng (Account Management)
- Quản lý danh mục tin tức (Category Management)
- Quản lý bài viết tin tức (News Article Management)
- Các thao tác CRUD: Create, Read, Update, Delete và Search

---

## 2. Yêu cầu hệ thống

- **Node.js**: >= 20.19.0 hoặc >= 22.12.0
- **npm**: >= 10.0.0
- **Visual Studio Code** (khuyến nghị)

---

## 3. Bước 1: Khởi tạo Project

Mở terminal và chạy lệnh sau để tạo project React với Vite:

```bash
npm create vite@latest TranDinhDuyPhuong_SE18D04 -- --template react
cd TranDinhDuyPhuong_SE18D04
npm install
```

**Kết quả:** Tạo được project React với cấu trúc cơ bản.

---

## 4. Bước 2: Cài đặt Dependencies

Cài đặt các thư viện cần thiết:

```bash
npm install react-router-dom lucide-react
```

| Package            | Mô tả                      |
| ------------------ | -------------------------- |
| `react-router-dom` | Routing cho ứng dụng React |
| `lucide-react`     | Thư viện icon hiện đại     |

---

## 5. Bước 3: Thiết lập cấu trúc thư mục

Tạo cấu trúc thư mục như sau trong thư mục `src/`:

```
src/
├── components/
│   ├── layout/           # Components cho layout
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── MainLayout.jsx
│   │   └── MainLayout.css
│   └── common/           # Components dùng chung
│       ├── Modal.jsx
│       ├── ConfirmDialog.jsx
│       ├── ConfirmDialog.css
│       └── SearchBar.jsx
├── pages/
│   ├── auth/             # Trang xác thực
│   │   ├── LoginPage.jsx
│   │   └── LoginPage.css
│   └── admin/            # Trang admin
│       ├── DashboardPage.jsx
│       ├── DashboardPage.css
│       ├── CategoryPage.jsx
│       ├── CategoryPage.css
│       ├── NewsPage.jsx
│       ├── NewsPage.css
│       ├── UsersPage.jsx
│       ├── UsersPage.css
│       ├── SettingsPage.jsx
│       └── SettingsPage.css
├── context/
│   └── AuthContext.jsx   # Context cho authentication
├── data/
│   └── mockData.js       # Dữ liệu mẫu
├── App.jsx
├── main.jsx
└── index.css             # Design system
```

---

## 6. Bước 4: Tạo Design System (CSS)

Chỉnh sửa file `src/index.css` để tạo design system với CSS variables:

```css
/* Định nghĩa CSS Variables */
:root {
  /* Primary Colors - Indigo */
  --primary-500: #6366f1;
  --primary-600: #4f46e5;

  /* Background - Dark theme */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-glass: rgba(255, 255, 255, 0.08);

  /* Text Colors */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;

  /* Các biến khác... */
}

/* Reset CSS + Typography + Buttons + Forms + Tables + Modal + Animations */
```

**Điểm nổi bật:**

- Dark theme hiện đại
- Glassmorphism effects
- Smooth transitions
- Responsive design

---

## 7. Bước 5: Tạo Mock Data

Tạo file `src/data/mockData.js` với dữ liệu mẫu theo database schema:

```javascript
// Categories
export const initialCategories = [
  {
    CategoryID: 1,
    CategoryName: "Technology",
    CategoryDescription: "Technology and innovation news",
    ParentCategoryID: null,
    IsActive: true,
  },
  // ... thêm categories khác
];

// System Accounts
export const initialAccounts = [
  {
    AccountID: 1,
    AccountName: "Admin",
    AccountEmail: "admin@funews.edu.vn",
    AccountRole: 1, // Admin = 1, Staff = 2
    AccountPassword: "Admin",
  },
  // ... thêm accounts khác
];

// News Articles
export const initialNewsArticles = [
  {
    NewsArticleID: 1,
    NewsTitle: "FU University Launches New AI Research Center",
    Headline: "A groundbreaking initiative...",
    CreatedDate: "2026-01-15",
    NewsContent: "...",
    CategoryID: 1,
    NewsStatus: 1, // Active = 1, Inactive = 0
    CreatedByID: 1,
    // ... các trường khác
  },
];

// Helper functions
export const getRoleName = (role) => (role === 1 ? "Admin" : "Staff");
export const getStatusName = (status) => (status === 1 ? "Active" : "Inactive");
```

---

## 8. Bước 6: Tạo Authentication Context

Tạo file `src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect } from "react";
import { initialAccounts } from "../data/mockData";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kiểm tra session từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Hàm đăng nhập
  const login = (username, password) => {
    const account = initialAccounts.find(
      (acc) => acc.AccountName === username && acc.AccountPassword === password,
    );
    if (account) {
      const userData = {
        /* ... */
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 9. Bước 7: Tạo Layout Components

### 9.1. Header Component (`components/layout/Header.jsx`)

```jsx
// Header với logo, notifications, user dropdown menu
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">FU</div>
        <h1>FUNews</h1>
      </div>

      {/* User Menu với Dropdown */}
      <div className="user-menu">{/* Avatar, Name, Logout button */}</div>
    </header>
  );
};
```

### 9.2. Sidebar Component (`components/layout/Sidebar.jsx`)

```jsx
// Sidebar với navigation menu
const menuItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/categories", icon: FolderTree, label: "Category" },
  { path: "/admin/news", icon: Newspaper, label: "News" },
  { path: "/admin/users", icon: Users, label: "Users" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <item.icon /> {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
```

### 9.3. MainLayout Component (`components/layout/MainLayout.jsx`)

```jsx
// Layout wrapper với protected route
const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet /> {/* Render child routes */}
      </main>
      <Footer />
    </div>
  );
};
```

---

## 10. Bước 8: Tạo Common Components

### 10.1. Modal Component

```jsx
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
};
```

### 10.2. ConfirmDialog Component

```jsx
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <div className="confirm-content">
      <AlertTriangle />
      <p>{message}</p>
    </div>
    <button onClick={onClose}>Cancel</button>
    <button onClick={onConfirm}>Delete</button>
  </Modal>
);
```

---

## 11. Bước 9: Tạo Login Page

Tạo file `src/pages/auth/LoginPage.jsx`:

```jsx
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);

    if (result.success) {
      navigate("/admin"); // Redirect to admin page
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
```

**Xác thực:** Nếu username = "Admin" và password = "Admin" → redirect tới admin page.

---

## 12. Bước 10: Tạo Admin Pages

### 12.1. Dashboard Page

Hiển thị thống kê và bảng tin tức gần đây:

```jsx
const DashboardPage = () => {
  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard icon={Newspaper} value={totalNews} label="Total News" />
        <StatCard
          icon={FolderTree}
          value={totalCategories}
          label="Categories"
        />
        <StatCard icon={Users} value={totalUsers} label="Users" />
      </div>

      {/* Recent News Table */}
      <table>...</table>
    </div>
  );
};
```

### 12.2. Category Page (CRUD)

```jsx
const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // CREATE
  const handleCreate = (data) => {
    const newCategory = { CategoryID: generateId(), ...data };
    setCategories([...categories, newCategory]);
    localStorage.setItem(
      "categories",
      JSON.stringify([...categories, newCategory]),
    );
  };

  // UPDATE
  const handleUpdate = (id, data) => {
    const updated = categories.map((c) =>
      c.CategoryID === id ? { ...c, ...data } : c,
    );
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  // DELETE (với confirmation)
  const handleDelete = (id) => {
    // Show ConfirmDialog trước khi xóa
    const updated = categories.filter((c) => c.CategoryID !== id);
    setCategories(updated);
  };

  // SEARCH
  const filteredCategories = categories.filter((c) =>
    c.CategoryName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <button onClick={() => openModal()}>Add Category</button>

      <table>{/* Hiển thị categories */}</table>

      <Modal isOpen={isModalOpen}>{/* Form create/update */}</Modal>

      <ConfirmDialog isOpen={isDeleteOpen} onConfirm={confirmDelete} />
    </div>
  );
};
```

### 12.3. News Page, Users Page

Tương tự CategoryPage với các trường tương ứng theo database schema.

---

## 13. Bước 11: Cấu hình Routing

Chỉnh sửa `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import CategoryPage from "./pages/admin/CategoryPage";
import NewsPage from "./pages/admin/NewsPage";
import UsersPage from "./pages/admin/UsersPage";
import SettingsPage from "./pages/admin/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/admin" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

Cập nhật `index.html` để thêm Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## 14. Bước 12: Chạy và Test

### Chạy ứng dụng:

```bash
npm run dev
```

Mở browser: **http://localhost:5173/**

### Test các chức năng:

| Test Case      | Mô tả                 | Kết quả mong đợi                     |
| -------------- | --------------------- | ------------------------------------ |
| Login Success  | Nhập Admin/Admin      | Redirect tới Dashboard               |
| Login Fail     | Nhập sai credentials  | Hiển thị error message               |
| Category CRUD  | Thêm/Sửa/Xóa category | Dữ liệu cập nhật trong bảng          |
| News CRUD      | Thêm/Sửa/Xóa news     | Dữ liệu cập nhật + filters hoạt động |
| Users CRUD     | Thêm/Sửa/Xóa users    | Role được assign đúng                |
| Delete Confirm | Click delete          | Hiện confirmation dialog             |
| Search         | Nhập keyword          | Filter kết quả real-time             |
| Logout         | Click logout          | Redirect về login page               |

---

## 15. Kết quả

### ✅ Các yêu cầu đã hoàn thành:

- [x] Tạo React Project với Vite template
- [x] Thiết kế Login Page
- [x] Tạo logo (sử dụng CSS gradient)
- [x] Xây dựng Header component
- [x] Xây dựng Menu components (Sidebar)
- [x] Triển khai User Authentication (Admin/Admin)
- [x] CRUD cho Category Management
- [x] CRUD cho News Article Management
- [x] CRUD cho Account Management
- [x] Create/Update qua popup dialog
- [x] Delete có confirmation prompt
- [x] Search functionality

### 📸 Giao diện:

**Layout chính:**

- Header (top) - Logo, Notifications, User Menu
- Sidebar (left) - Navigation Menu
- Main Content (center) - Page content
- Footer (bottom) - Copyright

**Design:**

- Dark theme với màu Indigo/Violet
- Glassmorphism effects
- Responsive layout
- Smooth animations

---

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [Lucide Icons](https://lucide.dev/)
