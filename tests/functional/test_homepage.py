# import app
from app import app, db
# from main import *

def test_homepage():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    # flask_app = app

    # Create a test client using the Flask application configured for testing
    with app.test_client() as test_client:
        response = test_client.get('/')
        assert response.status_code == 200
        # assert b"Welcome to the" in response.data
        # assert b"Flask User Management Example!" in response.data
        # assert b"Need an account?" in response.data
        # assert b"Existing user?" in response.data

# def test_homepage_with_fixture(test_client):
#     """
#     GIVEN a Flask application configured for testing
#     WHEN the '/' page is requested (GET)
#     THEN check that the response is valid
#     """
#     response = test_client.get('/')
#     assert response.status_code == 200
