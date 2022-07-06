from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    avatar = db.Column(db.String(255), nullable=True, default='https://facebookclonebucket2.s3.us-east-1.amazonaws.com/assessment-for-sprint-18-practice-a-flask.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCICBpPJ20HqvpIE9Q%2F0JUhmCG0mTqy5exaFN2ZGLH6IEJAiEA%2FejUveHyD9tLURQx6YqJQWTHfezUIJZsSipu%2B0Qzc6Iq7QIIxv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4ODEwNzY3ODc5ODciDNPpyvIm2JMJakOg6irBAqrwskyNLsHTo62i556Lc2aO2GHrtce7IzF2iDVslRSoaPdlTisZpTT%2F70opZH1yGPjybFxS4KM98Wqgahl3%2B7V%2FxzncAg%2FPNWrP%2FSSbqgAZilJmOG1wv4JBPKpx%2F2pcYo9nkpG5d16WCFXlAebYeC%2Frt0JxfI6UerVpQ5ffqMCgMWoh%2BjACQWQcEBOn27Ww%2FP2vL%2B4OzOtnSQGQmkjI47sAPuTypjejm8JmRs8XIDuC5dOR3cpEzOql0XteNdcApALy1GgNdakocQJyMEOoOG9XG5bDkRaaKOLz8dWKXzTyv81lo4fjSxqy3ScWHvxbHwsV53e7wq5ZtBT1%2B2THrSIua0%2BHQtHPNvTlhIwjtOwdLfgvEMOcOei8BhLYI9t84U%2BLTy7zq8Tcf%2Bt3oKu0oljYPdHZ2ua44dAa%2FhlEykVtVDDX7JeWBjqzAsi4mEn4UcyuN8%2F1veA66ZKpA4gdKMCqrndNIozglQ54AULlXTAjUp6UaH4xYVxjmZB4oN3UUjscrQUG2C6nAbC90dNiTPv7AgnUp3BgI2rwp1u6FZD7uv7DPvyvVk4VBI2Tedkc19iUMIhAnuEPcnhfBrnCUgg9dGq4ZKjB3A9ZHxVkVttyHA2pr0Cjzve6DLTLvyhMCo7k77EMPh%2BkRZwGwooifUAAyZ47Q%2FH5ABcNhG%2FCir0PY76sBjxJw07wUFIyesntBkhOZgBt%2FfcT%2B%2BWvfLCiVcs9NdVJs29IyHqHyt3h4erXG1xcs03Tk%2B3dKC%2BttXYT8zri9DuunIxECeKcXTyKoLgGj1JTj1cXUgi7sAve25oHJH%2BeN1p5obB8nr3bm7KsY%2BBrtQX%2FvBGp1ACMj1k%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220706T205602Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA42JCE3MJQJ5GNQYJ%2F20220706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=dcc286c88a4398f526b3d19da93f36bf33a4167a10325e9fd2aec163dae4229d')
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    birthday = db.Column(db.DateTime, nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    banner = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    online = db.Column(db.Boolean, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', back_populates='user', lazy=True)
    comments = db.relationship('Comment', back_populates='user', lazy=True)

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
            'posts': [post.to_dict() for post in self.posts],
            'comments': [comment.to_dict() for comment in self.comments]
        }
