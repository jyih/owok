from .db import db

game_users = db.Table(
    'game_users',
    db.Column(
        'game_id',
        db.Integer,
        db.ForeignKey('games.id'),
        primary_key=True
    ),
    db.Column(
        'player_id',
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    ),
    db.Column('move_first', db.Boolean, nullable=False),
    db.Column('is_winner', db.Boolean, nullable=False)
)
