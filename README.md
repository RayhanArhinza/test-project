<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# 🚀 CRM Lead Management System

Sistem manajemen lead berbasis web dengan fitur lengkap untuk mengelola prospek dan pelanggan potensial. Dibangun dengan Laravel 11 dan Vue.js 3, menggunakan arsitektur modern dan best practices.

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11
- **Database**: MySQL 8.0
- **Authentication**: Laravel Session Guard
- **Security**: CSRF Protection, Bcrypt Password Hashing

### Frontend
- **Framework**: Vue.js 3 (Composition API)
- **Router**: Vue Router 4
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite

### Architecture Pattern
- **Backend**: Repository Pattern, Service Layer
- **Frontend**: Composition API, Composables Pattern
- **File Structure**: Feature-based Organization

## 🔒 Keamanan

### Fitur Keamanan yang Diimplementasikan

#### 1. Authentication & Authorization
```php
// Session-based Authentication dengan Guard Khusus
Auth::guard('admin')->login($admin);
$request->session()->regenerate();  // Prevent session fixation
```
- ✅ Custom admin guard
- ✅ Session regeneration setelah login
- ✅ Session invalidation saat logout
- ✅ Password hashing dengan Bcrypt (cost factor 12)

#### 2. CSRF Protection
```php
// Kernel.php - API Middleware
'api' => [
    \Illuminate\Session\Middleware\StartSession::class,
    \App\Http\Middleware\VerifyCsrfToken::class,  // CSRF Protection
]
```
- ✅ CSRF token validation otomatis
- ✅ Token regeneration setelah logout
- ✅ Cookie-based token management

#### 3. Activity Logging
```php
ActivityLog::create([
    'admin_id' => $admin->id,
    'action' => 'login',
    'description' => "{$admin->name} login ke sistem",
    'ip_address' => $request->ip(),
    'user_agent' => $request->userAgent()
]);
```
- ✅ Tracking semua aktivitas admin (login, logout, CRUD)
- ✅ IP address logging
- ✅ User agent tracking
- ✅ Timestamp otomatis

#### 4. Input Validation & SQL Injection Prevention
```php
$request->validate([
    'email' => 'required|email',
    'password' => 'required'
]);
```
- ✅ Request validation rules
- ✅ Eloquent ORM (prepared statements)
- ✅ Type validation
- ✅ Format validation

#### 5. Cookie Security
```env
SESSION_SECURE_COOKIE=true     # HTTPS only (production)
SESSION_HTTP_ONLY=true         # Prevent JavaScript access
SESSION_SAME_SITE=lax          # CSRF protection
```
- ✅ Encrypted cookies
- ✅ HttpOnly flag
- ✅ Secure flag (production)
- ✅ SameSite policy

#### 6. Rate Limiting
```php
'throttle:api'  // 60 requests/minute
```
- ✅ API throttling
- ✅ Brute force protection
- ✅ DDoS mitigation

#### 7. Frontend Security
```javascript
// Vue.js auto-escaping
<p>{{ lead.name }}</p>  // XSS Prevention

// Secure API Communication
withCredentials: true    // Session cookies
```
- ✅ XSS prevention (Vue auto-escape)
- ✅ No innerHTML usage
- ✅ Sanitized inputs
- ✅ HTTPS enforcement (production)

#### 8. Error Handling
```php
// Generic error messages
return response()->json([
    'message' => 'Email atau password salah'  // Tidak specify field
], 401);
```
- ✅ Generic user-facing errors
- ✅ Detailed logs untuk debugging
- ✅ No stack traces di production
- ✅ Proper HTTP status codes

#### 9. Data Protection
```php
// Admin Model
protected $hidden = ['password', 'remember_token'];

// API Response - Minimal exposure
return response()->json([
    'admin' => [
        'id' => $admin->id,
        'name' => $admin->name,
        'email' => $admin->email,
    ]
]);
```
- ✅ Password never returned
- ✅ Minimal data exposure
- ✅ Filtered responses


## 📦 Instalasi

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18.x
- MySQL >= 8.0

### Backend Setup

```bash
# Clone repository
git clone https://github.com/your-username/crm-lead-system.git
cd crm-lead-system

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=test_wafa
DB_USERNAME=root
DB_PASSWORD=03122001

SESSION_DRIVER=cookie
SESSION_LIFETIME=120
SESSION_SAME_SITE=lax

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed admin account
php artisan db:seed --class=AdminSeeder

# Start server
php artisan serve
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build
```

### Default Admin Credentials
```
Email: admin@example.com
Password: password123
```

⚠️ **PENTING**: Ubah password default setelah login pertama kali!

## 📁 Struktur Project

### Backend Structure
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/
│   │   │   ├── ActivityLogController.php   # Activity logging
│   │   │   ├── AuthController.php          # Authentication
│   │   │   └── Controller.php              # Base controller
│   │   ├── DashboardController.php         # Dashboard stats
│   │   ├── Kernel.php                      # HTTP Kernel
│   │   └── LeadController.php              # Lead CRUD
│   ├── Middleware/
│   │   ├── Kernel.php                      # Middleware config
│   │   └── VerifyCsrfToken.php            # CSRF protection
│   └── ...
├── Models/
│   ├── ActivityLog.php                     # Activity log model
│   ├── Admin.php                           # Admin model
│   ├── Lead.php                            # Lead model
│   └── User.php                            # User model
├── Providers/
│   └── AppServiceProvider.php              # Service provider
└── ...

