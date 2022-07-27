from ..models import db, Friend


def seed_friends():
    friend1 = Friend(user_a=1, user_b=2)
    friend2 = Friend(user_a=1, user_b=3, status=True)
    friend3 = Friend(user_a=1, user_b=4, status=True)

    friendList = [friend1, friend2, friend3]

    for friend in friendList:
        db.session.add(friend)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
