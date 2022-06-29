import pytest
import sys
import os
# sys.path.append((os.path.abspath('/home/bmvsi-107/Bitbucket/moistureandirrigationtrackingsystem')))
sys.path.append(os.getcwd())
from app import app, db
# from project.models import User



@pytest.fixture(scope='module')
def test_client():
    flask_app = app

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client  # this is where the testing happens!
