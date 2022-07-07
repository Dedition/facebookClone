from ..models import db, Post, User, Comment


def seed_posts():
    # Create a list of dictionaries
    post1 = Post(user_id=1,
                 content='This is the first post')
    post2 = Post(user_id=1,
                 content='This is the second post')
    post3 = Post(user_id=1,
                 content='This is the third post')
    post4 = Post(user_id=1,
                 content='This is the fourth post')
    post5 = Post(user_id=1,
                 content='This is the fifth post')
    post6 = Post(user_id=1,
                 content='This is the sixth post')

    for post in [post1, post2, post3, post4, post5, post6]:
        db.session.add(post)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
