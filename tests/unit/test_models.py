from app import *
from models import LeafData, GrapeTypes
from datetime import datetime
def test_new_leaf_data():
    """
    GIVEN a LeafData model
    WHEN a new leafdata is created
    THEN check the fields are defined correctly
    """
    demo_time_stammp = datetime(2017, 11, 28, 23, 55, 59, 342380) 
    grpobj = GrapeTypes(grape_type='Merlot')
    leafdata = LeafData(time_stamp=demo_time_stammp,
                             min_temp=0.0,
                             max_temp=100.0,
                             avg_temp=49.5,
                             grape_type=grpobj,
                             pressure=2.5)
    
    # leafdata = LeafData(demo_time_stammp, 0.0,100.0,49.5, "grapetypedemo", 2.5)
    assert leafdata.time_stamp == demo_time_stammp
    assert leafdata.min_temp== 0.0
    assert leafdata.max_temp==100.0
    assert leafdata.avg_temp==49.5
    assert leafdata.grape_type.grape_type== grpobj.grape_type
    assert leafdata.pressure==2.5