from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://uwuowok.herokuapp.com",
        "http://uwuowok.herokuapp.com",
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)

rooms = {}
user_sid = {}

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print('|*| CHAT:', data)
    # emit("chat", {"user": data["user"], "msg": data["msg"]})
    emit("chat", data, room=data['room'])
    # emit("chat", data, to=data['room'])

# handle player info
@socketio.on("player_info")
def handle_player_info(data):
    print('|*| PLAYER_INFO:', data)
    # emit("player_info", data, broadcast=True)
    emit("player_info", data, room=data['room'])

# handle place piece
@socketio.on('place_piece')
def handle_place_piece(data):
    print(f'''
    |*| PLACE_PIECE: {data}
    ''')
    emit("place_piece", data, broadcast=True, room=data['room'])

@socketio.on('join_room')
def on_join(data):
    print(f'''
    |*| JOIN_ROOM:
    {data}
    Data:
    {request.sid}
    ''')

    room = data['room']
    user = data['user']

    if not room in rooms:
        rooms[room] = {}

    if not request.sid in user_sid:
        user_sid[request.sid] = {'id': user['id'], 'room': room}

    print(f"client {user} wants to join: {room}")
    rooms[room][user['id']] = user
    join_room(room)
    data['players'] = rooms[room]

    # emit('open_room', data, broadcast=True)
    emit('open_room', data, room=data['room'])
    # emit("chat", data, broadcast=True)

# @socketio.on('leave_room')
# def on_leave(data):
#     print(f'''
#     |*| LEAVE_ROOM:
#     {data}
#     ''')
#     leave_room(data['room'])
#     room = data['room']
#     user_id = data['user']['id']
#     del rooms[room][user_id]
#     data['players'] = rooms[room]
#     emit('leave_room', data, broadcast=True)

@socketio.on('disconnect')
def disconnect():
    print(f'''
    |*| DISCONNECT:
    {rooms}
    ''')
    dc_user = user_sid[request.sid]
    del rooms[dc_user['room']][dc_user['id']]
    print(f'''
    |*| DELETED:
    {rooms}
    ''')
    emit('leave_room', {'players': rooms[dc_user['room']]}, room=dc_user['room'])


# @socketio.on('message')
# def on_chat_sent(data):
#     # data = req['message']
#     print('|*| MESSAGE:', data)
#     send({'message': data['message']}, room=data['room'],)
