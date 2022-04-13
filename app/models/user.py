from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import DateTime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    wins = db.Column(db.Integer, nullable=False)
    losses = db.Column(db.Integer, nullable=False)
    draws = db.Column(db.Integer, nullable=False)
    sprite_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(DateTime())
    updated_at = db.Column(DateTime())


    comments = db.relationship(
        'Comment',
        back_populates='user',
        # order_by='Comment.id',
    )

    games_player_one = db.relationship(
        'Game',
        foreign_keys='Game.player_one_id',
        back_populates='player_one',
        lazy='dynamic'
    )

    games_player_two = db.relationship(
        'Game',
        foreign_keys='Game.player_two_id',
        back_populates='player_two',
        lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'wins': self.wins,
            'losses': self.losses,
            'draws': self.draws,
            'sprite_id': self.sprite_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def get_games(self):
        return {
            'games-one': [g.to_dict() for g in self.games_player_one],
            'games-two': [g.to_dict() for g in self.games_player_two]
        }
