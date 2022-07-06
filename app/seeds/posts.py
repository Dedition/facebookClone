from ..models import db, Post, User, Comment


def seed_posts():
    # Create a list of dictionaries
    post1 = Post(user_id=1, content='This is the first post',
                 comments=[comment1])
    comment1 = Comment(user_id=1, post_id=1,
                       content='This is the first comment')

    for post in [post1]:
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
