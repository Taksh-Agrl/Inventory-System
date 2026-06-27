<div align="center">

# 📦 Inventory Management System

### A Production-Ready Full Stack Inventory Management System

Manage products, suppliers, customers, inventory, and orders with secure authentication, stock tracking, and transactional database operations.

<br>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📸 Project Preview (DEMO VIDEO) : https://youtu.be/JeUnvAb0u98


# 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database](#-database)
- [API Documentation](#-api-documentation)
- [Testing Guide](#-testing-guide)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [What I Learned](#-what-i-learned)
- [License](#-license)

---

# 📖 Overview

The **Inventory Management System** is a modern full-stack web application developed to simplify inventory and business management operations.

The system enables businesses to efficiently manage:

- 📦 Products
- 🛒 Orders
- 👥 Customers
- 🚚 Suppliers
- 📊 Inventory
- 📜 Stock History

It provides secure authentication using **JWT HttpOnly Cookies**, reliable database operations using **Prisma Transactions**, and complete audit logs for every stock movement.

The application is designed with scalability, maintainability, and security in mind, making it suitable for learning, portfolio projects, and real-world business applications.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- HttpOnly Cookie Authentication
- Password Hashing
- Protected Routes
- Secure Login & Logout
- Role Based Authorization

---

## 📦 Product Management

- Add Products
- Update Products
- Delete Products
- Search Products
- Product Categories
- SKU Management
- Product Pricing
- Current Stock Tracking

---

## 📈 Inventory Management

- Stock In
- Stock Out
- Automatic Inventory Updates
- Low Stock Detection
- Stock Validation
- Inventory Monitoring

---

## 🛒 Order Management

- Create Orders
- Update Orders
- Cancel Orders
- Automatic Stock Deduction
- Automatic Stock Restoration
- Order History

---

## 👥 Customer Management

- Add Customers
- Update Customer Details
- Delete Customers
- Customer Purchase History

---

## 🚚 Supplier Management

- Add Suppliers
- Edit Suppliers
- Delete Suppliers
- Supplier Contact Information

---

## 📜 Stock History

Every stock movement is automatically recorded.

Each log contains:

- Product Name
- Quantity Changed
- Previous Stock
- Current Stock
- Transaction Type
- User
- Timestamp

---

## 📊 Dashboard

Dashboard includes:

- Total Products
- Total Orders
- Total Customers
- Total Suppliers
- Inventory Statistics
- Recent Orders
- Recent Stock Activity
- Low Stock Products

---

# 🚀 Key Highlights

✅ Production Ready Architecture

✅ RESTful API Design

✅ Responsive User Interface

✅ Prisma ORM Integration

✅ MySQL Database

✅ JWT Authentication

✅ HttpOnly Cookies

✅ Transaction Based Order Processing

✅ Complete Inventory Audit Logs

✅ Clean Folder Structure

✅ Secure Backend Architecture

---

# 🏗️ System Architecture

```text
                        User
                         │
                         ▼
                React Frontend (Vite)
                         │
                 Axios HTTP Requests
                         │
                         ▼
                Express REST API
                         │
               Authentication Layer
          (JWT + HttpOnly Cookies)
                         │
                         ▼
                Business Logic
                         │
                         ▼
                   Prisma ORM
                         │
             Transaction Management
                         │
                         ▼
                 MySQL Database
```

---

# 🛠 Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend Library |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Axios | API Requests |
| React Router | Routing |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| Prisma ORM | Database ORM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Cookie Parser | Cookie Handling |
| CORS | Cross-Origin Requests |
| Dotenv | Environment Variables |

---

## Database

| Technology | Purpose |
|------------|---------|
| MySQL | Relational Database |
| Prisma | Database ORM |

---

# 📂 Project Structure

```text
Inventory-System/
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   │
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── API_DOCUMENTATION.md
│   ├── postman_collection.json
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Inventory-System.git

cd Inventory-System
```

---

## Backend Setup

```bash
cd backend

npm install
```

Copy environment file
```

Continue installing dependencies:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Seed the database:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

Backend Server will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

Frontend Server:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

DATABASE_URL="mysql://username:password@localhost:3306/inventory_db"

JWT_SECRET=your_super_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 👨‍💼 Default Admin Credentials

After running the seed command, an admin account will automatically be created.

| Email | Password |
|--------|----------|
| admin@inventory.local | Admin1234 |

---

# 🗄️ Database

The project uses **MySQL** together with **Prisma ORM**.

Database schema is located at:

```text
backend/prisma/schema.prisma
```

SQL reference file:

```text
backend/database/schema.sql
```

---

## 🔄 Database Transactions

Order creation and cancellation are handled using **Prisma Transactions**.

This guarantees consistency between:

- Products
- Orders
- Order Items
- Stock History

If any operation fails, the entire transaction is rolled back automatically.

---

# 📡 API Documentation

API documentation is available inside:

```text
backend/API_DOCUMENTATION.md
```

A ready-to-use Postman Collection is also included.

```text
backend/postman_collection.json
```

---

## Example API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/login |
| POST | /api/auth/logout |
| GET | /api/auth/me |

---

### Products

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

### Orders

| Method | Endpoint |
|---------|----------|
| GET | /api/orders |
| POST | /api/orders |
| PUT | /api/orders/:id |
| DELETE | /api/orders/:id |

---

### Customers

| Method | Endpoint |
|---------|----------|
| GET | /api/customers |
| POST | /api/customers |
| PUT | /api/customers/:id |
| DELETE | /api/customers/:id |

---

### Suppliers

| Method | Endpoint |
|---------|----------|
| GET | /api/suppliers |
| POST | /api/suppliers |
| PUT | /api/suppliers/:id |
| DELETE | /api/suppliers/:id |

---

# 🧪 Testing Guide

Follow these steps to verify the application.

### Step 1

Start the MySQL server.

---

### Step 2

Configure the backend `.env` file.

---

### Step 3

Run Prisma Migration.

```bash
npx prisma migrate dev
```

---

### Step 4

Seed the database.

```bash
npm run seed
```

---

### Step 5

Start the backend.

```bash
npm run dev
```

---

### Step 6

Start the frontend.

```bash
npm run dev
```

---

### Step 7

Login using the default admin account.

---

### Step 8

Create a Product.

---

### Step 9

Perform Stock In / Stock Out.

---

### Step 10

Create an Order.

---

### Step 11

Cancel the Order.

---

### Step 12

Verify that stock history records are automatically created.

---

# 🚀 Deployment Guide

## Backend Deployment

Configure the following environment variables:

- DATABASE_URL
- JWT_SECRET
- CLIENT_URL

Install production dependencies.

```bash
npm ci
```

Generate Prisma Client.

```bash
npx prisma generate
```

Run production migrations.

```bash
npx prisma migrate deploy
```

Start the production server.

```bash
npm start
```

---

## Frontend Deployment

Create a production build.

```bash
npm run build
```

Deploy the generated `dist` folder to:

- Vercel
- Netlify
- Firebase Hosting
- AWS S3
- Nginx

---

# 📸 Application Screenshots

> Replace these placeholders with actual screenshots after deployment.

## 🔐 Login Page

```text
screenshots/login.png
```

---

## 📊 Dashboard

```text
screenshots/dashboard.png
```

---

## 📦 Products

```text
screenshots/products.png
```

---

## 🛒 Orders

```text
screenshots/orders.png
```

---

## 👥 Customers

```text
screenshots/customers.png
```

---

## 🚚 Suppliers

```text
screenshots/suppliers.png
```

---

## 📜 Stock History

```text
screenshots/history.png
```

---

# 🚀 Future Improvements

- Barcode Scanner Integration
- QR Code Support
- Product Image Upload
- Multi-Warehouse Inventory
- Purchase Orders
- Sales Reports
- Analytics Dashboard
- Invoice Generation
- PDF Export
- Excel Export
- Email Notifications
- Docker Support
- CI/CD Pipeline
- Unit Testing
- Role Management
- Dark Mode

---

# 🧠 What I Learned

Building this project strengthened my understanding of:

- Full Stack Web Development
- React + Vite
- Express.js Backend Development
- REST API Design
- Prisma ORM
- MySQL Database Design
- Database Transactions
- JWT Authentication
- Cookie-Based Authentication
- Secure Password Hashing
- CRUD Operations
- Inventory Management Systems
- Backend Validation
- Production Deployment
- Clean Project Architecture

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---



<div align="center">

### ⭐ If you found this project helpful, don't forget to star the repository!

Made with ❤️ using **React, Node.js, Express, Prisma & MySQL**

</div>

```bash
cp .env.example .env
```
