# Báo Cáo Triển Khai Frontend - FUNews Management System

**Sinh viên:** Trần Đình Duy Phương  
**Mã số SV:** SE18D04  
**Dự án:** TranDinhDuyPhuong_SE18D04

---

## 1. Giới thiệu Dự án

FUNews Management System là hệ thống quản lý tin tức dành cho quản trị viên và nhân viên. Phần Frontend của dự án được xây dựng dưới dạng Single Page Application (SPA), cung cấp giao diện người dùng hiện đại, tương tác nhanh chóng và trải nghiệm mượt mà để quản lý danh mục, bài viết và tài khoản người dùng.

## 2. Công Nghệ Sử Dụng

Dự án sử dụng các công nghệ hiện đại trong hệ sinh thái React:

- **Core Framework:** React 19
- **Build Tool:** Vite (Tối ưu hóa tốc độ phát triển và build)
- **Routing:** React Router Dom 7 (Quản lý điều hướng client-side)
- **HTTP Client:** Axios (Giao tiếp với Backend API)
- **UI Framework:** React Bootstrap & Bootstrap 5 (Responsive Layout và Components)
- **Icons:** Lucide-React (Bộ icon hiện đại, nhẹ)
- **State Management:** React Context API (Quản lý trạng thái xác thực - Auth)

## 3. Kiến Trúc Dự Án

Dự án được tổ chức theo mô hình module hóa, tách biệt rõ ràng giữa giao diện (UI) và logic nghiệp vụ (Business Logic).

### Cấu trúc thư mục chính:

- `src/components`: Các UI component tái sử dụng (Header, Sidebar, Modal, Tables...).
- `src/pages`: Các trang chức năng chính (Login, Dashboard, Category, News, Users).
- `src/services`: Layer giao tiếp API. Chứa cấu hình Axios và các hàm gọi API theo từng module (Service Pattern).
- `src/context`: Quản lý Global State (AuthContext cho thông tin đăng nhập).
- `src/layout`: Định nghĩa bố cục trang (MainLayout chứa Sidebar + Header).

## 4. Chi Tiết Triển Khai

### 4.1. Tích Hợp API (Service Layer)

Tất cả các gọi API được tập trung trong thư mục `src/services` để dễ bảo trì.

- **`api.js`**: Cấu hình Axios instance với `baseURL` trỏ đến Backend (`http://localhost:8080/api`).
- **Interceptors**: Tự động đính kèm `Authorization: Bearer {token}` vào mỗi request nếu người dùng đã đăng nhập.
- Các File Service thành phần: `authService`, `categoryService`, `newsArticleService`, `userService`.

### 4.2. Quản Lý Xác Thực (Authentication)

- **AuthContext**: Lưu trữ trạng thái `user` và `token`. Khi khởi động, ứng dụng tự động khôi phục phiên làm việc từ `localStorage` (nếu có).
- **Login Flow**: Người dùng nhập email/pass -> Gọi `authService.login` -> Nhận Token & Info -> Lưu vào Context & LocalStorage -> Chuyển hướng vào trang Admin.
- **Protected Routes**: Component `MainLayout` kiểm tra trạng thái `isAuthenticated`. Nếu chưa đăng nhập, hệ thống tự động chuyển hướng về trang `/login` (sử dụng `<Navigate />`).

### 4.3. Các Phân Hệ Chức Năng (Modules)

Mỗi module quản lý (Category, News, Users) đều tuân theo quy trình chuẩn:

1.  **Fetching Data**: Sử dụng `useEffect` để gọi API lấy danh sách khi trang được load.
2.  **Display**: Hiển thị dữ liệu lên bảng (Table) với các cột tương ứng.
3.  **Search**: Chức năng tìm kiếm client-side hoặc gọi API search (tùy implementation).
4.  **CUD Operations (Create, Update, Delete)**:
    - Sử dụng **Modal** chung để hiển thị form Thêm mới/Chỉnh sửa.
    - Sử dụng **ConfirmDialog** để xác nhận trước khi xóa.
    - Sau mỗi thao tác thành công, danh sách dữ liệu được tự động reload.

