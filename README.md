# ICU_monitoring

# IOT Task_4

## Team members
| Name  | Section| BN |
| ------------- | ------------- |------------- |
|Dalia Lotfy| 01| 30|
|Marwa AbdelAal| 02| 23|
|Nada Ezzat |02 |38  |
|Noura Mahmoud |02 |39|


### Connect the two bluetooth modules as a master and a slave using this [link](https://www.youtube.com/watch?v=hyME1osgr7s.md)

For the *Arduino* circuit there is a *DHT* (temperature and humedity sensor on *pin 2*, in addition to two LEDs on *pin 12, 13* indicating the turned off readings

### Create database using MongoDB

#### Download MongDB 
[From here](https://www.mongodb.com/try/download/community)

#### Use MongoDB Shell (mongosh)   in Compass or use terminal with next commands 

```
mongo
use patient_data( yourDB_name)
db.vital_signs(your collection_name).insertOne({ "_id": "1", "temp": ["47, 46, 48, 39"], "pressure":  ["47, 46, 48, 39"] });
```

## In *ICU_monitoring-main* folder for back-end


### Get your own IP address by using cmd of your device and type 
```
ipconfig
```

then make sure to change the existing IP in 'slave_server_esp.ino' in folder (ICU_monitoring-main/slave_server_esp/)

- Make sure to change IP adress and SSID & password in the arduino code first

#### Run Server 
```
python monitoring_server.py
```
## In *ICU_Visualization-master* folder for front-end
install components
```
npm install
npm start
```
