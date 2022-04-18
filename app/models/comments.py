from email.policy import default
from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    content = db.Column(db.String(12000), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow(), onupdate=datetime.utcnow(), nullable=False)
    user = db.relationship('User', back_populates='comments')

    game = db.relationship('Game', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'player_id': self.player_id,
            'username': self.username,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    # def get_user(self):
    #     return self.user.to_dict()
