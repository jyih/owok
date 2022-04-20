from flask_socketio import SocketIO, emit
import os


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://uwuowok.herokuapp.com",
        "https://play-owok.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

# handle player info
@socketio.on("player_info")
def handle_player_info(data):
    emit("player_info", data, broadcast=True)

# handle place piece
@socketio.on("place_piece")
def handle_place_piece(data):
    emit("place_piece", data, broadcast=True)
