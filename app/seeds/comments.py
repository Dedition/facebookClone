from ..models import db, Post, User, Comment


def seed_comments():
    # Create a list of dictionaries
    comment1 = Comment(user_id=1, post_id=1,
                       content='This is the first comment')

    comment2 = Comment(user_id=1, post_id=1,
                       content='This is the second comment')

    comment3 = Comment(user_id=1, post_id=1,
                       content='This is the third comment')

    for comment in [comment1, comment2, comment3]:
        db.session.add(comment)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
