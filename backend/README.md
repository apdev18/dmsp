# DMSP Backend API

Backend API untuk DMSP

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev

# Run production
npm start
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Users (Admin only)
- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Surat Paksa
- `GET /api/v1/surat-paksa` - Get all surat paksa
- `POST /api/v1/surat-paksa` - Create surat paksa
- `GET /api/v1/surat-paksa/:id` - Get surat paksa by ID
- `PUT /api/v1/surat-paksa/:id` - Update surat paksa
- `DELETE /api/v1/surat-paksa/:id` - Delete surat paksa
- `GET /api/v1/surat-paksa/mendekati-daluwarsa` - Get surat paksa mendekati daluwarsa

### Statistics
- `GET /api/v1/statistics/dashboard` - Get dashboard statistics
- `GET /api/v1/statistics/trend` - Get trend data
- `GET /api/v1/statistics/status-distribution` - Get status distribution
- `GET /api/v1/statistics/tunggakan-per-tahun` - Get tunggakan per tahun

### KPP
- `GET /api/v1/kpp` - Get all KPP
- `POST /api/v1/kpp` - Create KPP
- `GET /api/v1/kpp/stats` - Get KPP statistics (untuk heat map)
- `GET /api/v1/kpp/:id` - Get KPP by ID
- `PUT /api/v1/kpp/:id` - Update KPP
- `DELETE /api/v1/kpp/:id` - Delete KPP

## User Roles

- `admin` - Full access
- `jurusita` - Can create/update surat paksa
- `viewer` - Read only access

## Created by

apdev18
