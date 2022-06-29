# from app import *
# from models import LeafData
from datetime import datetime
import numpy as np
from os.path import exists
from main import get_sensor_data
from camerautils import getdata, get_thermal_image

def test_get_sensor_data():
    """
    GIVEN a LeafData model
    WHEN a new leafdata is created
    THEN check the fields are defined correctly
    """
    test_data, encoded_img = get_sensor_data()
    file_exists = exists('static/images/output.jpg')
    #  dummy_db = {
    #     "TimeStamp": datetime.now(),
    #     "MinTemp": random.randint(20, 30),
    #     "MaxTemp": random.randint(33, 50),
    #     "AverageTemp": random.randint(30, 35),
    # }
    tstamp = datetime.strptime(test_data['TimeStamp'], '%m/%d/%Y %H:%M:%S.%f').date()
    assert tstamp == datetime.today().date()
    assert type(test_data['MinTemp']) == np.float64 or int
    assert type(test_data['MaxTemp']) == np.float64 or int
    assert type(test_data['AverageTemp']) == np.float64 or int
    assert file_exists == True

    