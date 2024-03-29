from email.policy import default
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB


def default_turn(context):
    return context.get_current_parameters()["player_one_id"]


def default_board(context):
    board = {
        "c0000": {"coord": "0000", "piece": ""},
        "c0001": {"coord": "0001", "piece": ""},
        "c0002": {"coord": "0002", "piece": ""},
        "c0003": {"coord": "0003", "piece": ""},
        "c0004": {"coord": "0004", "piece": ""},
        "c0005": {"coord": "0005", "piece": ""},
        "c0006": {"coord": "0006", "piece": ""},
        "c0007": {"coord": "0007", "piece": ""},
        "c0008": {"coord": "0008", "piece": ""},
        "c0009": {"coord": "0009", "piece": ""},
        "c0010": {"coord": "0010", "piece": ""},
        "c0011": {"coord": "0011", "piece": ""},
        "c0012": {"coord": "0012", "piece": ""},
        "c0013": {"coord": "0013", "piece": ""},
        "c0014": {"coord": "0014", "piece": ""},
        "c0100": {"coord": "0100", "piece": ""},
        "c0101": {"coord": "0101", "piece": ""},
        "c0102": {"coord": "0102", "piece": ""},
        "c0103": {"coord": "0103", "piece": ""},
        "c0104": {"coord": "0104", "piece": ""},
        "c0105": {"coord": "0105", "piece": ""},
        "c0106": {"coord": "0106", "piece": ""},
        "c0107": {"coord": "0107", "piece": ""},
        "c0108": {"coord": "0108", "piece": ""},
        "c0109": {"coord": "0109", "piece": ""},
        "c0110": {"coord": "0110", "piece": ""},
        "c0111": {"coord": "0111", "piece": ""},
        "c0112": {"coord": "0112", "piece": ""},
        "c0113": {"coord": "0113", "piece": ""},
        "c0114": {"coord": "0114", "piece": ""},
        "c0200": {"coord": "0200", "piece": ""},
        "c0201": {"coord": "0201", "piece": ""},
        "c0202": {"coord": "0202", "piece": ""},
        "c0203": {"coord": "0203", "piece": ""},
        "c0204": {"coord": "0204", "piece": ""},
        "c0205": {"coord": "0205", "piece": ""},
        "c0206": {"coord": "0206", "piece": ""},
        "c0207": {"coord": "0207", "piece": ""},
        "c0208": {"coord": "0208", "piece": ""},
        "c0209": {"coord": "0209", "piece": ""},
        "c0210": {"coord": "0210", "piece": ""},
        "c0211": {"coord": "0211", "piece": ""},
        "c0212": {"coord": "0212", "piece": ""},
        "c0213": {"coord": "0213", "piece": ""},
        "c0214": {"coord": "0214", "piece": ""},
        "c0300": {"coord": "0300", "piece": ""},
        "c0301": {"coord": "0301", "piece": ""},
        "c0302": {"coord": "0302", "piece": ""},
        "c0303": {"coord": "0303", "piece": ""},
        "c0304": {"coord": "0304", "piece": ""},
        "c0305": {"coord": "0305", "piece": ""},
        "c0306": {"coord": "0306", "piece": ""},
        "c0307": {"coord": "0307", "piece": ""},
        "c0308": {"coord": "0308", "piece": ""},
        "c0309": {"coord": "0309", "piece": ""},
        "c0310": {"coord": "0310", "piece": ""},
        "c0311": {"coord": "0311", "piece": ""},
        "c0312": {"coord": "0312", "piece": ""},
        "c0313": {"coord": "0313", "piece": ""},
        "c0314": {"coord": "0314", "piece": ""},
        "c0400": {"coord": "0400", "piece": ""},
        "c0401": {"coord": "0401", "piece": ""},
        "c0402": {"coord": "0402", "piece": ""},
        "c0403": {"coord": "0403", "piece": ""},
        "c0404": {"coord": "0404", "piece": ""},
        "c0405": {"coord": "0405", "piece": ""},
        "c0406": {"coord": "0406", "piece": ""},
        "c0407": {"coord": "0407", "piece": ""},
        "c0408": {"coord": "0408", "piece": ""},
        "c0409": {"coord": "0409", "piece": ""},
        "c0410": {"coord": "0410", "piece": ""},
        "c0411": {"coord": "0411", "piece": ""},
        "c0412": {"coord": "0412", "piece": ""},
        "c0413": {"coord": "0413", "piece": ""},
        "c0414": {"coord": "0414", "piece": ""},
        "c0500": {"coord": "0500", "piece": ""},
        "c0501": {"coord": "0501", "piece": ""},
        "c0502": {"coord": "0502", "piece": ""},
        "c0503": {"coord": "0503", "piece": ""},
        "c0504": {"coord": "0504", "piece": ""},
        "c0505": {"coord": "0505", "piece": ""},
        "c0506": {"coord": "0506", "piece": ""},
        "c0507": {"coord": "0507", "piece": ""},
        "c0508": {"coord": "0508", "piece": ""},
        "c0509": {"coord": "0509", "piece": ""},
        "c0510": {"coord": "0510", "piece": ""},
        "c0511": {"coord": "0511", "piece": ""},
        "c0512": {"coord": "0512", "piece": ""},
        "c0513": {"coord": "0513", "piece": ""},
        "c0514": {"coord": "0514", "piece": ""},
        "c0600": {"coord": "0600", "piece": ""},
        "c0601": {"coord": "0601", "piece": ""},
        "c0602": {"coord": "0602", "piece": ""},
        "c0603": {"coord": "0603", "piece": ""},
        "c0604": {"coord": "0604", "piece": ""},
        "c0605": {"coord": "0605", "piece": ""},
        "c0606": {"coord": "0606", "piece": ""},
        "c0607": {"coord": "0607", "piece": ""},
        "c0608": {"coord": "0608", "piece": ""},
        "c0609": {"coord": "0609", "piece": ""},
        "c0610": {"coord": "0610", "piece": ""},
        "c0611": {"coord": "0611", "piece": ""},
        "c0612": {"coord": "0612", "piece": ""},
        "c0613": {"coord": "0613", "piece": ""},
        "c0614": {"coord": "0614", "piece": ""},
        "c0700": {"coord": "0700", "piece": ""},
        "c0701": {"coord": "0701", "piece": ""},
        "c0702": {"coord": "0702", "piece": ""},
        "c0703": {"coord": "0703", "piece": ""},
        "c0704": {"coord": "0704", "piece": ""},
        "c0705": {"coord": "0705", "piece": ""},
        "c0706": {"coord": "0706", "piece": ""},
        "c0707": {"coord": "0707", "piece": ""},
        "c0708": {"coord": "0708", "piece": ""},
        "c0709": {"coord": "0709", "piece": ""},
        "c0710": {"coord": "0710", "piece": ""},
        "c0711": {"coord": "0711", "piece": ""},
        "c0712": {"coord": "0712", "piece": ""},
        "c0713": {"coord": "0713", "piece": ""},
        "c0714": {"coord": "0714", "piece": ""},
        "c0800": {"coord": "0800", "piece": ""},
        "c0801": {"coord": "0801", "piece": ""},
        "c0802": {"coord": "0802", "piece": ""},
        "c0803": {"coord": "0803", "piece": ""},
        "c0804": {"coord": "0804", "piece": ""},
        "c0805": {"coord": "0805", "piece": ""},
        "c0806": {"coord": "0806", "piece": ""},
        "c0807": {"coord": "0807", "piece": ""},
        "c0808": {"coord": "0808", "piece": ""},
        "c0809": {"coord": "0809", "piece": ""},
        "c0810": {"coord": "0810", "piece": ""},
        "c0811": {"coord": "0811", "piece": ""},
        "c0812": {"coord": "0812", "piece": ""},
        "c0813": {"coord": "0813", "piece": ""},
        "c0814": {"coord": "0814", "piece": ""},
        "c0900": {"coord": "0900", "piece": ""},
        "c0901": {"coord": "0901", "piece": ""},
        "c0902": {"coord": "0902", "piece": ""},
        "c0903": {"coord": "0903", "piece": ""},
        "c0904": {"coord": "0904", "piece": ""},
        "c0905": {"coord": "0905", "piece": ""},
        "c0906": {"coord": "0906", "piece": ""},
        "c0907": {"coord": "0907", "piece": ""},
        "c0908": {"coord": "0908", "piece": ""},
        "c0909": {"coord": "0909", "piece": ""},
        "c0910": {"coord": "0910", "piece": ""},
        "c0911": {"coord": "0911", "piece": ""},
        "c0912": {"coord": "0912", "piece": ""},
        "c0913": {"coord": "0913", "piece": ""},
        "c0914": {"coord": "0914", "piece": ""},
        "c1000": {"coord": "1000", "piece": ""},
        "c1001": {"coord": "1001", "piece": ""},
        "c1002": {"coord": "1002", "piece": ""},
        "c1003": {"coord": "1003", "piece": ""},
        "c1004": {"coord": "1004", "piece": ""},
        "c1005": {"coord": "1005", "piece": ""},
        "c1006": {"coord": "1006", "piece": ""},
        "c1007": {"coord": "1007", "piece": ""},
        "c1008": {"coord": "1008", "piece": ""},
        "c1009": {"coord": "1009", "piece": ""},
        "c1010": {"coord": "1010", "piece": ""},
        "c1011": {"coord": "1011", "piece": ""},
        "c1012": {"coord": "1012", "piece": ""},
        "c1013": {"coord": "1013", "piece": ""},
        "c1014": {"coord": "1014", "piece": ""},
        "c1100": {"coord": "1100", "piece": ""},
        "c1101": {"coord": "1101", "piece": ""},
        "c1102": {"coord": "1102", "piece": ""},
        "c1103": {"coord": "1103", "piece": ""},
        "c1104": {"coord": "1104", "piece": ""},
        "c1105": {"coord": "1105", "piece": ""},
        "c1106": {"coord": "1106", "piece": ""},
        "c1107": {"coord": "1107", "piece": ""},
        "c1108": {"coord": "1108", "piece": ""},
        "c1109": {"coord": "1109", "piece": ""},
        "c1110": {"coord": "1110", "piece": ""},
        "c1111": {"coord": "1111", "piece": ""},
        "c1112": {"coord": "1112", "piece": ""},
        "c1113": {"coord": "1113", "piece": ""},
        "c1114": {"coord": "1114", "piece": ""},
        "c1200": {"coord": "1200", "piece": ""},
        "c1201": {"coord": "1201", "piece": ""},
        "c1202": {"coord": "1202", "piece": ""},
        "c1203": {"coord": "1203", "piece": ""},
        "c1204": {"coord": "1204", "piece": ""},
        "c1205": {"coord": "1205", "piece": ""},
        "c1206": {"coord": "1206", "piece": ""},
        "c1207": {"coord": "1207", "piece": ""},
        "c1208": {"coord": "1208", "piece": ""},
        "c1209": {"coord": "1209", "piece": ""},
        "c1210": {"coord": "1210", "piece": ""},
        "c1211": {"coord": "1211", "piece": ""},
        "c1212": {"coord": "1212", "piece": ""},
        "c1213": {"coord": "1213", "piece": ""},
        "c1214": {"coord": "1214", "piece": ""},
        "c1300": {"coord": "1300", "piece": ""},
        "c1301": {"coord": "1301", "piece": ""},
        "c1302": {"coord": "1302", "piece": ""},
        "c1303": {"coord": "1303", "piece": ""},
        "c1304": {"coord": "1304", "piece": ""},
        "c1305": {"coord": "1305", "piece": ""},
        "c1306": {"coord": "1306", "piece": ""},
        "c1307": {"coord": "1307", "piece": ""},
        "c1308": {"coord": "1308", "piece": ""},
        "c1309": {"coord": "1309", "piece": ""},
        "c1310": {"coord": "1310", "piece": ""},
        "c1311": {"coord": "1311", "piece": ""},
        "c1312": {"coord": "1312", "piece": ""},
        "c1313": {"coord": "1313", "piece": ""},
        "c1314": {"coord": "1314", "piece": ""},
        "c1400": {"coord": "1400", "piece": ""},
        "c1401": {"coord": "1401", "piece": ""},
        "c1402": {"coord": "1402", "piece": ""},
        "c1403": {"coord": "1403", "piece": ""},
        "c1404": {"coord": "1404", "piece": ""},
        "c1405": {"coord": "1405", "piece": ""},
        "c1406": {"coord": "1406", "piece": ""},
        "c1407": {"coord": "1407", "piece": ""},
        "c1408": {"coord": "1408", "piece": ""},
        "c1409": {"coord": "1409", "piece": ""},
        "c1410": {"coord": "1410", "piece": ""},
        "c1411": {"coord": "1411", "piece": ""},
        "c1412": {"coord": "1412", "piece": ""},
        "c1413": {"coord": "1413", "piece": ""},
        "c1414": {"coord": "1414", "piece": ""},
    }
    notation = context.get_current_parameters()['moves']
    if len(notation) > 0:
        moves = notation.split(',')
        for idx, move in enumerate(moves):
            board[f'c{move}']["piece"] = idx % 2
    return board


class Game(db.Model):
    __tablename__ = "games"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    player_one_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    player_two_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    winner_id = db.Column(db.Integer, nullable=True, default=None)
    moves = db.Column(db.String(12000), nullable=True, default="")
    board = db.Column(JSONB, nullable=True, default=default_board)
    turn = db.Column(db.Integer, default=0)

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

    def get_players(self):
        return (self.player_one_id, self.player_two_id)
