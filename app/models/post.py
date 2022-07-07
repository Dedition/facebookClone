from .db import db
import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    edited = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship('User', back_populates='posts', lazy=True)
    comments = db.relationship(
        'Comment', back_populates='post', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'image_url': self.image_url,
            'edited': self.edited,
            'user': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }
