📦 Inventory Management System

Production-ready full-stack inventory management system built with React, Node.js, Express, MySQL, Prisma ORM, and JWT Authentication. It provides complete inventory tracking, order management, stock history, and secure role-based authentication for modern businesses.

React • Node.js • Express • MySQL • Prisma • JWT • TailwindCSS

📖 Overview

The Inventory Management System is designed to simplify inventory operations for businesses by providing an intuitive dashboard to manage products, suppliers, customers, stock movements, and orders.

The application ensures data consistency using Prisma transactions, secure authentication using JWT HttpOnly Cookies, and complete stock audit logs for every inventory operation.

It supports:

Product Management
Inventory Tracking
Stock In / Stock Out
Customer Management
Supplier Management
Order Processing
Stock History
Dashboard Analytics
Secure Authentication
✨ Features
🔐 Authentication & Authorization
JWT Authentication
HttpOnly Cookie Authentication
Protected Routes
Role-Based Access Control
Secure Password Hashing
📦 Inventory Management
Add Products
Edit Products
Delete Products
Product Categories
SKU Management
Low Stock Alerts
Current Stock Tracking
📈 Stock Management
Stock In
Stock Out
Automatic Stock Updates
Inventory Audit Logs
Transaction History
🛒 Order Management
Create Orders
Update Orders
Cancel Orders
Automatic Stock Deduction
Prisma Database Transactions
👥 Customer Management
Add Customers
Update Customer Information
Customer Purchase History
🚚 Supplier Management
Supplier Registration
Supplier Details
Purchase Tracking
📊 Dashboard
Total Products
Total Orders
Total Customers
Total Suppliers
Low Stock Products
Recent Transactions
📜 Stock History

Every inventory movement is logged.

Includes:

Product Name
Quantity Changed
Previous Stock
Updated Stock
Action Type
Timestamp
User Information
🏗️ System Architecture
             User
              │
              ▼
        React Frontend
              │
              ▼
       Express REST API
              │
              ▼
JWT Authentication Middleware
              │
              ▼
     Business Logic Layer
              │
              ▼
 Prisma ORM Transactions
              │
              ▼
        MySQL Database
🛠️ Tech Stack
Frontend
React 19
Vite
Tailwind CSS
React Router
Axios
Backend
Node.js
Express.js
Prisma ORM
MySQL
JWT Authentication
Bcrypt
Cookie Parser
CORS
Dotenv
Database
MySQL
Prisma ORM
Transaction Support
Security
JWT HttpOnly Cookies
Password Hashing
Protected APIs
Input Validation
Secure Authentication Flow
📂 Project Structure
Inventory-System/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── API_DOCUMENTATION.md
│   └── postman_collection.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
⚙️ Installation
Clone Repository
git clone https://github.com/YOUR_USERNAME/Inventory-System.git

cd Inventory-System
🔧 Backend Setup

Install dependencies

cd backend

npm install

Copy environment file

cp .env.example .env

Generate Prisma Client

npx prisma generate

Run Migrations

npx prisma migrate dev --name init

Seed Database

npm run seed

Start Backend

npm run dev

Backend Server

http://localhost:5000
👨‍💼 Default Admin Login
Email:
admin@inventory.local

Password:
Admin1234
💻 Frontend Setup

Open another terminal

cd frontend

npm install

cp .env.example .env

npm run dev

Frontend

http://localhost:5173
🔑 Environment Variables
Backend
DATABASE_URL=

JWT_SECRET=

PORT=5000

CLIENT_URL=http://localhost:5173
Frontend
VITE_API_URL=http://localhost:5000/api
🗄️ Database

The project uses Prisma ORM with MySQL.

Schema Location

backend/prisma/schema.prisma

SQL Reference

backend/database/schema.sql

The application uses Prisma Transactions to ensure consistency while:

Creating Orders
Cancelling Orders
Updating Product Stock
Recording Stock History

This guarantees that inventory data remains accurate even if an operation fails midway.

📡 API Documentation

Complete API documentation is available inside:

backend/API_DOCUMENTATION.md

Postman Collection

backend/postman_collection.json
🧪 Testing Guide
Start MySQL Server
Configure .env
Run Prisma Migration
Seed Database
Start Backend
Visit
GET /health
Login using Admin Account
Create Products
Perform Stock In / Stock Out
Create Orders
Cancel Orders
Verify Stock History
🚀 Deployment
Backend
npm ci

npx prisma generate

npx prisma migrate deploy

Configure

DATABASE_URL
JWT_SECRET
CLIENT_URL

Deploy Express Server

Frontend
npm run build

Deploy the generated dist folder to:

Vercel
Netlify
Firebase Hosting
Nginx
🚀 Future Improvements
Barcode Scanner Integration
Email Notifications
Product Image Uploads
Sales Reports
Purchase Orders
Invoice Generation
Multi-Warehouse Support
Role-Based Dashboard
Export to Excel/PDF
Docker Support
CI/CD Pipeline
🧠 What I Learned

This project helped me strengthen my skills in:

Full-Stack Web Development
React & Vite
REST API Design
Express.js Architecture
Prisma ORM
MySQL Database Design
Database Transactions
JWT Authentication
Secure Cookie-Based Authentication
Inventory & Order Management
Backend Validation
CRUD Operations
API Documentation
Production Deployment