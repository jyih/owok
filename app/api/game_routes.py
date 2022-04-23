from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Game, User

game_routes = Blueprint('games', __name__)

@game_routes.route('/')
def all_games():
  games = Game.query.all()
  return {game.to_dict()['id']:game.to_dict() for game in games}

@game_routes.route('/<int:id>')
def get_game(id):
  #Get specific game via id
  game = Game.query.get(id)
  print('game:', game)
  if not game:
    return {'errors': 'Game not found'}
  return {**game.to_dict()}

@game_routes.route('/', methods=['POST'])
# @login_required
def create_game():
  data = request.json
  print(f'''
  SHOW ME THE DATA {data}
  ''')
  game = Game(
      player_one_id = data['player_one_id'],
      player_two_id = data['player_two_id'],

  )
  db.session.add(game)

  db.session.commit()
  return game.to_dict()

@game_routes.route('/<int:id>', methods=['PATCH'])
def update_game(id):
  data = request.json
  move = data['move']
  game = Game.query.get(id)
  if not game:
    return {'errors': 'Game not found'}
  place_piece(game, move)
  db.session.commit()
  return {**game.to_dict()}

# ==========
# Game Logic
# ==========

displace = {
    'up': -100,
    'down': 100,
    'left': -1,
    'right': 1,
}

def place_piece(game, move):
  if not game.board[move]:
    game.board[move] = game.turn
    check_game(game, move)

def check_game(game, move, n=5):
  if game.winner_id is not None:
    vertical = check_line(game, move, displace.up, n)
    horizontal = check_line(game, move, displace.right, n)
    forward_diag = check_line(game,move, displace.up + displace.right, n)
    backward_diag = check_line(game, move, displace.up + displace.left, n)

    if (vertical >= n or horizontal >= n or forward_diag >= n or backward_diag >= n):
      end_game(game)
    else:
      swap_piece(game)

def check_line(game, move, displacement, n=5):
  return check_vector(game, move, displacement, n) + checkVector(game, move, -displacement, n) -1

def check_vector(game, move, displacement, n=5):
  look_piece = game.board[move]
  count = 0

  while game.board[move] and look_piece == game.board[move] and count < n:
    count += 1
    look_move = move + (displacement * count)
    look_piece = game.board[look_move]

  return count

def end_game(game):
  if game.winner_id is not None:
    if game.moves.split(',').length == 225:
      game.winner_id = -1 #tie
    else:
      game.winner_id = game.turn

def swap_piece(game, players=2):
  game.turn = (game.turn + 1) % players
