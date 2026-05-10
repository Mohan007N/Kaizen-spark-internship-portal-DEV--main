"""
Seed initial data for development and testing
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from datetime import datetime, timedelta
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User, RoleEnum
from app.models.program import Program
from app.models.task import Task, DifficultyEnum
from app.models.assignment import Assignment, TaskStatusEnum

def seed_database():
    """Seed the database with initial data"""
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(User).first():
            print("Database already seeded. Skipping...")
            return
        
        print("Seeding database...")
        
        # Create users
        admin = User(
            email="admin@kaizenspark.tech",
            name="Rohan Kapoor",
            password=get_password_hash("demo1234"),
            role=RoleEnum.ADMIN
        )
        
        mentor = User(
            email="mentor@kaizenspark.tech",
            name="Dr. Priya Sharma",
            password=get_password_hash("demo1234"),
            role=RoleEnum.MENTOR
        )
        
        intern = User(
            email="intern@kaizenspark.tech",
            name="Aarav Mehta",
            password=get_password_hash("demo1234"),
            role=RoleEnum.INTERN
        )
        
        db.add_all([admin, mentor, intern])
        db.commit()
        print("✓ Created users")
        
        # Create programs
        program1 = Program(
            name="Full Stack Development Internship",
            description="Comprehensive program covering frontend and backend development",
            duration=12,
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(weeks=12),
            is_active=True
        )
        
        program2 = Program(
            name="AI & Machine Learning Track",
            description="Advanced ML engineering and model deployment",
            duration=16,
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(weeks=16),
            is_active=True
        )
        
        db.add_all([program1, program2])
        db.commit()
        print("✓ Created programs")
        
        # Create tasks
        task1 = Task(
            title="Build REST API with Authentication",
            description="Create a secure REST API with JWT authentication, user registration, and login endpoints.",
            difficulty=DifficultyEnum.INTERMEDIATE,
            skills=["Node.js", "Express", "JWT", "PostgreSQL"],
            deadline=datetime.now() + timedelta(days=14),
            reference_links=["https://jwt.io/introduction", "https://expressjs.com/en/guide/routing.html"],
            program_id=program1.id,
            created_by=mentor.id
        )
        
        task2 = Task(
            title="Implement React Dashboard",
            description="Build a responsive admin dashboard with charts, tables, and real-time data updates.",
            difficulty=DifficultyEnum.ADVANCED,
            skills=["React", "TypeScript", "Tailwind CSS", "Recharts"],
            deadline=datetime.now() + timedelta(days=21),
            reference_links=["https://react.dev/learn", "https://recharts.org/en-US/"],
            program_id=program1.id,
            created_by=mentor.id
        )
        
        task3 = Task(
            title="Deploy Application to Cloud",
            description="Deploy the full-stack application to AWS or Vercel with CI/CD pipeline.",
            difficulty=DifficultyEnum.ADVANCED,
            skills=["AWS", "Docker", "CI/CD", "GitHub Actions"],
            deadline=datetime.now() + timedelta(days=28),
            program_id=program1.id,
            created_by=mentor.id
        )
        
        db.add_all([task1, task2, task3])
        db.commit()
        print("✓ Created tasks")
        
        # Create assignments
        assignment1 = Assignment(
            task_id=task1.id,
            intern_id=intern.id,
            mentor_id=mentor.id,
            status=TaskStatusEnum.IN_PROGRESS
        )
        
        assignment2 = Assignment(
            task_id=task2.id,
            intern_id=intern.id,
            mentor_id=mentor.id,
            status=TaskStatusEnum.PENDING
        )
        
        assignment3 = Assignment(
            task_id=task3.id,
            intern_id=intern.id,
            mentor_id=mentor.id,
            status=TaskStatusEnum.PENDING
        )
        
        db.add_all([assignment1, assignment2, assignment3])
        db.commit()
        print("✓ Created assignments")
        
        print("\n✅ Database seeded successfully!")
        print("\nDemo Accounts:")
        print("─" * 50)
        print("Admin:")
        print("  Email: admin@kaizenspark.tech")
        print("  Password: demo1234")
        print("\nMentor:")
        print("  Email: mentor@kaizenspark.tech")
        print("  Password: demo1234")
        print("\nIntern:")
        print("  Email: intern@kaizenspark.tech")
        print("  Password: demo1234")
        print("─" * 50)
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
