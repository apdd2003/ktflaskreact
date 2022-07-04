import csv
from app import app, db
import random
from datetime import datetime
from models import LeafData, GrapeTypes
from sqlalchemy.exc import IntegrityError
from camerautils import getdata, get_thermal_image
import base64
import argparse

# import flask
from flask import render_template, redirect, send_file, url_for, flash, request, jsonify

# DATA_REQ = 0
dummy_db = {}
# db.create_all()
# from scrathpad import save_camera_image


def get_sensor_data():
    global dummy_db
    temp, camframe = getdata(0)
    # print(temp)
    dummy_db = {
        "TimeStamp": temp[3],
        "MinTemp": temp[0],
        "MaxTemp": temp[1],
        "AverageTemp": temp[2],
        "LightIntensity": random.randint(0,65535),
        "AmbientTemp": random.randint(0,45)
    }

    # save_camera_image(cframe)
    imgpath = get_thermal_image(camframe, dummy_db['MinTemp'], dummy_db['MaxTemp'])
    with open(imgpath, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    return dummy_db, encoded_string


def isFloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False


######################
@app.route('/download')
def download():
    with open(r'allmeasured.csv', 'w') as s_key:
        alldata = LeafData.query.all()  # Add columns to query as needed
        csv_out = csv.writer(s_key)
        csv_out.writerow([
            'Leaf_MinTemp', 'Leaf_MaxTemp', 'Leaf_AverageTemp', 'Grape Type',
            'Pressure'
        ])
        for data in alldata:

            csv_out.writerow([
                data.min_temp, data.max_temp, data.avg_temp,
                data.grape_type.grape_type if data.grape_type else "--",
                data.pressure
            ])
    csvfile = send_file('./allmeasured.csv',
                     mimetype='text/csv',
                     download_name='alldata.csv',
                     as_attachment=True)
    # print(csvfile.get_data(as_text=True))
    return csvfile
    # return send_file('./allmeasured.csv',
                    #  mimetype='text/csv',
                    #  download_name='alldata.csv',
                    #  as_attachment=True)
######################

##############################################
# New code here
@app.route('/add_grape_type', methods=['GET', 'POST'])
def add_grape_type():
    global DATA_REQ

    status_msg = ""
    if request.method == 'POST':
        new_grape_type = GrapeTypes(grape_type=request.form.get('grape_type'))
        db.session.add(new_grape_type)
        try:
            db.session.commit()
            status_msg = "successfully added"
        except IntegrityError:
            status_msg = "already exists in database"
            flash(f'{new_grape_type.grape_type} already exists in database',
                  'danger')
    if DATA_REQ:
        return {"status": status_msg}
    else:
        return redirect(url_for('home'))


###############################################

######################
@app.route('/take_measurements')
def take_measurements():   
    dummy_db, encoded_img = get_sensor_data()
    # print(dummy_db)
    # dummy_db_dict = {'MinTemp': dummy_db[0],
    #             'MaxTemp': dummy_db[1],
    #             'AverageTemp': dummy_db[2]}
    # historical_data = LeafData.query.all()
    # grapedata = GrapeType.query.all()
    # dummy_db['encoded_img'] = encoded_img
    data = {'dummy_db':(dummy_db), 'encoded_img':(encoded_img.decode('utf-8'))}
    # print(data)
    return data
#############


@app.route('/save_data', methods=['POST'])
def save_data():
    # global DATA_REQ
    
    new_db = dummy_db
    print(dummy_db['AmbientTemp'])
    # print(request.get_json(force=True)['data']['MinTemp'])
    # print(request.form.get('Pressure'))
    new_db['Pressure'] = request.form.get("pressure")
    new_db['GrapeType'] = request.form.get("grape_type")
    leaf_grape_type = GrapeTypes.query.filter_by(
        grape_type=new_db['GrapeType']).first()
    if len(new_db)==2:
        flash('Please take measurements again!', 'danger')
        if args.api:
            return {"error":"Please take measurements again"}
        else:
            return redirect(url_for('home'))
    elif not new_db['Pressure'] or not leaf_grape_type or new_db['GrapeType']=='99':
        flash('Grape type or Pressure can not be blank', 'danger')
        if args.api:
            return {"error":"Grape type or Pressure value is invalid"}
        else:
            return redirect(url_for('home'),400)
    elif not isFloat(new_db['Pressure']):
        flash('Pressure must be numeric value', 'danger')
        if args.api:
            return {"error":"Pressure must be numeric value"}
        else:
            return redirect(url_for('home'),400)

    else:
        new_db['Pressure'] = float(new_db['Pressure'])
        
    new_leaf_data = LeafData(time_stamp=datetime.utcnow(),
                             min_temp=new_db['MinTemp'],
                             max_temp=new_db['MaxTemp'],
                             avg_temp=new_db['AverageTemp'],
                             grape_type=leaf_grape_type,
                             pressure=float(new_db['Pressure']))


    db.session.add(new_leaf_data)
    db.session.commit()

    if args.api:
        return {"status": "successfully added",
                "data": new_db}
    else:
    # new_db = {}
        flash("Measurements saved in database", 'success')
        return redirect(url_for('home'))

@app.route('/history', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def home():
    global dummy_db
    # global DATA_REQ

    historical_data = LeafData.query .order_by(LeafData.id.desc())
    # grape_types=db.session.query(GrapeTypes).all()
    grape_types = GrapeTypes.query.all()
    # print(grape_types[0].grape_type)
    # print("histdata : ", historical_data)
    # print("\n grp data : ", grape_types)



    if args.api:

        page = request.args.get('page', 1, type=int)
        hstdata = {}
        grptype = {}
        for i in range(len(grape_types)):
            grptype[i] = {"grape_type" : grape_types[i].grape_type}
        hdata = historical_data.paginate(page=page, per_page=5)
        trec = len(historical_data.all())
        # print(hdata)
        recs = hdata.items
        # print(recs)
        for i in range(len(recs)):
            # print(f"i is: {i}")
            # print(recs[i])
            hstdata[i] = {"time_stamp" : recs[i].time_stamp,
                            "min_temp": recs[i].min_temp,
                            "max_temp": recs[i].max_temp,
                            "avg_temp": recs[i].avg_temp,
                            "grape_type": recs[i].grape_type.grape_type,
                            "pressure" : recs[i].pressure}
        return {"historical_data": hstdata,
                "grape_types": grptype,
                "page"  :hdata.page,
                "total records" : trec,
                "per page": 5,
                "total pages": hdata.pages
                }
    else:
        return render_template("home.html",
                            dummy_db=None,
                            historical_data=historical_data.all(),
                            grape_types=grape_types)

#############
#CLI code
#############

parser = argparse.ArgumentParser(description="Test Args", prog='main.py')
# parser.add_argument('integers', metavar='N', type=int,
#                     help='an integer for the accumulator')
parser.add_argument('--api', help="Run the code as API.", action='store_true')
parser.add_argument('--cov', help="Run the code as API.", action='store_true')
# parser.add_argument('api', required=False, type=str, default=None)
args = parser.parse_args()



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)