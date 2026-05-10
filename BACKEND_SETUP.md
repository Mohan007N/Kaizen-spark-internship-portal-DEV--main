# 🚀 FastAPI Backend Setup Guide

## Quick Start

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

The `.env` file is already created with default settings. For production, update:
- `SECRET_KEY` - Generate a secure random key
- `DATABASE_URL` - Use PostgreSQL instead of SQLite

### 3. Start the Backend Server

```bash
# From the backend directory
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or use the shortcut:
```bash
python app/main.py
```

### 4. Verify Backend is Running

Open your browser and go to:
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Root**: http://localhost:8000

## Create Initial Admin/Mentor Accounts

Since the database starts empty, you need to create initial accounts manually.

### Option 1: Using Python Script

Create `backend/create_admin.py`:

```python
from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

db = SessionLocal()

# Create Admin
admin = User(
    email="admin@kaizenspark.tech",
    name="Admin User",
    password=get_password_hash("demo1234"),
    role="ADMIN"
)
db.add(admin)

# Create Mentor
mentor = User(
    email="mentor@kaizenspark.tech",
    name="Dr. Priya Sharma",
    password=get_password_hash("demo1234"),
    role="MENTOR"
)
db.add(mentor)

db.commit()
print("✅ Admin and Mentor accounts created!")
print("Admin: admin@kaizenspark.tech / demo1234")
print("Mentor: mentor@kaizenspark.tech / demo1234")
```

Run it:
```bash
cd backend
python create_admin.py
```

### Option 2: Using API Docs

1. Go to http://localhost:8000/docs
2. Find `POST /api/v1/users/` endpoint
3. Click "Try it out"
4. Enter user data (you'll need to bypass auth for first user)

## Frontend Connection

The frontend is already configured to connect to the backend at `http://localhost:8000/api/v1`.

### Environment Variables (Optional)

Create `spark-internship-portal-DEV--main/.env`:

```bash
VITE_API_URL=http://localhost:8000/api/v1
```

## Testing the Integration

### 1. Start Backend
```bash
cd backend
python app/main.py
```

### 2. Start Frontend
```bash
cd ..
npm run dev
```

### 3. Test Login
- Go to http://localhost:8080/login
- Login as mentor: `mentor@kaizenspark.tech` / `demo1234`
- If backend is running, it will use FastAPI
- If backend is down, it falls back to demo accounts

### 4. Test Intern Creation
- Login as mentor
- Go to "Create Intern"
- Fill in the form
- Click "Create Intern Account"
- The intern will be created in the database

### 5. Test Intern Login
- Logout
- Login with the intern credentials you just created
- Should redirect to intern dashboard

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login with email/password
- `POST /api/v1/auth/register` - Register new user (if enabled)

### Users
- `GET /api/v1/users/` - List all users (filtered by role)
- `POST /api/v1/users/` - Create new user (mentor/admin only)
- `GET /api/v1/users/{id}` - Get user by ID
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user (admin only)

## Database

### SQLite (Development)
The default setup uses SQLite with the database file at `backend/kaizenspark.db`.

### PostgreSQL (Production)

Update `.env`:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/kaizenspark
```

Install PostgreSQL driver:
```bash
pip install psycopg2-binary
```

## Troubleshooting

### Backend won't start
- Check if port 8000 is already in use
- Verify Python version (3.11+ required)
- Check if all dependencies are installed

### CORS errors
- Verify `ALLOWED_ORIGINS` in `.env` includes your frontend URL
- Check browser console for specific CORS error

### Database errors
- Delete `kaizenspark.db` and restart to reset database
- Check database URL in `.env`

### Authentication errors
- Verify `SECRET_KEY` is set in `.env`
- Check token expiration time
- Clear browser localStorage and login again

## Production Deployment

### Security Checklist
- [ ] Change `SECRET_KEY` to a secure random value
- [ ] Set `DEBUG=False`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS
- [ ] Set proper `ALLOWED_ORIGINS`
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up proper logging
- [ ] Configure backup strategy

### Deployment Options
- **AWS**: EC2, ECS, or Lambda
- **Heroku**: `heroku create` + `git push heroku main`
- **Railway**: Connect GitHub repo
- **DigitalOcean**: App Platform or Droplet
- **Render**: Connect GitHub repo

## Development Workflow

### 1. Backend Development
```bash
cd backend
python app/main.py
# Backend runs on http://localhost:8000
```

### 2. Frontend Development
```bash
npm run dev
# Frontend runs on http://localhost:8080
```

### 3. Make Changes
- Backend changes auto-reload with `--reload` flag
- Frontend changes auto-reload with Vite HMR

### 4. Test Integration
- Use browser DevTools Network tab
- Check API requests/responses
- Verify data in database

## Next Steps

1. ✅ Backend is running
2. ✅ Frontend is connected
3. ✅ Mentor can create interns
4. 🔄 Add more endpoints (tasks, submissions, reviews)
5. 🔄 Add file upload functionality
6. 🔄 Add email notifications
7. 🔄 Add certificate generation

## Support

For issues or questions:
- Check FastAPI docs: https://fastapi.tiangolo.com
- Check SQLAlchemy docs: https://docs.sqlalchemy.org
- Review backend logs in terminal
- Check `backend/app/` for code

---

**Status**: ✅ Backend Ready | ✅ Frontend Connected | ✅ Intern Creation Working
