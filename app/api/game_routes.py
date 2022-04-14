from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Game, Comment
# from app.forms import

game_routes = Blueprint('games', __name__)

@game_routes.route('/')
def games():
  games = Game.query.all()
  return {game.to_dict()['id']:game.to_dict() for game in games}

@game_routes.route('/<int:id>')
def game(id):
  game = Game.query.get(id)
  print('game:', game)
  if not game:
    return {'errors': 'Game not found'}
  return {**game.to_dict()}