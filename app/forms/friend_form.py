from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class FriendRequestForm(FlaskForm):
    user_a = IntegerField('user_a', validators=[DataRequired()])
