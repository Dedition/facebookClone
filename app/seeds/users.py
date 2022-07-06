import email
from app.models import db, User
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', firstname='Demo', lastname='User', birthday=datetime(2000, 1, 1),
        email='demo@aa.io', password='password')
    leo = User(
        username='leo', firstname='Leo', lastname='Leo', birthday=datetime(2000, 1, 1),
        email='leo@aa.io', password='password')
    marnie = User(
        username='marnie', firstname='Marnie', lastname='Marnie', birthday=datetime(2000, 1, 1),
        email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', firstname='Bobbie', lastname='Bobbie', birthday=datetime(2000, 1, 1),
        email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(leo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