**Chi tiết từng trang:**

- **Dashboard**: Hiển thị thẻ thống kê (Tổng số tin, Danh mục, User) và bảng tin tức mới nhất. Dữ liệu được tổng hợp từ nhiều API calls.
- **News Management**: Quản lý bài viết với đầy đủ thông tin (Tiêu đề, Headline, Nội dung, Danh mục, Trạng thái). Hỗ trợ lọc theo Danh mục và Trạng thái.
- **Category Management**: Quản lý cây danh mục tin tức (hỗ trợ danh mục cha - con).
- **User Management**: Quản lý tài khoản truy cập hệ thống (Admin/Staff) và phân quyền.

## 5. UI/UX Design

- **Responsive**: Giao diện hiển thị tốt trên cả Desktop và Mobile nhờ Grid System của Bootstrap.
- **Loading State**: Hiển thị spinner khi đang tải dữ liệu hoặc xử lý đăng nhập.
- **Feedback**: Hiển thị thông báo lỗi (form validation) ngay trên các trường nhập liệu.

## 6. Hướng Dẫn Cài Đặt & Chạy

Yêu cầu: Node.js (v18 trở lên).

1.  Cài đặt dependencies:
    ```bash
    npm install
    ```
2.  Chạy môi trường phát triển (Development):

    ```bash
    npm run dev
    ```

    Ứng dụng sẽ chạy tại: `http://localhost:5173`

3.  Build sản phẩm (Production):
    ```bash
    npm run build
    ```

---

_Báo cáo được trích xuất dựa trên source code thực tế của dự án._

---

## 7. Hướng Dẫn Chi Tiết Triển Khai

Dưới đây là hướng dẫn từng bước để triển khai các yêu cầu cụ thể của dự án:

### 7.1. Thiết kế Trang Login (Design a login page)

1.  **Tạo Component**: Tạo file `src/pages/auth/LoginPage.jsx`.
2.  **Cấu trúc HTML**: Sử dụng `Container` của Bootstrap để căn giữa nội dung. Tạo một `Card` chứa form đăng nhập.
3.  **Form Elements**:
    - Input Email: `type="email"`, `placeholder="name@example.com"`.
    - Input Password: `type="password"`.
    - Nút Submit: `Button` variant="primary", width 100%.
4.  **Styling**: Sử dụng CSS (hoặc `className` utility) để tạo background mờ hoặc hình ảnh nền chuyên nghiệp.
5.  **Logic**: Gắn hàm `handleLogin` vào sự kiện `onSubmit` của form để gọi `authService`.

### 7.2. Tạo Logo bằng AI (Create a logo using AI generation)

1.  **Sử dụng công cụ**: Truy cập các công cụ tạo ảnh AI (như Midjourney, DALL-E, hoặc các trang logo maker free).
2.  **Prompt**: Nhập mô tả "Modern abstract university news logo, minimalist, blue and white color scheme".
3.  **Xử lý hậu kỳ**: Tải ảnh về, xóa nền (remove background) nếu cần thiết để có định dạng PNG trong suốt.
4.  **Tích hợp**:
    - Lưu file ảnh vào thư mục `src/assets/logo.png`.
    - Import vào `Header.jsx`: `import logo from '../../assets/logo.png'`.

### 7.3. Phát triển Header Component (Develop a header component)

1.  **Tạo Component**: `src/components/layout/Header.jsx`.
2.  **Layout**: Sử dụng `Navbar` của React Bootstrap.
    - **Left**: Hiển thị Logo đã tạo ở bước 7.2 và Tên ứng dụng "FUNews Admin".
    - **Right**: Hiển thị Dropdown chứa thông tin người dùng (Avatar/Tên) và nút "Đăng xuất".
3.  **Responsive**: Đảm bảo Header có nút toggle cho Sidebar khi ở giao diện mobile.

### 7.4. Tạo Menu Components (Create menu components)

