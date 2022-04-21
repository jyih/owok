from flask_socketio import SocketIO, emit, join_room, leave_room, send
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
    print('|*| CHAT:', data)
    emit("chat", data, broadcast=True)

# handle player info
@socketio.on("player_info")
def handle_player_info(data):
    print('|*| PLAYER_INFO:', data)
    emit("player_info", data, broadcast=True)

# handle place piece
@socketio.on("place_piece")
def handle_place_piece(data):
    print('|*| PLACE_PIECE:', data)
    emit("place_piece", data, broadcast=True, room=data['room'])

@socketio.on('join_room')
def on_join(data):
    room = data['room']
    print('|*| JOIN_ROOM:', data['user'])
    join_room(room)
    emit('open_room', data, broadcast=True)

@socketio.on("leave_room")
def leave(data):
    print('''
    |*| LEAVE_ROOM:
    ''', data)
    leave_room(data['room'])

@socketio.on('message')
def on_chat_sent(data):
    # data = req['message']
    print('|*| MESSAGE:', data)
    send({'message': data['message']}, room=data['room'],)