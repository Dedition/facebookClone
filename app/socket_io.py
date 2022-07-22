from flask_socketio import SocketIO
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
