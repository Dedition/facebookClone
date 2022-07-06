from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class CreateCommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])

    def validate_user_id(self, user_id):
        if user_id.data < 0:
            raise ValidationError('User ID must be positive')

    def validate_content(self, content):
        if len(content.data) > 1000:
            raise ValidationError('Content must be less than 1000 characters')


class EditCommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])

    def validate_content(self, content):
        if len(content.data) > 1000:
            raise ValidationError('Content must be less than 1000 characters')