1.  **Tạo Sidebar**: `src/components/layout/Sidebar.jsx`.
2.  **Danh sách Menu**: Tạo mảng cấu hình menu để dễ quản lý:
    ```javascript
    const menuItems = [
      { path: "/admin", label: "Dashboard", icon: <LayoutDashboard /> },
      { path: "/admin/categories", label: "Categoies", icon: <FolderTree /> },
      { path: "/admin/news", label: "News", icon: <Newspaper /> },
      { path: "/admin/users", label: "Users", icon: <users /> },
      { path: "/admin/settings", label: "Settings", icon: <Settings /> },
    ];
    ```
3.  **Render**: Sử dụng `map` để render danh sách `NavLink`.
4.  **Active State**: Sử dụng thuộc tính `className={({ isActive }) => ...}` của `NavLink` để highlight mục đang chọn.

### 7.5. Xác Thực Người Dùng (User authentication)

1.  **Backend Logic**: API `/api/auth/login` sẽ kiểm tra username/password.
2.  **Frontend Handling**:
    - Tại `authService.login`: Gọi API. Nếu thành công (API trả về 200 OK + Token), lưu User Info vào `localStorage`.
    - Tại `AuthContext`: Kiểm tra role người dùng.
    - **Yêu cầu Admin**: Nếu `user.role === 1` (Admin) và password đúng (đã được Server verify), hệ thống trả về token.
3.  **Redirection**:
    - Trong `LoginPage.jsx`: Sau khi `login()` thành công, sử dụng `navigate('/admin')` để chuyển hướng.
    - Trong `App.jsx`: Route `/` có element `<Navigate to="/admin" />` để tự động vào trang admin.

### 7.6. Chức Năng Admin (Admin functionalities)

#### Yêu cầu chung cho các trang (News, Account, Category):

- **Read (Xem)**: Gọi API `getAll...` trong `useEffect` và hiển thị ra `Table`.
- **Search (Tìm kiếm)**: Tạo input search, gọi API search (`/search?keyword=...`) mỗi khi người dùng nhập (có thể dùng debounce).

#### Create & Update (Popup Dialog):

1.  **State**: Dùng `isModalOpen` (boolean) và `selectedItem` (object).
2.  **Open Modal**:
    - Nút "Add New": Set `selectedItem = null`, `isModalOpen = true`.
    - Nút "Edit": Set `selectedItem = item`, `isModalOpen = true`.
3.  **Modal Content**:
    - Tái sử dụng component `Modal`.
    - Hiển thị Form tương ứng. Nếu `selectedItem` có giá trị, điền sẵn dữ liệu vào các ô input (Controlled Components).
4.  **Save**: Khi submit form, kiểm tra `selectedItem`:
    - Nếu null -> Gọi `createService`.
    - Nếu có -> Gọi `updateService(id, data)`.

#### Delete (Confirmation Prompt):

1.  **State**: `isDeleteDialogOpen` (boolean), `itemToDelete` (object).
2.  **Action**: Khi bấm icon thùng rác -> Set `itemToDelete = item`, `isDeleteDialogOpen = true`.
3.  **Confirm UI**: Hiển thị Dialog hỏi "Are you sure you want to delete...?" với 2 nút "Cancel" và "Delete".
4.  **Execute**: Khi bấm "Delete" -> Gọi `deleteService(id)` -> Tắt dialog -> Reload lại bảng dữ liệu.

### 7.7. Chi Tiết Các Menu Component (Menu components detailed)

Dưới đây là mô tả chi tiết về cách thức hoạt động và triển khai của từng chức năng trong Menu:

#### 1. Sidebar Component (Menu Navigation)

- **Vị trí**: `src/components/layout/Sidebar.jsx`
- **Chức năng**: Hiển thị danh sách liên kết điều hướng bên trái màn hình.
- **Triển khai**:
  - Sử dụng mảng `menuItems` để định nghĩa: Dashboard, Category, News, Users, Settings.
  - Sử dụng component `NavLink` của `react-router-dom` để tạo liên kết.
  - **Highlighting**: Tự động thêm class `active` cho mục menu tương ứng với URL hiện tại (VD: đang ở `/admin/news` thì mục News sẽ sáng lên).
  - **Icons**: Sử dụng bộ icon `lucide-react` (LayoutDashboard, FolderTree, Newspaper, Users, Settings) để tăng tính trực quan.

