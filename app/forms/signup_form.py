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
    if "@" not in email or "." not in email:
        raise ValidationError('not valid ⊙﹏⊙∥')


def check_space(form, field):
    to_check = field.data
    if " " in to_check:
        raise ValidationError('no spaces pls X﹏X')


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

def username_max_length(form, field):
    username = field.data
    if len(username) > 12:
        raise ValidationError('too long (っ °Д °;)っ')


def email_min_length(form, field):
    email = field.data
    if len(email) < 4:
        raise ValidationError('too short (っ °Д °;)っ')


def password_min_length(form, field):
    password = field.data
    if len(password) < 4:
        raise ValidationError('too short o(￣o￣*)ゞ')

# Checking if sprite url is valid
def valid_sprite(form, field):
    url = field.data
    valid_sprites = [
        'https://owok.s3.us-west-1.amazonaws.com/noobm1_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/noobm2_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/noobf1_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/noobf2_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoem1_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoem2_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoef3_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoef4_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoem3_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoem4_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoef1_2.png',
        'https://owok.s3.us-west-1.amazonaws.com/nxhoef2_2.png',
    ]
    if not url in valid_sprites:
        raise ValidationError('Not a valid sprite!')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_min_length, username_max_length, check_space])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, email_min_length, valid_email, check_space])
    password = StringField('password', validators=[
                           DataRequired(), password_min_length, check_space])
    sprite_url = StringField('sprite_url', validators=[DataRequired(), valid_sprite])
