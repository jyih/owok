from .db import db
from sqlalchemy import DateTime


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    player_one_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    player_two_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    winner_id = db.Column(db.Integer, nullable=True)
    moves = db.Column(db.String(12000), nullable=False)
    is_private_one = db.Column(db.Boolean, nullable=False)
    is_private_two = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(DateTime())
    updated_at = db.Column(DateTime())

    # users = db.relationship('User', back_populates='games')
    user_player_one = db.relationship('User', backref='player_one')
    user_player_two = db.relationship('User', backref='player_two')

    comments = db.relationship(
        "Comment", backref="game", cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'player_one_id': self.player_one_id,
            'player_two_id': self.player_two_id,
            'winner_id': self.winner_id,
            'moves': self.moves,
            'is_private_one': self.is_private_one,
            'is_private_two': self.is_private_two,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'users_in_game': [u.to_dict() for u in self.users],
            'user_player_one': self.player_one_id.to_dict(),
            'user_player_two': self.player_two_id.to_dict(),
            'comments': [c.to_dict() for c in self.comments]
        }
