from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Comment
from ..forms.comment_form import CreateCommentForm, EditCommentForm

comment_routes = Blueprint('comment_routes', __name__)

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@comment_routes.route('', methods=['POST'])
def create_comment():
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.user_id.data,
            post_id=form.post_id.data,
            content=form.content.data,
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict(), 201

    if form.errors:
        return form.errors, 400

    return {'message': 'Invalid request'}, 400

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                   READ
# TODO ——————————————————————————————————————————————————————————————————————————————————


@comment_routes.route('')
def get_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    form = EditCommentForm()
    print(request, 'request'*100)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.content = form.content.data
        comment.edited = True

        db.session.commit()

        return comment.to_dict(), 200

    if form.errors:
        return form.errors, 400

    return {'message': 'Invalid request'}, 400

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    if (id):
        comment = Comment.query.get(id)
        previous_comment = comment.to_dict()

        db.session.delete(comment)
        db.session.commit()

        return previous_comment, 200

    return {'message': 'The comment does not exist'}, 404
