from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Game, User
# from app.forms import GameForm

game_routes = Blueprint('games', __name__)

@game_routes.route('/')
def games():
  games = Game.query.all()
  return {game.to_dict()['id']:game.to_dict() for game in games}


@game_routes.route('/<int:id>')
def game(id):
  #Get specific game via id
  game = Game.query.get(id)
  print('game:', game)
  if not game:
    return {'errors': 'Game not found'}
  return {**game.to_dict()}


@game_routes.route('/user/<int:user_id>')
def games_user(user_id):
  #Get all games played by user_id
  user = User.query.get(user_id)
  games = user.get_games()
  print('game:', games)
  if not games:
    return {'errors': 'Games not found'}
  return {game['id']:game for game in games}


@game_routes.route('/', methods=['POST'])
# @login_required
def game_create():
  data = request.json
  # form = GameForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  # if form.validate_on_submit():
  game = Game(
      player_one_id = data['player_one_id'],
      player_two_id = data['player_one_id'],
      winner_id = data['winner_id'],
      moves = data['moves'],
  )
  db.session.add(game)
  db.session.commit()
  return game.to_dict()


@game_routes.route('/<int:id>', methods=['PUT'])
def game_update(id):
  data = request.json
  game = Game.query.get(id)
  if not game:
    return {'errors': 'Game not found'}
  game.is_private_one = data['is_private_one']
  game.is_private_two = data['is_private_two']
  db.session.commit()
  return game.to_dict()
