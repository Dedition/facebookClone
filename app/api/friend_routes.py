from flask import Blueprint, request
from app.forms import friend_form
from app.models import db, Friend
from app.forms.friend_form import FriendRequestForm

friend_routes = Blueprint('friend_routes', __name__)


@friend_routes.route('/<int:id>')
def get_friends(id):
    friends_a = Friend.query.filter(
        Friend.user_a == id, Friend.status == True).all()
    friends_b = Friend.query.filter(
        Friend.user_b == id, Friend.status == True).all()
    return {"Accepted_SFQ": [friend.to_dict() for friend in friends_a],
            "Accepted_RFQ": [friend.to_dict() for friend in friends_b]}


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
    form = FriendRequestForm(request.form)
    form["csrf_token"].data = request.cookies['csrf_token']
    friend_sent = Friend.query.filter(
        Friend.user_a == id, Friend.user_b == form.user_b.data).first()
    friend_received = Friend.query.filter(
        Friend.user_b == id, Friend.user_a == form.user_b.data).first()

    if friend_sent or friend_received:
        return {"message": "You are already friends with this user."}, 400

    if form.validate_on_submit():
        friend = Friend(user_a=form.user_a.data, user_b=id)
        db.session.add(friend)
        db.session.commit()
        return friend.to_dict(), 201

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