routes/
└── api.php                                 # API routes
```

### Frontend Structure
```
resources/
├── css/
│   └── app.css                             # Tailwind CSS
├── js/
│   ├── components/                         # Reusable UI components
│   │   ├── ErrorAlert.vue                  # Error message component
│   │   ├── LeadFormModal.vue               # Lead form modal
│   │   ├── LoadingSpinner.vue              # Loading indicator
│   │   ├── SidebarNav.vue                  # Sidebar navigation
│   │   ├── StatCard.vue                    # Statistics card
│   │   └── SuccessMessage.vue              # Success message
│   │
│   ├── composables/                        # Reusable logic (Composition API)
│   │   ├── useActivityLogs.js              # Activity logs logic
│   │   ├── useAuth.js                      # Authentication logic
│   │   ├── useDashboard.js                 # Dashboard data logic
│   │   ├── useDateFormatter.js             # Date formatting utility
│   │   └── useLeads.js                     # Leads CRUD logic
│   │
│   ├── layouts/                            # Layout templates
│   │   ├── AdminLayout.vue                 # Admin panel layout
│   │   └── PublicLayout.vue                # Public pages layout
│   │
│   ├── router/                             # Vue Router
│   │   └── index.js                        # Route definitions & guards
│   │
│   ├── services/                           # External services
│   │   └── api.js                          # Axios configuration
│   │
│   ├── views/                              # Page components
│   │   ├── ActivityLogView.vue             # Activity log page
│   │   ├── DashboardView.vue               # Dashboard page
│   │   ├── LandingView.vue                 # Landing page
│   │   ├── LeadsView.vue                   # Leads management page
│   │   └── LoginView.vue                   # Login page
│   │
│   ├── app.js                              # Vue app entry point
│   ├── App.vue                             # Root component
│   └── bootstrap.js                        # Bootstrap file
└── views/
    └── app.blade.php                       # SPA entry point
```

## 🔌 API Endpoints

### Authentication
```http
POST   /api/admin/login              # Admin login
POST   /api/admin/logout             # Admin logout (auth required)
```

### Dashboard
```http
GET    /api/admin/dashboard/stats    # Get dashboard statistics (auth required)
```

### Leads Management
```http
GET    /api/admin/leads              # Get all leads with pagination & search (auth required)
POST   /api/admin/leads              # Create new lead (public - form capture)
PUT    /api/admin/leads/{id}         # Update lead (auth required)
DELETE /api/admin/leads/{id}         # Delete lead (auth required)
```

### Activity Logs
```http
GET    /api/admin/activity-logs      # Get activity logs (auth required)
```

### Request Examples

#### 1. Login
```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Response**:
```json
{
  "message": "Login berhasil",
  "admin": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

#### 2. Get Dashboard Stats
```bash
curl -X GET http://localhost:8000/api/admin/dashboard/stats \
  -H "Cookie: laravel_session=..."
```

**Response**:
```json
{
  "stats": {
    "total_leads": 150,
    "leads_today": 5,
    "leads_this_week": 23,
    "leads_this_month": 87,
    "growth_percentage": 15.5
  },
  "top_institutions": [...],
  "recent_leads": [...],
  "recent_activities": [...]
}
```

#### 3. Create Lead (Public)
```bash
curl -X POST http://localhost:8000/api/admin/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "whatsapp_number": "081234567890",
    "institution_name": "ABC Company"
  }'
```

**Response**:
```json
{
  "message": "Lead berhasil ditambahkan",
  "lead": {
    "id": 151,
    "name": "John Doe",
    "email": "john@example.com",
    "whatsapp_number": "081234567890",
    "institution_name": "ABC Company",
    "created_at": "2024-02-14T10:30:00.000000Z"
  }
}
```

#### 4. Get Leads with Search
```bash
curl -X GET "http://localhost:8000/api/admin/leads?search=john" \
  -H "Cookie: laravel_session=..."
```

**Response**:
```json
{
  "data": [
    {
      "id": 151,
      "name": "John Doe",
      "email": "john@example.com",
      "whatsapp_number": "081234567890",
      "institution_name": "ABC Company",
      "created_at": "2024-02-14T10:30:00.000000Z"
    }
  ],
  "total": 1,
  "per_page": 15,
  "current_page": 1
}
```

#### 5. Update Lead
```bash
curl -X PUT http://localhost:8000/api/admin/leads/151 \
  -H "Content-Type: application/json" \
  -H "Cookie: laravel_session=..." \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "whatsapp_number": "081234567890",
    "institution_name": "ABC Company Ltd"
  }'
```

#### 6. Delete Lead
```bash
curl -X DELETE http://localhost:8000/api/admin/leads/151 \
  -H "Cookie: laravel_session=..."
```

**Response**:
```json
{
  "message": "Lead berhasil dihapus"
}
```

#### 7. Get Activity Logs
```bash
curl -X GET http://localhost:8000/api/admin/activity-logs \
  -H "Cookie: laravel_session=..."
```

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "admin": {
        "id": 1,
        "name": "Admin"
      },
      "action": "login",
      "description": "Admin login ke sistem",
      "ip_address": "127.0.0.1",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2024-02-14T10:00:00.000000Z"
    },
    {
      "id": 2,
      "admin": {
        "id": 1,
        "name": "Admin"
      },
      "action": "create_lead",
      "description": "Membuat lead baru: John Doe",
      "ip_address": "127.0.0.1",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2024-02-14T10:30:00.000000Z"
    }
  ]
}
```

---

**Made with ❤️ using Laravel 11 & Vue.js 3**
