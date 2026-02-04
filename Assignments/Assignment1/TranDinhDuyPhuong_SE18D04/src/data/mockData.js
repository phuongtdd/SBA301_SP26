// Mock data based on database schema

// Categories
export const initialCategories = [
  {
    CategoryID: 1,
    CategoryName: "Technology",
    CategoryDescription: "Technology and innovation news",
    ParentCategoryID: null,
    IsActive: true
  },
  {
    CategoryID: 2,
    CategoryName: "Sports",
    CategoryDescription: "Sports and athletics news",
    ParentCategoryID: null,
    IsActive: true
  },
  {
    CategoryID: 3,
    CategoryName: "Education",
    CategoryDescription: "Education and academic news",
    ParentCategoryID: null,
    IsActive: true
  },
  {
    CategoryID: 4,
    CategoryName: "Campus Life",
    CategoryDescription: "University campus activities",
    ParentCategoryID: 3,
    IsActive: true
  },
  {
    CategoryID: 5,
    CategoryName: "Research",
    CategoryDescription: "Research and development news",
    ParentCategoryID: 3,
    IsActive: false
  }
];

// System Accounts
export const initialAccounts = [
  {
    AccountID: 1,
    AccountName: "Admin",
    AccountEmail: "admin@funews.edu.vn",
    AccountRole: 1, // Admin
    AccountPassword: "Admin"
  },
  {
    AccountID: 2,
    AccountName: "John Staff",
    AccountEmail: "john.staff@funews.edu.vn",
    AccountRole: 2, // Staff
    AccountPassword: "staff123"
  },
  {
    AccountID: 3,
    AccountName: "Jane Editor",
    AccountEmail: "jane.editor@funews.edu.vn",
    AccountRole: 2, // Staff
    AccountPassword: "editor123"
  }
];

// Tags
export const initialTags = [
  { TagID: 1, TagName: "Featured", Note: "Featured articles" },
  { TagID: 2, TagName: "Breaking", Note: "Breaking news" },
  { TagID: 3, TagName: "Trending", Note: "Trending topics" },
  { TagID: 4, TagName: "Event", Note: "Event announcements" },
  { TagID: 5, TagName: "Achievement", Note: "Achievement highlights" }
];

// News Articles
export const initialNewsArticles = [
  {
    NewsArticleID: 1,
    NewsTitle: "FU University Launches New AI Research Center",
    Headline: "A groundbreaking initiative to advance artificial intelligence research",
    CreatedDate: "2026-01-15",
    NewsContent: "FU University has announced the launch of a new AI Research Center dedicated to advancing artificial intelligence research and development. The center will focus on machine learning, natural language processing, and computer vision technologies.",
    NewsSource: "FU News Office",
    CategoryID: 1,
    NewsStatus: 1, // Active
    CreatedByID: 1,
    UpdatedByID: 1,
    ModifiedDate: "2026-01-15",
    Tags: [1, 2]
  },
  {
    NewsArticleID: 2,
    NewsTitle: "Annual Sports Festival 2026 Announced",
    Headline: "Students gear up for the biggest sports event of the year",
    CreatedDate: "2026-01-20",
    NewsContent: "The university has announced the dates for the Annual Sports Festival 2026. The event will feature various competitions including basketball, football, volleyball, and swimming. Registration is now open for all students.",
    NewsSource: "Sports Department",
    CategoryID: 2,
    NewsStatus: 1,
    CreatedByID: 2,
    UpdatedByID: 2,
    ModifiedDate: "2026-01-20",
    Tags: [4]
  },
  {
    NewsArticleID: 3,
    NewsTitle: "New Scholarship Program for Outstanding Students",
    Headline: "Merit-based scholarships now available for the upcoming semester",
    CreatedDate: "2026-01-25",
    NewsContent: "The university is pleased to announce a new scholarship program for outstanding students. The program aims to support talented students who demonstrate exceptional academic performance and leadership qualities.",
    NewsSource: "Academic Affairs",
    CategoryID: 3,
    NewsStatus: 1,
    CreatedByID: 1,
    UpdatedByID: 1,
    ModifiedDate: "2026-01-25",
    Tags: [1, 5]
  },
  {
    NewsArticleID: 4,
    NewsTitle: "Campus Library Renovation Complete",
    Headline: "Modern facilities now available for students",
    CreatedDate: "2026-01-28",
    NewsContent: "The campus library renovation project has been completed. The renovated library now features modern study spaces, advanced computer labs, and a new digital resource center.",
    NewsSource: "Facilities Management",
    CategoryID: 4,
    NewsStatus: 0, // Inactive
    CreatedByID: 3,
    UpdatedByID: 3,
    ModifiedDate: "2026-01-28",
    Tags: [3]
  }
];

// Helper functions
export const getRoleName = (role) => {
  return role === 1 ? "Admin" : "Staff";
};

export const getStatusName = (status) => {
  return status === 1 || status === true ? "Active" : "Inactive";
};

export const getCategoryName = (categoryId, categories) => {
  const category = categories.find(c => (c.categoryId === categoryId || c.CategoryID === categoryId));
  return category ? (category.categoryName || category.CategoryName) : "Unknown";
};

export const getAccountName = (accountId, accounts) => {
  const account = accounts.find(a => (a.accountId === accountId || a.AccountID === accountId));
  return account ? (account.accountName || account.AccountName) : "Unknown";
};
