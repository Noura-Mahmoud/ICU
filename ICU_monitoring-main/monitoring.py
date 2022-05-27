from asyncio.windows_events import NULL
from flask import Flask , request , Response
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask import jsonify
import numpy as np


# Create flask & cors instance 
app = Flask(__name__)
cors = CORS()
cors.init_app(app)

# Connect to database 
mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/patient_data")
db = mongodb_client.db

temp_reading  =np.ones(1000).tolist()
press_reading =np.ones(1000).tolist()

state=[]
state.append({"temp_state" :'ON', "pressure_state" :'OFF' })

@app.route("/state",methods=["POST"])
def save_state():
    status = request.get_json()
    temp_state =status ["temp"]
    pressure_state= status["pressure"] 

    state[0]={"temp_state" :temp_state , "pressure_state" : pressure_state }
    # print(state[0]["temp_state"])
    # print(state[0]["pressure_state"])
    return state[0]
    

@app.route('/patient_data',methods=['GET'])
def patient_data():
    ID = request.args.get('ID')
    reading = request.args.get('reading')

    print(reading)
    print(state[0])
    
    # response = jsonify(_id=ID,temp =db.vital_signs.find_one({"_id": ID})["temp"])
    if reading =="temp":
            response = jsonify(_id=ID,temp =db.vital_signs.find_one({"_id": ID})["temp"])
    
    if reading =="pressure":
            response = jsonify(_id=ID,pressure =db.vital_signs.find_one({"_id": ID})["pressure"])

    # if ((state[0]["temp_state"] == 'ON') and  (state[0]["pressure_state"] == 'OFF')):
            # response = jsonify(_id=ID,temp =db.vital_signs.find_one({"_id": ID})["temp"],pressure = np.zeros(1000).tolist())

    # if ((state[0]["temp_state"] == 'OFF') and  (state[0]["pressure_state"] == 'ON')):
            # response = jsonify(_id=ID,temp = np.zeros(1000).tolist(), pressure=db.vital_signs.find_one({"_id": ID})["pressure"])

    return response


@app.route("/recieve_data" , methods =["GET"])
def get_data():

       ID = request.args.get("ID")
       press_reading.append(int(request.args.get("hum")))
       temp_reading.append(int(request.args.get("temp")))

    #    Check if ID is existed or we will update 
       ID_exist = db.vital_signs.find_one({"_id": ID})

       if (ID_exist) :
            newvalues = { "$set": {"_id": ID, "temp": temp_reading, "pressure": press_reading} }
            db.vital_signs.update_one({"_id": ID}, newvalues)

       else:
            db.vital_signs.insert_one({ "_id": ID, "temp": temp_reading, "pressure": press_reading})

       return jsonify("UPTodate_data")


@app.route("/leds",methods=["GET"])
def send_state():

    if state[0]["temp"] == 'ON':
        return ('1')
    if state[0]["pressure"] == 'ON':
        return ('2')
    # temp_state =status ["temp"]
    # pressure_state= status["hum"] 

    # state[0]={"temp_state" :temp_state , "pressure_state" : pressure_state }
    # print(state[0]["temp_state"])
    # print(state[0]["pressure_state"])
    # return state[0]



if __name__ == "__main__":
    app.run(host='0.0.0.0', port= 8090,debug=True)
