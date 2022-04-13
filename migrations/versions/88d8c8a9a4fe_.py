"""empty message

Revision ID: 88d8c8a9a4fe
Revises: 
Create Date: 2022-04-13 13:29:29.899757

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88d8c8a9a4fe'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('wins', sa.Integer(), nullable=False),
    sa.Column('losses', sa.Integer(), nullable=False),
    sa.Column('draws', sa.Integer(), nullable=False),
    sa.Column('sprite_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('player_one_id', sa.Integer(), nullable=False),
    sa.Column('player_two_id', sa.Integer(), nullable=False),
    sa.Column('winner_id', sa.Integer(), nullable=True),
    sa.Column('moves', sa.String(length=12000), nullable=False),
    sa.Column('is_private_one', sa.Boolean(), nullable=False),
    sa.Column('is_private_two', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['player_one_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['player_two_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('content', sa.String(length=12000), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['player_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('games')
    op.drop_table('users')
    # ### end Alembic commands ###
