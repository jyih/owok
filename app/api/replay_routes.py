from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Game, User
# from app.forms import GameForm

replay_routes = Blueprint('replays', __name__)

@replay_routes.route('/')
@login_required
def replays():
  games = Game.query.all()
  return {game.to_dict()['id']:game.to_dict() for game in games}


@replay_routes.route('/<int:id>')
@login_required
def replay(id):
  #Get specific game via id
  game = Game.query.get(id)
  print('game:', game)
  if not game:
    return {'errors': 'Game not found'}
  return {**game.to_dict()}


@replay_routes.route('/user/<int:user_id>')
@login_required
def replays_user(user_id):
  #Get all games played by user_id
  user = User.query.get(user_id)
  games = user.get_games()
  print('game:', games)
  if not games:
    return {'errors': 'Games not found'}
  return {game['id']:game for game in games}


@replay_routes.route('/', methods=['POST'])
@login_required
def replay_create():
  data = request.json
  # form = GameForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  # if form.validate_on_submit():
  print(f'''
  SHOW ME THE DATA {data}
  ''')
  game = Game(
      player_one_id = data['player_one_id'],
      player_two_id = data['player_two_id'],
      winner_id = data['winner_id'],
      moves = data['moves'],
  )
  db.session.add(game)

  if data['winner_id']:
    winner_id = data['winner_id']
    loser_id = data['player_two_id'] if data['winner_id'] == data['player_one_id'] else data['player_one_id']
    winner = User.query.get(winner_id)
    loser = User.query.get(loser_id)
    winner.wins += 1
    loser.losses += 1
  else:
    player_one = User.query.get(data['player_one_id'])
    player_two = User.query.get(data['player_two_id'])
    player_one.draws += 1
    player_two.draws += 1

  db.session.commit()
  return game.to_dict()


@replay_routes.route('/<int:id>', methods=['PUT'])
@login_required
def replay_update(id):
  data = request.json
  game = Game.query.get(id)

  if not game:
    return {'errors': 'Game not found'}
  # if data['moves']:
  #   game.moves = data['moves']
  if data['change'] == "is_private_one":
    game.is_private_one = not game.is_private_one
  elif data['change'] == "is_private_two":
    game.is_private_two = not game.is_private_two
  # game.is_private_one = data['is_private_one']
  # game.is_private_two = data['is_private_two']
  db.session.commit()
  return game.to_dict()
