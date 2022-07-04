from app import db
from datetime import datetime
# from sqlalchemy.orm import relationship


class LeafData(db.Model):
    __tablename__ = "leafdata4"
    id = db.Column(db.Integer, primary_key=True)
    time_stamp = db.Column(db.DateTime, default=datetime.utcnow)
    min_temp = db.Column(db.Float)
    max_temp = db.Column(db.Float)
    avg_temp = db.Column(db.Float)
    grape_type3id = db.Column(db.Integer, db.ForeignKey("grape_type3.id",ondelete="CASCADE"))
    # grape_type = db.Column(db.String(100), nullable=False)

    pressure = db.Column(db.Float)


# db.Model.metadata.reflect(db.engine)


class GrapeTypes(db.Model):
    __tablename__ = "grape_type3"
    id = db.Column(db.Integer, primary_key=True)
    grape_type = db.Column(db.String(100), nullable=False, unique=True)
    leavesdata = db.relationship("LeafData",
                                 backref="grape_type",
                                 lazy='dynamic')
