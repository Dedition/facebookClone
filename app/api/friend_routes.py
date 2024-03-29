from flask import Blueprint, request
from app.forms import friend_form
from app.models import db, Friend, friend
from app.forms.friend_form import FriendRequestForm
from flask_login import current_user

friend_routes = Blueprint('friend_routes', __name__)


@friend_routes.route('/<int:id>')
def get_friends(id):
    friends_a = Friend.query.filter(
        Friend.user_a == id, Friend.status == True).all()
    friends_b = Friend.query.filter(
        Friend.user_b == id, Friend.status == True).all()
    return {"Accepted_SFQ": [friend.to_dict() for friend in friends_a],
            "Accepted_RFQ": [friend.to_dict() for friend in friends_b]}


@friend_routes.route('/index')
def get_all_friends():
    return {idx: friend.to_dict() for idx, friend in enumerate(Friend.query.all())}


@friend_routes.route('/sentFQ/<int:id>')
def all_sent_friend_requests(id):
    friends_a = Friend.query.filter(
        Friend.user_a == id, Friend.status == False).all()
    return {"Sent_FQ": [friend.to_dict() for friend in friends_a]}


@friend_routes.route('/receivedFQ/<int:id>')
def all_received_friend_requests(id):
    friends_b = Friend.query.filter(
        Friend.user_b == id, Friend.status == False).all()
    return {"Received_FQ": [friend.to_dict() for friend in friends_b]}


@friend_routes.route('/<int:id>', methods=['POST'])
def create_friend_request(id):
    # print(current_user, current_user.id, id, "CURRENT_USER"*20)
    form = FriendRequestForm(request.form)
    form["csrf_token"].data = request.cookies['csrf_token']
    form["user_a"].data = current_user.id
    form["user_b"].data = id
    print(form, "form"*10)

    if form.validate_on_submit():
        friend_sent = Friend.query.filter(
            Friend.user_a == id, Friend.user_b == current_user.id).first()
        friend_received = Friend.query.filter(
            Friend.user_b == id, Friend.user_a == current_user.id).first()
        if friend_sent or friend_received:
            return {"error": "You have already sent a friend request"}, 400
        else:
            friend = Friend(
                user_a=current_user.id,
                user_b=id,
                status=True
            )
            db.session.add(friend)
            db.session.commit()
            return friend.to_dict(), 201

        # print(friend_received, "FRIEND_RECEIVED"*10)
        # print(friend_sent, "FRIEND_SENT"*10)
        # print(friend, 'hello' * 10)
        # friend = Friend(user_a=current_user.id, user_b=id)
        # db.session.add(friend)
        # db.session.commit()

    return form.errors, 400


@friend_routes.route("/<int:id>", methods=['PUT'])
def confirm_friend_request(id):
    friend = Friend.query.get(id)
    friend.status = True

    db.session.commit()

    return friend.to_dict(), 200


@friend_routes.route("/<int:id>", methods=['DELETE'])
def delete_friend_request(id):
    if(id):
        friend = Friend.query.get(id)
        no_friend = friend.to_dict()

        db.session.delete(friend)
        db.session.commit()

        return no_friend, 200
    else:
        return {"message": "Friend request not found."}, 404
