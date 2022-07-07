from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    avatar = db.Column(db.String(255), nullable=True,
                       default='https://facebookclonebucket2.s3.amazonaws.com/defaultfb.png')
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    birthday = db.Column(db.DateTime, nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    banner = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    online = db.Column(db.Boolean, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'avatar': self.avatar,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'birthday': self.birthday,
            'email': self.email,
            'banner': self.banner,
            'bio': self.bio,
            'online': self.online,
        }
