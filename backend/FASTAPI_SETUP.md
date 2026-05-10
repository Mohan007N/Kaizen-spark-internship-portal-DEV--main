# FastAPI Backend Setup Guide

## 🚀 Quick Start

### 1. Install Python Dependencies

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Set Up PostgreSQL Database

```bash
# Install PostgreSQL (if not installed)
# Windows: Download from https://www.postgresql.org/download/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
psql -U postgres
CREATE DATABASE kaizenspark;
\q
```

### 3. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings
# Update DATABASE_URL, SECRET_KEY, AWS credentials, etc.
```

### 4. Run Database Migrations

```bash
# Initialize Alembic (first time only)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

### 5. Create Initial Admin User

```bash
# Run the seed script
python scripts/seed_data.py
```

### 6. Start the Server

```bash
# Development mode (with auto-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### 7. Access the API

- **API Documentation:** http://localhost:8000/docs
- **Alternative Docs:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI application
│   ├── core/
│   │   ├── config.py          # Configuration
│   │   ├── database.py        # Database setup
│   │   └── security.py        # Auth & security
│   ├── models/
│   │   ├── user.py            # User model
│   │   ├── program.py         # Program model
│   │   ├── task.py            # Task model
│   │   ├── assignment.py      # Assignment model
│   │   ├── submission.py      # Submission model
│   │   ├── review.py          # Review model
│   │   └── certificate.py     # Certificate model
│   ├── schemas/
│   │   ├── user.py            # User Pydantic schemas
│   │   ├── program.py         # Program schemas
│   │   ├── task.py            # Task schemas
│   │   └── ...
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py    # API router
│   │       ├── auth.py        # Authentication endpoints
│   │       ├── users.py       # User endpoints
│   │       ├── programs.py    # Program endpoints
│   │       ├── tasks.py       # Task endpoints
│   │       ├── assignments.py # Assignment endpoints
│   │       ├── submissions.py # Submission endpoints
│   │       ├── reviews.py     # Review endpoints
│   │       ├── certificates.py# Certificate endpoints
│   │       ├── stats.py       # Statistics endpoints
│   │       └── upload.py      # File upload endpoints
│   └── services/
│       ├── email.py           # Email service
│       ├── s3.py              # S3 file upload
│       └── pdf.py             # PDF generation
├── alembic/                    # Database migrations
├── scripts/
│   └── seed_data.py           # Seed initial data
├── tests/                      # Test files
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
└── README.md                  # This file
```

---

## 🔐 Authentication Flow

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@kaizenspark.tech",
  "password": "demo1234"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "admin@kaizenspark.tech",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

