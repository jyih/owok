from email.policy import default
from .db import db
import datetime
from sqlalchemy import DateTime


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    player_one_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    player_two_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    winner_id = db.Column(db.Integer, nullable=True)
    moves = db.Column(db.String(12000), nullable=False)

    is_private_one = db.Column(db.Boolean, nullable=False, default=False)
    is_private_two = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(DateTime, default=datetime.datetime.now())
    updated_at = db.Column(DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    player_one = db.relationship(
        'User',
        foreign_keys=[player_one_id],
        back_populates='games_player_one'
    )

    player_two = db.relationship(
        'User',
        foreign_keys=[player_two_id],
        back_populates='games_player_two'
    )

    comments = db.relationship(
        "Comment",
        back_populates='game',
        cascade="all, delete",
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
            'user_player_one': self.player_one.to_dict(),
            'user_player_two': self.player_two.to_dict(),
            'comments': {c.to_dict()['id']:c.to_dict() for c in self.comments}
        }
