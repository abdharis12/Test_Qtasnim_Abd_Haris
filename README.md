# Employee Management System - Laravel Breeze + Inertia.js + React + Sanctum

Full-stack web application untuk manajemen data karyawan menggunakan Laravel Starter Kit (Breeze) dengan Inertia.js, React, dan Laravel Sanctum authentication.

## 🚀 Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **Laravel Breeze** - Starter kit dengan authentication
- **Laravel Sanctum** - API authentication
- **SQLite** - Database (zero-configuration)
- **Eloquent ORM** - Database abstraction

### Frontend
- **Inertia.js** - Modern monolith architecture
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool

## ✨ Fitur

### Fitur Utama
- ✅ **Authentication** - Login/Register dengan Laravel Breeze
- ✅ **CRUD Operations** - Create, Read, Update, Delete karyawan
- ✅ **RESTful API** - API endpoints dengan Sanctum authentication
- ✅ **SPA Experience** - Single Page Application dengan Inertia.js
- ✅ **Real-time Validation** - Validasi input di frontend dan backend

### Fitur Tambahan (Challenges)
- ✅ **Pagination** - Laravel pagination dengan Inertia.js
- ✅ **Search** - Pencarian karyawan berdasarkan nama
- ✅ **Error Handling** - Error responses yang jelas dan informatif
- ✅ **Relasi Tabel** - One-to-Many relationship (Employee-Department)
- ✅ **Department Integration** - Dropdown departemen di form
- ✅ **Sanctum Authentication** - Token-based API authentication

## 📋 Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- SQLite 3

## 🔧 Installation

### 1. Clone atau Create Laravel Project dengan Breeze

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 3. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Configure .env
# Set DB_CONNECTION=sqlite
```

### 4. Run Migrations and Seeders

```bash
# Run migrations
php artisan migrate:fresh --seed

### 5. Build Frontend Assets

```bash
# Development mode with hot reload
npm run dev
```

### 6. Get Token for Test API 

```bash
# Jalankan Tinker untuk ambil token agar bisa test api di postman
php artisan tinker

# Cari user berdasarkan ID atau Email
$user = App\Models\User::where('email', 'abdharis.datuamas@gmail.com')->first();

# Generate token
$token = $user->createToken('TestToken')->plainTextToken;

# Copy token dan paste ke bearer token di postman
```

### 7. Start Development Server

```bash
# In terminal 1 - Laravel server
php artisan serve

# In terminal 2 - Vite dev server (if using npm run dev)
npm run dev
```

Access application: `http://localhost:8000`

## 🔐 Authentication

### Web Interface (Inertia.js)
1. Register: `http://localhost:8000/register`
2. Login: `http://localhost:8000/login`
3. Access Employees: `http://localhost:8000/employees`

**Default Test User:**
- Email: `abdharis.datuamas@gmail.com`
- Password: `password`

### API (Sanctum)

#### 1. Login to get token
```bash
# First, login via web interface or register

# Get token from authenticated user
POST /api/user
Headers: Cookie with session
```

#### 2. Use token in API requests
```bash
# In Postman or any HTTP client
GET /api/employees
Headers: 
  Accept: application/json
  Cookie: laravel_session=...
```

**Note:** Sanctum uses session-based authentication for SPA and token-based for external APIs.

## 📡 API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Authentication Required
All API endpoints require Sanctum authentication.

### Endpoints

#### Get User Info
```http
GET /api/user
```

#### Get All Employees
```http
GET /api/employees
```

#### Get Employee by ID
```http
GET /api/employees/{id}
```

#### Create Employee
```http
POST /api/employees
Content-Type: application/json

{
  "name": "Jane Smith",
  "position": "HR Manager",
  "salary": 65000.00,
  "department_id": 2
}
```

#### Update Employee
```http
PUT /api/employees/{id}
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "position": "Senior HR Manager",
  "salary": 75000.00,
  "department_id": 2
}
```

#### Delete Employee
```http
DELETE /api/employees/{id}
```

#### Get All Departments
```http
GET /api/departements
```

## 📁 Project Structure

```
employee-management/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── EmployeeController.php          # Inertia controller
│   │   │   ├── Api/
│   │   │   │   ├── EmployeeController.php      # API controller
│   │   │   │   └── DepartmentController.php
│   │   │   └── Auth/                            # Breeze auth controllers
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── User.php                             # Breeze user model
│       ├── Employee.php
│       └── Department.php
│
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   └── 2024_01_01_000000_create_employees_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── resources/
│   └── js/
│       ├── Components/                          # Breeze components
│       ├── Layouts/
│       │   └── AuthenticatedLayout.jsx         # Main layout
│       └── Pages/
│           ├── Auth/                            # Breeze auth pages
│           ├── Dashboard.jsx
│           └── Employees/
│               ├── Index.jsx                    # List view
│               ├── Create.jsx                   # Create form
│               ├── Edit.jsx                     # Edit form
│               └── Form.jsx                     # Shared form component
│
└── routes/
    ├── web.php                                  # Inertia routes
    ├── api.php                                  # API routes
    └── auth.php                                 # Breeze auth routes
```

## 🎯 Key Features Explanation

### 1. Inertia.js Integration
Inertia.js menghubungkan Laravel backend dengan React frontend tanpa perlu membuat API terpisah untuk UI utama.

**Benefits:**
- No API boilerplate untuk UI utama
- Server-side routing
- Automatic CSRF protection
- Shared data between requests
- Progressive enhancement

### 2. Laravel Sanctum
Sanctum menyediakan authentication untuk:
- SPA (Session-based via Inertia)
- Mobile apps (Token-based)
- External API consumers

### 3. React with Inertia
```jsx
// Using Inertia's router
import { router } from '@inertiajs/react';

## 📚 Documentation

- Laravel: https://laravel.com/docs
- Inertia.js: https://inertiajs.com/
- React: https://react.dev/
- Sanctum: https://laravel.com/docs/sanctum
- Breeze: https://laravel.com/docs/starter-kits

## 📝 License

This project is created for coding test purposes.

---

**Built with Laravel Breeze + Inertia.js + React + Sanctum** 🚀
