# FUNews Management System - Implementation Plan

## Overview

Implementing a complete News Management System with:

- **Backend**: Spring Boot 3 REST API with 3-Layer Architecture
- **Frontend**: ReactJS with Axios for API calls
- **Database**: MS SQL Server with Spring Data JPA

---

## Database Schema

### Tables:

- **SystemAccount**: AccountID, AccountName, AccountEmail, AccountRole (1=Admin, 2=Staff), AccountPassword
- **Category**: CategoryID, CategoryName, CategoryDescription, ParentCategoryID, IsActive
- **NewsArticle**: NewsArticleID, NewsTitle, Headline, CreatedDate, NewsContent, NewsSource, CategoryID, NewsStatus, CreatedByID, UpdatedByID, ModifiedDate
- **Tag**: TagID, TagName, Note
- **NewsTag**: NewsArticleID, TagID (Many-to-Many relationship)

---

## API Endpoints

### Authentication

| Method | Endpoint          | Description                   |
| ------ | ----------------- | ----------------------------- |
| POST   | `/api/auth/login` | Login with email and password |

### Account Management (Admin)

| Method | Endpoint                        | Description                               |
| ------ | ------------------------------- | ----------------------------------------- |
| GET    | `/api/accounts`                 | Get all accounts                          |
| GET    | `/api/accounts/{id}`            | Get account by ID                         |
| POST   | `/api/accounts`                 | Create new account                        |
| PUT    | `/api/accounts/{id}`            | Update account                            |
| DELETE | `/api/accounts/{id}`            | Delete account (only if no news articles) |
| GET    | `/api/accounts/search?keyword=` | Search accounts                           |

### Category Management (Staff)

| Method | Endpoint                          | Description                                |
| ------ | --------------------------------- | ------------------------------------------ |
| GET    | `/api/categories`                 | Get all categories                         |
| GET    | `/api/categories/{id}`            | Get category by ID                         |
| POST   | `/api/categories`                 | Create new category                        |
| PUT    | `/api/categories/{id}`            | Update category                            |
| DELETE | `/api/categories/{id}`            | Delete category (only if no news articles) |
| GET    | `/api/categories/search?keyword=` | Search categories                          |

### News Article Management (Staff)

| Method | Endpoint                        | Description                       |
| ------ | ------------------------------- | --------------------------------- |
| GET    | `/api/news`                     | Get all news articles             |
| GET    | `/api/news/active`              | Get active news articles (public) |
| GET    | `/api/news/{id}`                | Get news article by ID            |
| POST   | `/api/news`                     | Create new news article           |
| PUT    | `/api/news/{id}`                | Update news article               |
| DELETE | `/api/news/{id}`                | Delete news article               |
| GET    | `/api/news/search?keyword=`     | Search news articles              |
| GET    | `/api/news/creator/{accountId}` | Get news by creator               |

### Tag Management

| Method | Endpoint                    | Description    |
| ------ | --------------------------- | -------------- |
| GET    | `/api/tags`                 | Get all tags   |
| GET    | `/api/tags/{id}`            | Get tag by ID  |
| POST   | `/api/tags`                 | Create new tag |
| PUT    | `/api/tags/{id}`            | Update tag     |
| DELETE | `/api/tags/{id}`            | Delete tag     |
| GET    | `/api/tags/search?keyword=` | Search tags    |

---

## Project Structure

```
A2TranDinhDuyPhuong_SE18D04/
├── src/main/java/sba301/a2trandinhduyphuong_se18d04/
│   ├── entities/          # JPA Entity classes
│   │   ├── Category.java
│   │   ├── NewsArticle.java
│   │   ├── SystemAccount.java
│   │   ├── Tag.java
│   │   └── enumerations/
│   │       ├── CategoryStatus.java
│   │       └── NewsStatus.java
│   ├── repositories/      # Spring Data JPA Repositories
│   │   ├── AccountRepository.java
│   │   ├── CategoryRepository.java
│   │   ├── NewsArticleRepository.java
│   │   └── TagRepository.java
│   ├── services/          # Service interfaces
│   │   ├── AccountService.java
│   │   ├── AuthService.java
│   │   ├── CategoryService.java
│   │   ├── NewsArticleService.java
│   │   ├── TagService.java
│   │   └── impl/          # Service implementations
│   │       ├── AccountServiceImpl.java
│   │       ├── AuthServiceImpl.java
│   │       ├── CategoryServiceImpl.java
│   │       ├── NewsArticleServiceImpl.java
│   │       └── TagServiceImpl.java
│   ├── controllers/       # REST Controllers
│   │   ├── AccountController.java
│   │   ├── AuthController.java
│   │   ├── CategoryController.java
│   │   ├── NewsArticleController.java
│   │   └── TagController.java
│   ├── dtos/              # Data Transfer Objects
│   │   ├── request/
│   │   │   ├── AccountRequest.java
│   │   │   ├── CategoryRequest.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── NewsArticleRequest.java
│   │   │   └── TagRequest.java
│   │   └── response/
│   │       ├── AccountResponse.java
│   │       ├── ApiResponse.java
│   │       ├── CategoryResponse.java
│   │       ├── LoginResponse.java
│   │       ├── NewsArticleResponse.java
│   │       └── TagResponse.java
│   ├── configs/           # Configuration classes
│   │   ├── DataInitConfig.java
│   │   ├── JpaAuditingConfigs.java
│   │   └── SecurityConfig.java
│   └── exceptions/        # Exception handlers
│       └── GlobalExceptionHandler.java
└── src/main/resources/
    └── application.properties
```

---

## Default Accounts (Created on startup)

| Role  | Email            | Password |
| ----- | ---------------- | -------- |
| Admin | admin@fpt.edu.vn | admin123 |
| Staff | staff@fpt.edu.vn | staff123 |

---

## How to Run

### Backend (Spring Boot)

1. Ensure MS SQL Server is running
2. Create database: `A2TranDinhDuyPhuong_SE18D04`
3. Update `application.properties` with your database credentials
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```
5. Access Swagger UI: http://localhost:8080/swagger-ui.html

### Frontend (ReactJS)

1. Navigate to frontend folder:
   ```bash
   cd A2TranDinhDuyPhuong_SE18D04-FE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Access: http://localhost:5173

---

## Business Rules

1. **Account Deletion**: Cannot delete an account if it has created any news articles
2. **Category Deletion**: Cannot delete a category if it contains any news articles
3. **News Status**: Only ACTIVE news articles are visible to the public (no authentication required)
4. **Role-based Access**:
   - Admin (role=1): Can manage accounts
   - Staff (role=2): Can manage categories, news articles, and their profile

---

## Testing

### Test Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fpt.edu.vn","password":"admin123"}'
```

### Test Get Categories

```bash
curl http://localhost:8080/api/categories
```

### Test Create News Article

```bash
curl -X POST http://localhost:8080/api/news \
  -H "Content-Type: application/json" \
  -H "X-Account-Id: 2" \
  -d '{
    "newsTitle": "Test News",
    "headline": "Test Headline",
    "newsContent": "Content here...",
    "newsSource": "FPT University",
    "categoryId": 1,
    "isActive": true,
    "tagIds": [1, 2]
  }'
```
