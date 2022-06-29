import time
import numpy as np
from datetime import datetime
try:
    import busio, board
    import adafruit_mlx90640
except ImportError:
    pass
import cv2
import os



CURRENT_TIME = datetime.now()
CTIME_STAMP = CURRENT_TIME.strftime("%m/%d/%Y %H:%M:%S.%f")

final_list = []
cframe = []
frame_count = 0
frame = np.zeros((32*24,))
mlx = None

def setup_camera():
    global mlx
    try:
        i2c = busio.I2C(board.SCL, board.SDA, frequency = 400000)
        mlx = adafruit_mlx90640.MLX90640(i2c)
        if mlx == None:
            raise ValueError
        mlx.refresh_rate = adafruit_mlx90640.RefreshRate.REFRESH_8_HZ
        return True
        
    except ValueError as e:
        return False
    except:
        return False

def getdata(frame_count2):
    global final_list
    global CTIME_STAMP
    global frame_count
    frame_count = frame_count2

    camset = setup_camera() 
    if not camset:
        time.sleep(5.0)
        # np.randint(1,6).astype(np.float64)
        dummy_db = {
        # "TimeStamp": datetime.now(),
        "MinTemp": np.random.randint(22,30),
        "MaxTemp": np.random.randint(33,55),
        "AverageTemp": np.random.randint(30,35),
        "LightIntensity": np.random.randint(0,65535),
        "AmbientTemp": np.random.randint(0,45)
        }
        cframe = np.random.randint(dummy_db['MinTemp'], dummy_db['MaxTemp'], size=(24,32))
        return [dummy_db['MinTemp'], dummy_db['MaxTemp'], dummy_db['AverageTemp'], CTIME_STAMP], cframe
    else:
    
            
        
        final_list = []
        
        min_list = []
        max_list = []
        avg_list = []
        
        fc, camframe = getframe(frame_count)
        if fc == 20:
            for i in range(5):
                min_list.append(final_list[i][0])
                max_list.append(final_list[i][1])
                avg_list.append(final_list[i][2])

            tstamp = CTIME_STAMP
            min_avg = np.round(np.mean(np.array(min_list)), 1)
            max_avg = np.round(np.mean(np.array(max_list)), 1)
            avg = np.round(np.mean(np.array(avg_list)), 1)
            return [min_avg, max_avg, avg, tstamp] , camframe
    
    
def get_thermal_image(camframe, mintemp, maxtemp):
    
    image2 = None
    # rescaled to unit8
    camframe = np.uint8((camframe - mintemp)*255/(maxtemp - mintemp))
    # camframe= np.uint8(camframe)
    # camframe = np.array(camframe, np.uint8)

    image2 = cv2.applyColorMap(camframe, cv2.COLORMAP_JET)
    image2 = cv2.resize(image2, (600, 800), interpolation=cv2.INTER_CUBIC)

    # image2 = cv2.flip(image2, 1)

    # cv2.namedWindow('Thermal Image', cv2.WINDOW_NORMAL)
    # cv2.resizeWindow('Thermal Image', 160 ,120)
    # cv2.imshow('Thermal Image', image2)
    savepath = os.path.join('./static/images/' , 'output.jpg')
    cv2.imwrite(savepath, image2)
    return savepath


def getframe(frame_count):

    global CURRENT_TIME
    global CTIME_STAMP
    global final_list
    global cframe
    global mlx

    while True:
        try:
            
            frame_count += 1
            temp = []
            c_frame = []
            
            mlx.getFrame(frame)
            # print(f"Get frame:{frame}")

            #reshaping frame(1D array) to 2D array(re_frame)
            twoD_frame = frame.reshape(24,32)
            twoD_frame = np.round(np.array(twoD_frame), 1)
            re_frame = frame

            # rounding off temperature values of all pixels in the frame to .1f float format
            re_frame = np.round(re_frame,1)

            # add all temp readings to c_frame
            for val in range(768):
                c_frame.append(re_frame[val])

            # converting c_frame list into c_array (Numpy array)
            c_array = np.array(c_frame)    
                   

            #Getting required values from current frame temperature readings
            min_temp = np.min(c_array)
            max_temp = np.max(c_array)
            mean_temp = np.round(np.mean(c_array),1)

            
            temp.append(min_temp)
            temp.append(max_temp)
            temp.append(mean_temp)
            # temp.append(CTIME_STAMP)
            
            list_d = temp

            #Database data insert operation
            
            #subprocess.call(['python3','sqlite3_data_insert.py'])

            # Calling function to insert current frame data into database

            CURRENT_TIME = datetime.now()
            CTIME_STAMP = CURRENT_TIME.strftime("%m/%d/%Y %H:%M:%S.%f")
            
            final_list.append(temp)
            # final_list.append(list_d)
            
        
            if frame_count>=20:
                cframe.append(c_frame)
                return frame_count, twoD_frame
        except ValueError:
            continue