"""
Create initial admin and mentor accounts
Run this script once to set up the system
"""
import sys
sys.path.insert(0, '.')

from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def create_initial_users():
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_admin = db.query(User).filter(User.email == "admin@kaizenspark.tech").first()
        existing_mentor = db.query(User).filter(User.email == "mentor@kaizenspark.tech").first()
        
        if existing_admin and existing_mentor:
            print("⚠️  Initial users already exist!")
            print(f"Admin: {existing_admin.email}")
            print(f"Mentor: {existing_mentor.email}")
            return
        
        # Create Admin
        if not existing_admin:
            admin = User(
                email="admin@kaizenspark.tech",
                name="Rohan Kapoor",
                password=get_password_hash("demo1234"),
                role="ADMIN"
            )
            db.add(admin)
            print("✅ Admin account created!")
        
        # Create Mentor
        if not existing_mentor:
            mentor = User(
                email="mentor@kaizenspark.tech",
                name="Dr. Priya Sharma",
                password=get_password_hash("demo1234"),
                role="MENTOR"
            )
            db.add(mentor)
            print("✅ Mentor account created!")
        
        db.commit()
        
        print("\n" + "="*50)
        print("🎉 Initial Setup Complete!")
        print("="*50)
        print("\n📧 Login Credentials:\n")
        print("Admin Account:")
        print("  Email: admin@kaizenspark.tech")
        print("  Password: demo1234")
        print("\nMentor Account:")
        print("  Email: mentor@kaizenspark.tech")
        print("  Password: demo1234")
        print("\n" + "="*50)
        print("🚀 You can now start the backend server:")
        print("   python app/main.py")
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_users()
