# 💰 FinTrack - A Money Manager Application

A production-ready **Full Stack Personal Finance Management Application** built using **Spring Boot + React.js + MySQL**, enabling users to securely manage their income, expenses, categories, and financial insights through an intuitive dashboard.

This project demonstrates strong understanding of:

- Full Stack Application Development
- REST API Design & Integration
- JWT-Based Authentication & Authorization
- Personal Finance & Budget Tracking
- Dashboard Analytics & Data Visualization
- Database Design using JPA/Hibernate
- Secure Backend Architecture
- React State Management
- Responsive UI Development
- Email Notification System
- Production Deployment (Render + Netlify)

---

# 🏗️ System Architecture

```
React.js Frontend
          ↓
       REST APIs
          ↓
Spring Boot Backend
          ↓
     MySQL Database
```

---

# 🚀 Tech Stack

## 🔵 Backend

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA (Hibernate)
- MySQL
- Maven

## 🟢 Frontend

- React.js
- Vite
- Axios
- React Router DOM
- Context API
- Tailwind CSS
- React Hot Toast
- Lucide React Icons
- Recharts
- Emoji Picker

## 📧 Third-Party Services

- Brevo Email API
- JWT Authentication

## 🧰 Tools

- IntelliJ IDEA
- VS Code
- Postman
- MySQL Workbench
- Git & GitHub

---

# 📂 Project Structure

## 🔵 Backend Structure (Spring Boot)

```text
Backend/
│
├── src/
│   ├── main/
│   │
│   ├── java/
│   │   └── in/
│   │       └── sambhav/
│   │           └── moneymanager/
│   │
│   │               ├── Config/
│   │               │   └── SecurityConfig.java
│   │               │
│   │               ├── Controller/
│   │               │   ├── CategoryController.java
│   │               │   ├── DashboardController.java
│   │               │   ├── ExpenseController.java
│   │               │   ├── FilterController.java
│   │               │   ├── HomeController.java
│   │               │   ├── IncomeController.java
│   │               │   └── ProfileController.java
│   │               │
│   │               ├── DTO/
│   │               │   ├── AuthDTO.java
│   │               │   ├── BrevoEmailRequestDTO.java
│   │               │   ├── CategoryDTO.java
│   │               │   ├── ExpenseDTO.java
│   │               │   ├── FilterDTO.java
│   │               │   ├── IncomeDTO.java
│   │               │   ├── ProfileDTO.java
│   │               │   └── RecentTransactionDTO.java
│   │               │
│   │               ├── Entity/
│   │               │   ├── CategoryEntity.java
│   │               │   ├── ExpenseEntity.java
│   │               │   ├── IncomeEntity.java
│   │               │   └── ProfileEntity.java
│   │               │
│   │               ├── Repository/
│   │               │   ├── CategoryRepository.java
│   │               │   ├── ExpenseRepository.java
│   │               │   ├── IncomeRepository.java
│   │               │   └── ProfileRepository.java
│   │               │
│   │               ├── Security/
│   │               │   └── JwtRequestFilter.java
│   │               │
│   │               ├── Service/
│   │               │   ├── AppUserDetailsService.java
│   │               │   ├── CategoryService.java
│   │               │   ├── DashboardService.java
│   │               │   ├── EmailService.java
│   │               │   ├── ExpenseService.java
│   │               │   ├── IncomeService.java
│   │               │   ├── NotificationService.java
│   │               │   └── ProfileService.java
│   │               │
│   │               ├── Util/
│   │               │   └── JwtUtil.java
│   │               │
│   │               └── MoneyManagerApplication.java
│   │
│   └── resources/
│       ├── application.properties
│       └── static/
│
├── .mvn/
│   └── wrapper/
│
├── .gitattributes
├── .gitignore
├── Dockerfile
├── HELP.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

### Backend Design Pattern

- Layered Architecture (Controller → Service → Repository)
- JWT Stateless Authentication
- Secure REST APIs
- DTO Pattern
- Dependency Injection
- Scheduled Email Notifications

---

## 🟢 Frontend Structure (React.js)

```text
Frontend/
│
├── public/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── assets.js
│   │
│   ├── components/
│   │   ├── AddCategoryForm.jsx
│   │   ├── AddExpenseForm.jsx
│   │   ├── AddIncomeForm.jsx
│   │   ├── Category.jsx
│   │   ├── CustomBarChart.jsx
│   │   ├── CustomLineChart.jsx
│   │   ├── CustomPieChart.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DeleteAlertContent.jsx
│   │   ├── EmojiPickerPopup.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── Filter.jsx
│   │   ├── IncomeList.jsx
│   │   ├── Input.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── SideMenu.jsx
│   │   ├── TransactionInfoCard.jsx
│   │   └── UserInfoCard.jsx
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── hooks/
│   │   └── useUser.jsx
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Income.jsx
│   │   ├── Expense.jsx
│   │   ├── Category.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── util/
│   │   ├── ApiEndpoint.js
│   │   ├── AxiosConfig.jsx
│   │   ├── DashboardData.js
│   │   ├── Helper.js
│   │   ├── UploadImage.js
│   │   └── Validation.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Frontend Architecture

