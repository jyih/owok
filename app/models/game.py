from email.policy import default
from .db import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB


def default_turn(context):
    return context.get_current_parameters()["player_one_id"]


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    player_one_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    player_two_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    winner_id = db.Column(db.Integer, nullable=True)
    moves = db.Column(db.String(12000), nullable=False, default="")
    board = db.Column(JSONB, nullable=True, default={})
    turn = db.Column(db.Integer, default=default_turn)

    is_private_one = db.Column(db.Boolean, nullable=False, default=False)
    is_private_two = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    player_one = db.relationship(
        "User", foreign_keys=[player_one_id], back_populates="games_player_one"
    )

    player_two = db.relationship(
        "User", foreign_keys=[player_two_id], back_populates="games_player_two"
    )

    comments = db.relationship(
        "Comment",
        back_populates="game",
        cascade="all, delete",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "player_one_id": self.player_one_id,
            "player_two_id": self.player_two_id,
            "winner_id": self.winner_id,
            "moves": self.moves,
            "board": self.board,
            "turn": self.turn,
            "is_private_one": self.is_private_one,
            "is_private_two": self.is_private_two,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_player_one": self.player_one.to_dict(),
            "user_player_two": self.player_two.to_dict(),
            "comments": {c.to_dict()["id"]: c.to_dict() for c in self.comments},
        }
