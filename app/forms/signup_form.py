from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('already in use.')


def valid_email(form, field):
    email = field.data
    if "@" or "." not in email:
        raise ValidationError('not valid ⊙﹏⊙∥')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('taken (っ °Д °;)っ')


def username_min_length(form, field):
    username = field.data
    if len(username) < 3:
        raise ValidationError('too short (っ °Д °;)っ')


def email_min_length(form, field):
    email = field.data
    if len(email) < 4:
        raise ValidationError('too short (っ °Д °;)っ')


def password_min_length(form, field):
    password = field.data
    if len(password) < 4:
        raise ValidationError('too short o(￣o￣*)ゞ')

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
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_min_length])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, email_min_length, valid_email])
    password = StringField('password', validators=[
                           DataRequired(), password_min_length])
    sprite_url = StringField('sprite_url', validators=[DataRequired(), valid_sprite])
