from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Game, User
from sqlalchemy.orm.attributes import flag_modified
from app.socket import socketio

game_routes = Blueprint("games", __name__)


@game_routes.route("/")
@login_required
def all_games():
    games = Game.query.all()
    return {game.to_dict()["id"]: game.to_dict() for game in games}


@game_routes.route("/<int:id>")
@login_required
def get_game(id):
    # Get specific game via id
    game = Game.query.get(id)
    if not game:
        return {"errors": "Game not found"}
    return {**game.to_dict()}


@game_routes.route("/", methods=["POST"])
@login_required
def create_game():
    data = request.json
    game = Game(
        player_one_id=data["player_one_id"],
        player_two_id=data["player_two_id"],
    )
    db.session.add(game)

    db.session.commit()
    return game.to_dict()


@game_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_game(id):
    data = request.json
    # move = data["move"]
    game = Game.query.get(id)
    move = "c" + data["move"]
    if not game:
        return {"errors": "Game not found"}
    else:
        if game.winner_id is not None:
            return {"errors": "Game is over"}
        else:
            place_piece(game, move, data["player_id"])
            flag_modified(game, "board")
            db.session.commit()
            socketio.emit('place_piece', broadcast=True, room=f'{game.player_one_id}{game.player_two_id}')
            return {**game.to_dict()}


# ============
#  Game Logic
# ============

DISPLACE = {
    "up": -100,
    "down": 100,
    "left": -1,
    "right": 1,
}


def place_piece(game, move, player_id):
    if game.board[move]["piece"] == "" and game.get_players()[game.turn] == player_id:
        game.board[move]["piece"] = game.turn
        game.moves = game.moves + f",{move[1:]}" if len(game.moves) > 0 else f"{move[1:]}"
        check_game(game, move)


def check_game(game, move, n=5):
    vertical = check_line(game, move, DISPLACE["up"], n)
    horizontal = check_line(game, move, DISPLACE["right"], n)
    forward_diag = check_line(game, move, DISPLACE["up"] + DISPLACE["right"], n)
    backward_diag = check_line(game, move, DISPLACE["up"] + DISPLACE["left"], n)


    if len(game.moves) >= 1124 or vertical >= n or horizontal >= n or forward_diag >= n or backward_diag >= n:
        end_game(game)
    else:
        swap_piece(game)


def check_line(game, move, displacement, n=5):
    return (
        check_vector(game, move, displacement, n)
        + check_vector(game, move, -displacement, n)
        - 1
    )


def check_vector(game, move, displacement, n=5):
    look_piece = game.board[move]["piece"]
    count = 0

    while look_piece == game.board[move]["piece"] and count < n:
        count += 1
        look_move = "c" + f"{int(move[1:]) + (displacement * count):04}"
        if not look_move in game.board or game.board[look_move]["piece"] == "":
              break
        else:
            look_piece = game.board[look_move]["piece"]

    return count


def end_game(game):
    player_one = User.query.get(game.player_one_id)
    player_two = User.query.get(game.player_two_id)
    if len(game.moves) >= 1124:
        game.winner_id = -1  # tie
        player_one.draws += 1
        player_two.draws += 1
    else:
        game.winner_id = game.get_players()[game.turn]
        if game.winner_id == player_one.id:
            player_one.wins += 1
            player_two.losses += 1
        if game.winner_id == player_two.id:
            player_two.wins += 1
            player_one.losses += 1


def swap_piece(game, players=2):
    game.turn = (game.turn + 1) % players
