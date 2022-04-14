from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_sprite(form, field):
    # Checking if sprite url is valid
    url = field.data
    valid_sprites = [
        'https://islandracnh.s3.us-west-1.amazonaws.com/noobm1.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/noobm2.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/noobf1.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/noobf2.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/nxhoem1.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/nxhoem2.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/nxhoef1.png',
        'https://islandracnh.s3.us-west-1.amazonaws.com/nxhoef2.png',
    ]
    if not url in valid_sprites:
        raise ValidationError('Not a valid sprite url')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    sprite_url = StringField('sprite_url', validators=[valid_sprite])