#### 2. Dashboard Component

- **Vị trí**: `src/pages/admin/DashboardPage.jsx`
- **Mục đích**: Trang tổng quan, cung cấp cái nhìn toàn cảnh về hệ thống.
- **Chi tiết**:
  - **Thẻ Thống Kê (Stats Cards)**: Hiển thị 4 chỉ số chính: Tổng số bài viết, Bài đang hoạt động, Tổng danh mục, Tổng user. Dữ liệu được tính toán từ API trả về.
  - **Bảng Tin Mới (Recent News)**: Hiển thị 5 bài viết gần nhất, giúp admin nắm bắt nội dung mới cập nhật.
  - **Biểu đồ (Tùy chọn)**: Có thể mở rộng để vẽ biểu đồ tăng trưởng (sử dụng thư viện như Recharts).

#### 3. Category Component (Quản lý Danh mục)

- **Vị trí**: `src/pages/admin/CategoryPage.jsx`
- **Mục đích**: Phân loại tin tức thành các nhóm (VD: Thể thao, Công nghệ, Giáo dục).
- **Tính năng chính**:
  - **Cấu trúc cây**: Hỗ trợ danh mục cha - con (Parent Category).
  - **Bảng dữ liệu**: Hiển thị ID, Tên, Mô tả, Danh mục cha, Trạng thái.
  - **Modal Form**: Cho phép tạo mới hoặc chỉnh sửa tên và cấu trúc cha-con của danh mục.

#### 4. News Component (Quản lý Tin tức)

- **Vị trí**: `src/pages/admin/NewsPage.jsx`
- **Mục đích**: Trung tâm nội dung của hệ thống.
- **Tính năng chính**:
  - **Nội dung phong phú**: Form nhập liệu bao gồm Tiêu đề, Headline, Nội dung chi tiết, Nguồn tin.
  - **Liên kết dữ liệu**: Khi tạo bài viết, admin phải chọn Danh mục (từ Category API) và hệ thống tự ghi nhận Tác giả (từ User đang login).
  - **Bộ lọc (Filter)**: Thanh công cụ cho phép lọc bài viết theo Danh mục hoặc Trạng thái (Published/Draft/Hidden).

#### 5. Users Component (Quản lý Người dùng)

- **Vị trí**: `src/pages/admin/UsersPage.jsx`
- **Mục đích**: Quản trị viên hệ thống và nhân viên biên tập.
- **Tính năng chính**:
  - **Phân quyền (Role)**: Gán quyền Admin (Toàn quyền) hoặc Staff (Giới hạn).
  - **Bảo mật**: Mật khẩu khi tạo mới được xử lý (trong thực tế sẽ được hash tại backend).
  - **Phòng vệ**: Không cho phép xóa tài khoản Admin chính (ID=1) để tránh lỗi hệ thống.

#### 6. Settings Component (Cài đặt)

- **Vị trí**: `src/pages/admin/SettingsPage.jsx`
- **Mục đích**: Tùy chỉnh cá nhân hóa cho người dùng đang đăng nhập.
- **Các Tab chức năng**:
  - **Profile**: Cập nhật thông tin cá nhân (Tên hiển thị, Email). Trường "Role" bị vô hiệu hóa (read-only) để đảm bảo an toàn.
  - **Notifications**: Cấu hình bật/tắt nhận email hoặc thông báo đẩy.
  - **Appearance**: Tùy chọn giao diện Sáng/Tối (Dark Mode).
  - **System**: Xem thông tin phiên bản phần mềm.
- **UX**: Sử dụng Tabs để chuyển đổi mượt mà giữa các nhóm cài đặt mà không cần tải lại trang.
