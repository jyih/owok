from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Comment, Comment
# from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

#need to add backend validation for user

@comment_routes.route('/')
@login_required
def comments():
  comments = Comment.query.all()
  return {comment.to_dict()['id']:comment.to_dict() for comment in comments}

@comment_routes.route('/<int:id>')
@login_required
def comment(id):
  comment = Comment.query.get(id)
  print('comment:', comment)
  if not comment:
    return {'errors': 'Comment not found'}
  return {**comment.to_dict()}

@comment_routes.route('/', methods=['POST'])
@login_required
def comment_create():
  data = request.json
  comment = Comment(
      game_id = data['game_id'],
      player_id = data['player_id'],
      username = data['username'],
      content = data['content'],
  )
  db.session.add(comment)
  db.session.commit()
  return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def comment_update(id):
  data = request.json
  comment = Comment.query.get(id)
  if not comment:
    return {'errors': 'Comment not found'}
  comment.content = data['content'],
  db.session.commit()
  return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def comment_delete(id):
  comment = Comment.query.get(id)
  if not comment:
    return {'errors': 'Comment not found'}
  db.session.delete(comment)
  db.session.commit()
  return f'{id}'
