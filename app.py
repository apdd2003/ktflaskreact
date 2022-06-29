from flask import Flask
import os

from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from flask_migrate import Migrate
from flask_moment import Moment

app = Flask(__name__)

load_dotenv()

app.config['SECRET_KEY'] = os.getenv("SECRET_KEY",'randomkey7557')

# CONNECT TO DB
uri = os.getenv("DATABASE_URL", "sqlite:///agri.db")  # or other relevant config var
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

moment = Moment(app)


Base = automap_base()
db = SQLAlchemy(app)

# Base.prepare(db.engine, reflect=True)
# GrapeTypes = Base.classes.grape_type
# db.session = 

from models import LeafData, GrapeTypes
migrate = Migrate(app, db)