- Component-Based Architecture
- Protected Routes
- Context API for Global State Management
- Custom Hooks
- Centralized Axios Configuration
- Reusable Components
- Responsive Tailwind CSS Design
- Interactive Charts using Recharts
- Toast Notifications
- Modular Folder Structure

---

# 🔐 Key Features

## ✔ Authentication & Security

- User Registration
- Email Verification
- Secure Login
- JWT-Based Authentication
- Protected Routes
- Password Encryption
- Role-Based Authorization

---

## ✔ Dashboard

- Total Income Overview
- Total Expense Overview
- Available Balance
- Financial Summary
- Recent Transactions
- Interactive Charts
- Expense Distribution
- Income Analytics

---

## ✔ Income Management

- Add Income
- Edit Income
- Delete Income
- Income Categories
- Income History

---

## ✔ Expense Management

- Add Expense
- Edit Expense
- Delete Expense
- Expense Categories
- Expense History

---

## ✔ Category Management

- Create Custom Categories
- Emoji Picker Support
- Income & Expense Categories
- Edit/Delete Categories

---

## ✔ Advanced Filtering

- Search by Keyword
- Filter by Date Range
- Filter by Transaction Type
- Sort Transactions
- Combined Multi-Filter Search

---

## ✔ Email Notifications

- Account Verification Emails
- Daily Expense Reminder Emails
- Secure Email Delivery using Brevo

---

## ✔ User Experience

- Responsive UI
- Modern Dashboard Design
- Loading Indicators
- Toast Notifications
- Beautiful Charts
- Mobile Friendly Interface

---

# 📊 Dashboard Analytics

- Income vs Expense Comparison
- Expense Distribution Pie Chart
- Income Trend Line Chart
- Monthly Financial Overview
- Recent Transactions Summary

---

# 🗄️ Database Design

## Core Entities

- Profile
- Income
- Expense
- Category

### Relationships

```
Profile
 ├── 1 ------ * Income
 ├── 1 ------ * Expense
 └── 1 ------ * Category
```

---

# ⚙️ Setup Instructions

## 🖥️ Backend Setup

### 1️⃣ Create Database

```sql
CREATE DATABASE money_manager;
```

### 2️⃣ Configure application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/money_manager
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 3️⃣ Run Backend

```bash
mvn spring-boot:run
```

Backend URL

```
http://localhost:8080
```

---

## 🌐 Frontend Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🔄 API Communication Example

```javascript
axios.get("/api/v1.0/dashboard", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

# 🧪 Testing & Debugging

- Postman for API Testing
- MySQL Workbench
- Chrome DevTools
- Browser Network Inspector
- Render Deployment Logs

---

# 📈 Future Enhancements

- Monthly Budget Planning
- AI-based Expense Prediction
- PDF & Excel Report Export
- Recurring Transactions
- Goal-Based Savings Tracker
- Multi-Currency Support
- Mobile Application
- Cloud Storage Integration

---

# 🎯 Why This Project Stands Out

- Real-world Personal Finance Management System
- Secure JWT Authentication & Authorization
- Interactive Dashboard Analytics
- Email Verification & Notification System
- Advanced Transaction Filtering
- Responsive Modern UI
- Clean Layered Architecture
- Production Deployment Ready
- Resume-ready Advanced Full Stack Project

---

# 👨‍💻 Developer

**Sambhav Gupta**

**B.Tech – Information Science Engineering**

**Full Stack Developer | Java | Spring Boot | React.js**

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
