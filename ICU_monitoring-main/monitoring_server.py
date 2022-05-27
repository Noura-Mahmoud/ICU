from flask import Flask , request
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask import jsonify
import numpy as np
import queue


# Create flask & cors instance 
app = Flask(__name__)
cors = CORS()
cors.init_app(app)

# Connect to database 
mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/patient_data")
db = mongodb_client.db

# Declare readings queue
temp_readings = queue.Queue(maxsize=50)
press_readings = queue.Queue(maxsize=50)

# Initialize viewing_state
state=[]
state.append({"temp_state" :'ON', "pressure_state" :'OFF' })

# Upadating state  of sensors
@app.route("/state",methods=["POST"])
def save_state():
    status = request.get_json()
    temp_state =status ["temp"]
    pressure_state= status["pressure"] 
    state[0]={"temp_state" :temp_state , "pressure_state" : pressure_state }
    return state[0]
    
# Send sensors'data required 
@app.route('/patient_data',methods=['GET'])
def patient_data():
    ID = request.args.get('ID')
    reading = request.args.get('reading')
    
    if reading =="temp":
        if state[0]["temp_state"] == "ON":
            response = jsonify(_id=ID,temp =db.vital_signs.find_one({"_id": ID})["temp"])
        else:
            response = jsonify(_id=ID,temp =np.zeros(50).tolist())
    
    if reading =="pressure":
             if state[0]["pressure_state"] == "ON":
                     response = jsonify(_id=ID,pressure =db.vital_signs.find_one({"_id": ID})["pressure"]) 
             else:
                    response = jsonify(_id=ID,pressure =np.zeros(50).tolist())


    return response

#  Get sensors' data
@app.route("/recieve_data" , methods =["GET"])
def get_data():

       ID = request.args.get("ID")
       if temp_readings.full():
           temp_readings.get()
       temp_readings.put(int(request.args.get("temp")))
        
       if press_readings.full():
           press_readings.get()
       press_readings.put(int(request.args.get("hum")))
       
    #    Check if ID is existed or we will update 
       ID_exist = db.vital_signs.find_one({"_id": ID})

       if (ID_exist) :
            newvalues = { "$set": {"_id": ID, "temp": list(temp_readings.queue), "pressure": list(press_readings.queue)} }
            db.vital_signs.update_one({"_id": ID}, newvalues)

       else:
            db.vital_signs.insert_one({ "_id": ID, "temp": list(temp_readings.queue), "pressure": list(press_readings.queue)})

       print (" temp = " , request.args.get("temp") )
       print (" hum = " , request.args.get("hum") )
       
       return jsonify("data_recieved")
   
   
@app.route("/leds",methods=["GET"])
def send_state():

    active = '0'
    # if state[0]["temp_state"] == 'ON':
    #     active='1'
    # if state[0]["pressure_state"] == 'ON':
    #     active='2'
        
        
    if state[0]["temp_state"] == 'OFF':
        active = '1'
    elif state[0]["pressure_state"] == 'OFF':
        active = '2'
    else :
        active = '0'
        
    print("active =========  ",active)
    return jsonify (active)
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port= 8090,debug=True)
