from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class CreatePostForm(FlaskForm):
    user_id = IntegerField('user_id')
    content = StringField('content', validators=[DataRequired()])
    image_url = StringField('image_url')

    #! This doesn't work because less than zero is considered None and None isn't considered something
    #! that can be compared against
    # def validate_user_id(self, user_id):
    #     if user_id.data < 0:
    #         raise ValidationError('User ID must be positive')

    def validate_content(self, content):
        if len(content.data) > 140:
            raise ValidationError('Content must be less than 140 characters')


class EditPostForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    image_url = StringField('image_url')

    def validate_content(self, content):
        if len(content.data) > 140:
            raise ValidationError('Content must be less than 140 characters')