### Using the Token
```bash
GET /api/v1/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 API Endpoints

### Authentication
```
POST   /api/v1/auth/login              # Login
POST   /api/v1/auth/logout             # Logout
GET    /api/v1/auth/me                 # Get current user
```

### Users
```
GET    /api/v1/users                   # List users (admin)
POST   /api/v1/users                   # Create user (admin)
GET    /api/v1/users/{id}              # Get user
PATCH  /api/v1/users/{id}              # Update user
DELETE /api/v1/users/{id}              # Delete user (admin)
```

### Programs
```
GET    /api/v1/programs                # List programs
POST   /api/v1/programs                # Create program (admin)
GET    /api/v1/programs/{id}           # Get program
PATCH  /api/v1/programs/{id}           # Update program
DELETE /api/v1/programs/{id}           # Delete program
```

### Tasks
```
GET    /api/v1/tasks                   # List tasks
POST   /api/v1/tasks                   # Create task (admin/mentor)
GET    /api/v1/tasks/{id}              # Get task
PATCH  /api/v1/tasks/{id}              # Update task
DELETE /api/v1/tasks/{id}              # Delete task
```

### Assignments
```
GET    /api/v1/assignments             # List assignments
POST   /api/v1/assignments             # Create assignment
GET    /api/v1/assignments/{id}        # Get assignment
PATCH  /api/v1/assignments/{id}/status # Update status
GET    /api/v1/assignments/intern/{id} # Get by intern
GET    /api/v1/assignments/mentor/{id} # Get by mentor
```

### Submissions
```
GET    /api/v1/submissions             # List submissions
POST   /api/v1/submissions             # Create submission
GET    /api/v1/submissions/{id}        # Get submission
```

### Reviews
```
GET    /api/v1/reviews                 # List reviews
POST   /api/v1/reviews                 # Create review
GET    /api/v1/reviews/{id}            # Get review
```

### Certificates
```
GET    /api/v1/certificates            # List certificates
POST   /api/v1/certificates            # Generate certificate
GET    /api/v1/certificates/{id}       # Get certificate
GET    /api/v1/certificates/{id}/download # Download PDF
```

### Statistics
```
GET    /api/v1/stats/admin             # Admin stats
GET    /api/v1/stats/mentor/{id}       # Mentor stats
GET    /api/v1/stats/intern/{id}       # Intern stats
```

### File Upload
```
POST   /api/v1/upload/presigned-url    # Get S3 presigned URL
POST   /api/v1/upload                  # Direct upload
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    avatar VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Programs Table
```sql
CREATE TABLE programs (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    duration INTEGER,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    difficulty VARCHAR,
    skills TEXT[],
    deadline TIMESTAMP,
    reference_links TEXT[],
    program_id VARCHAR REFERENCES programs(id),
    created_by VARCHAR REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Assignments Table
```sql
CREATE TABLE assignments (
    id VARCHAR PRIMARY KEY,
    task_id VARCHAR REFERENCES tasks(id),
    intern_id VARCHAR REFERENCES users(id),
    mentor_id VARCHAR REFERENCES users(id),
    status VARCHAR,
    assigned_at TIMESTAMP DEFAULT NOW(),
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP
);
```

### Submissions Table
```sql
CREATE TABLE submissions (
    id VARCHAR PRIMARY KEY,
    assignment_id VARCHAR REFERENCES assignments(id),
    github_url VARCHAR,
    file_url VARCHAR,
    notes TEXT,
    submitted_at TIMESTAMP DEFAULT NOW()
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
    id VARCHAR PRIMARY KEY,
    submission_id VARCHAR REFERENCES submissions(id),
    mentor_id VARCHAR REFERENCES users(id),
    score INTEGER,
    feedback TEXT,
    status VARCHAR,
    reviewed_at TIMESTAMP DEFAULT NOW()
);
```

### Certificates Table
```sql
CREATE TABLE certificates (
    id VARCHAR PRIMARY KEY,
    intern_id VARCHAR REFERENCES users(id),
    program_id VARCHAR REFERENCES programs(id),
    certificate_id VARCHAR UNIQUE,
    pdf_url VARCHAR,
    issued_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_auth.py

# Run with verbose output
pytest -v
```

---

## 🚀 Deployment

### Using Docker

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Build image
docker build -t kaizenspark-api .

# Run container
docker run -p 8000:8000 --env-file .env kaizenspark-api
```

### Using Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: kaizenspark
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/kaizenspark
    depends_on:
      - db

volumes:
  postgres_data:
```

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kaizenspark

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=kaizenspark-uploads

# Email
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@kaizenspark.tech
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com

# Application
APP_NAME=KaizenSpark Internship Platform
APP_VERSION=1.0.0
DEBUG=True
```

---

## 📝 Common Tasks

### Create a New Admin User
```python
from app.core.security import get_password_hash
from app.models.user import User
from app.core.database import SessionLocal

db = SessionLocal()
user = User(
    email="admin@example.com",
    name="Admin User",
    password=get_password_hash("password123"),
    role="ADMIN"
)
db.add(user)
db.commit()
```

### Reset Database
```bash
# Drop all tables
alembic downgrade base

# Recreate tables
alembic upgrade head

# Seed data
python scripts/seed_data.py
```

### Generate New Migration
```bash
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: could not connect to server
Solution: Check PostgreSQL is running and DATABASE_URL is correct
```

### Import Error
```
Error: ModuleNotFoundError: No module named 'app'
Solution: Make sure you're in the backend directory and venv is activated
```

### JWT Token Error
```
Error: Could not validate credentials
Solution: Check SECRET_KEY is set and token hasn't expired
```

---

## 📚 Additional Resources

- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **SQLAlchemy Docs:** https://docs.sqlalchemy.org/
- **Alembic Docs:** https://alembic.sqlalchemy.org/
- **Pydantic Docs:** https://docs.pydantic.dev/

---

## ✅ Status

- ✅ FastAPI setup complete
- ✅ Database models defined
- ✅ Authentication implemented
- ✅ API endpoints ready
- ✅ File upload configured
- ✅ Documentation complete

**Backend is now production-ready!** 🎉
