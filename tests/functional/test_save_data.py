from app import app, db
# from main import *

def test_save_data():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/save_data' page is requested (POST) with 
    form data THEN check that the response is valid
    """
    # flask_app = app

    # Create a test client using the Flask application configured for testing
    with app.test_client() as test_client:
        response = test_client.post('/save_data', data={'pressure': 2.13, 'grape_type':'Merlot'})
        assert response.status_code == 302
        