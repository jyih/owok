from app.models import db, User
from app.models import db, Game
from app.models import db, Comment


def seed_all():
    # seed users
    demo = User(
        username='xD3m0', email='demo@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/noobm1_2.png")
    jojo = User(
        username='jojo', email='jojo@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/nxhoem3_2.png")
    sharon = User(
        username='uwu', email='sharon@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/sharon2.png")
    jason = User(
        username='xXj0ngyXx', email='jongy@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/jason2.png")
    paul = User(
        username='paulx3', email='paulsaccount@aa.io', password='p@ssword', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/nxhoem1_2.png")
    chris = User(
        username='Tsangerine', email='tsangerine@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/nxhoem1_2.png")
    cecilia = User(
        username='xCecilia', email='cecilia@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/nxhoef1_2.png")
    alyssa = User(
        username='Aly', email='alyssasaccount@aa.io', password='alyspassword', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/alyssa2.png")

    db.session.add(demo)
    db.session.add(jojo)
    db.session.add(sharon)
    db.session.add(jason)
    db.session.add(paul)
    db.session.add(chris)
    db.session.add(cecilia)
    db.session.add(alyssa)

    # seed games
    game1 = Game(player_one_id=2, player_two_id=1, winner_id=2,
                 moves="{0909,1010,1009,0910,0809,0709,1109,1209,0808,1110,0810,1210,1310,0807,0811,0812,1008,1107,0908,0708,0711,0612,0611,0511,0710,1007,0512}", is_private_one=False, is_private_two=False)
    game2 = Game(player_one_id=1, player_two_id=3, winner_id=1,
                 moves="{0909,1009,0908,1008,0910,0907,0911,0912,0810,1109,0806,1210,1311,1209,1010,1309,1409,0710,1111,1211,0808,1212,0707}", is_private_one=False, is_private_two=False)
    game3 = Game(player_one_id=4, player_two_id=1, winner_id=1,
                 moves="{0909,0908,1009,0808,1008,0807,1007,1006,1107,1206,1108,0809,1208,0806,0805,0810}", is_private_one=False, is_private_two=False)

    db.session.add(game1)
    db.session.add(game2)
    db.session.add(game3)

    # seed comments
    comment1 = Comment(game_id=1, player_id=1,
                       username="xD3m0", content="m3s4rs pl0x")
    comment2 = Comment(game_id=1, player_id=2,
                       username="jojo", content="winner gets 5mil")
    comment3 = Comment(game_id=1, player_id=4, username="xXj0ngyXx",
                       content="T>FAME@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    comment4 = Comment(game_id=1, player_id=3,
                       username="uwu", content="nub f3")
    comment5 = Comment(game_id=2, player_id=1, username="xD3m0",
                       content="S>10atk FS 80mil@@@@@@@@@@")
    comment6 = Comment(game_id=3, player_id=1, username="xD3m0",
                       content="S>30 atk WG 25mil@@@@@@@@@")

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_seed_all():
    # undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_games():
    db.session.execute('TRUNCATE games RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
