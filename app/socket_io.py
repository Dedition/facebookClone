from flask_socketio import SocketIO, emit, join_room, leave_room
from .models import db, User
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://facebook-cap.herokuapp.com",
        "https://facebook-cap.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)


@socketio.on("online")
def handle_online(data):
    user = User.query.filter_by(id=data["user_id"]).first()
    user.online = True
    db.session.commit()
    emit("online", data, broadcast=True)


@socketio.on("offline")
def handle_offline(data):
    user = User.query.filter_by(id=data["user_id"]).first()
    user.online = False
    db.session.commit()
    emit("offline", data, broadcast=True)


@socketio.on("join")
def handle_join(data):
    join_room(data["room"])
    emit("join", data, broadcast=True)


@socketio.on("leave")
def handle_leave(data):
    leave_room(data["room"])
    emit("leave", data, broadcast=True)


@socketio.on("typing")
def handle_typing(data):
    emit("typing", data, broadcast=True)


@socketio.on("stop_typing")
def handle_stop_typing(data):
    emit("stop_typing", data, broadcast=True)


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")
    emit("disconnect", broadcast=True)


@socketio.on("connect")
def handle_connect():
    print("Client connected")
    emit("connect", broadcast=True)


@socketio.on("error")
def handle_error(data):
    print("Client error")
    emit("error", data, broadcast=True)


@socketio.on("friends")
def handle_friends(data):
    emit("friends", data, broadcast=True)
