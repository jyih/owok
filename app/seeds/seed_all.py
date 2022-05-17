from app.models import db, User
from app.models import db, Game
from app.models import db, Comment


def seed_all():
    # seed users
    demo = User(
        username='xD3m0', email='demo@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/noobm1_2.png")
    jojo = User(
        username='jojo', email='jojo@aa.io', password='omokmaster', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/jojo2.png")
    sharon = User(
        username='uwu', email='uwunuzzlesnya@aa.io', password='sharonspassword', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/sharon2.png")
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
    david = User(
        username='9ziggy9', email='david@aa.io', password='password', wins=0, losses=0, draws=0, sprite_url="https://owok.s3.us-west-1.amazonaws.com/davidr2.png")

    db.session.add(demo)
    db.session.add(jojo)
    db.session.add(sharon)
    db.session.add(jason)
    db.session.add(paul)
    db.session.add(chris)
    db.session.add(cecilia)
    db.session.add(alyssa)
    db.session.add(david)

    # seed games
    game1 = Game(player_one_id=2, player_two_id=1, winner_id=2, turn=0,
                 moves="0909,1010,1009,0910,0809,0709,1109,1209,0808,1110,0810,1210,1310,0807,0811,0812,1008,1107,0908,0708,0711,0612,0611,0511,0710,1007,0512", is_private_one=False, is_private_two=False)
    game2 = Game(player_one_id=1, player_two_id=3, winner_id=1, turn=0,
                 moves="0909,1009,0908,1008,0910,0907,0911,0912,0810,1109,0806,1210,1311,1209,1010,1309,1409,0710,1111,1211,0808,1212,0707", is_private_one=False, is_private_two=False)
    game3 = Game(player_one_id=4, player_two_id=1, winner_id=1, turn=1,
                 moves="0909,0908,1009,0808,1008,0807,1007,1006,1107,1206,1108,0809,1208,0806,0805,0810", is_private_one=False, is_private_two=False)
    game4 = Game(player_one_id=4, player_two_id=1, turn=1,
                 moves="0909,0908,1009,0808,1008,0807,1007,1006,1107,1206,1108,0809,1208,0806,0805")
    game5 = Game(player_one_id=2, player_two_id=1, turn=0,
                 moves="0000,0001,0100,0101,0200,0201,0300,0301,0002,0003,0102,0103,0202,0203,0302,0303,0004,0005,0104,0105,0204,0205,0304,0305,0006,0007,0106,0107,0206,0207,0306,0307,0008,0009,0108,0109,0208,0209,0308,0309,0010,0011,0110,0111,0210,0211,0310,0311,0012,0013,0112,0113,0212,0213,0312,0313,0014,0400,0114,0500,0214,0600,0314,0700,0401,0402,0501,0502,0601,0602,0701,0702,0403,0404,0503,0504,0603,0604,0703,0704,0405,0406,0505,0506,0605,0606,0705,0706,0407,0408,0507,0508,0607,0608,0707,0708,0409,0410,0509,0510,0609,0610,0709,0710,0411,0412,0511,0512,0611,0612,0711,0712,0413,0414,0513,0514,0613,0614,0713,0714,0800,0801,0900,0901,1000,1001,1100,1101,0802,0803,0902,0903,1002,1003,1102,1103,0804,0805,0904,0905,1004,1005,1104,1105,0806,0807,0906,0907,1006,1007,1106,1107,0808,0809,0908,0909,1008,1009,1108,1109,0810,0811,0910,0911,1010,1011,1110,1111,0812,0813,0912,0913,1012,1013,1112,1113,0814,1200,0914,1300,1014,1400,1114,1202,1201,1302,1301,1402,1401,1204,1203,1304,1303,1404,1403,1206,1205,1306,1305,1406,1405,1208,1207,1308,1307,1408,1407,1210,1209,1310,1309,1410,1409,1212,1211,1312,1311,1412,1411,1214,1213,1314,1313,1414")

    db.session.add(game1)
    db.session.add(game2)
    db.session.add(game3)
    db.session.add(game4)
    db.session.add(game5)

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
