from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from ..forms.post_form import CreatePostForm, EditPostForm
from app.api.aws_s3_bucket import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('post_routes', __name__)

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@post_routes.route("", methods=['POST'])
def create_post():
    form = CreatePostForm()
    # print(request.json, int(current_user.id), "REQUEST.JSON"*20)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # TODO AWS S3 Upload START
        if request.files:
            print("FILES:", request.files)
            image = request.files['image_url']
            print("IMAGE:", image)

            if not allowed_file(image.filename):
                return {'error': 'File type not allowed'}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return {'error': 'File upload failed'}, 400

            url = upload['url']
        else:
            url = None

        # TODO AWS S3 Upload END

        post = Post(
            user_id=current_user.id,
            content=form.content.data,
            image_url=url,
            edited=False
        )

        db.session.add(post)
        db.session.commit()

        return post.to_dict(), 201

    if form.errors:
        return form.errors, 400

    return {'message': 'Invalid request'}, 400


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                   READ
# TODO ——————————————————————————————————————————————————————————————————————————————————


@ post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@ post_routes.route('/<int:post_id>')
def get_all_users_posts(id):
    posts = Post.query.filter_by(user_id=id).all()
    return {'posts': [post.to_dict() for post in posts]}


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@ post_routes.route('/<int:id>', methods=['PUT'])
def edit_post(id):
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.content = form.content.data
        post.edited = True

        db.session.commit()

        return post.to_dict(), 200

    if form.errors:
        return form.errors, 400

    return {'message': 'Invalid request'}, 400

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@ post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    if (id):
        post = Post.query.get(id)
        previous_post = post.to_dict()

        db.session.delete(post)
        db.session.commit()

        return previous_post, 200
    else:
        return {'message': 'Invalid request'}, 400
