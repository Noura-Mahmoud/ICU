#include <SoftwareSerial.h>
#include "DHT.h"
#define DHTPIN 2     // what digital pin we're connected to
#define DHTTYPE DHT11   // DHT 11

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme;

DHT dht(DHTPIN, DHTTYPE);

int dataFromSlave;

char appData;
String inData = "";
void setup()
{
  Serial.begin(9600);
  Serial.println("DHT test!");
  //  if (!bme.begin(0x76)) {
  //    Serial.println("Could not find a valid BME280 sensor, check wiring!");
  //    while (1);
  //  }
  dht.begin();
  Serial.println("DHT began");
  pinMode(13, OUTPUT); // onboard LED
  pinMode(12, OUTPUT); // onboard LED
  digitalWrite(13, LOW); // switch OFF LED
  digitalWrite(12, LOW); // switch OFF LED

}

void loop()
{

  //  if (Serial.available() > 0)
  //  {
  //    Serial.println("data fron esp");
  dataFromSlave = Serial.read();
//  Serial.print("dataFromSlave = ");
//  Serial.println(dataFromSlave);
  //  }


  /////////////////// DHT ////////////////////////////////
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  //  String t = String(dht.readTemperature());


  //  Serial.println("DHT");
  //  Serial.print("temp = ");
  //  Serial.println(t);
  //  Serial.print("humidity = ");
  //  Serial.println(h);

  ////////////////// BME //////////////////////////////////////
  //  float temp  = bme.readTemperature();
  //  float pressure = bme.readPressure() / 100.0F ; // "hPa"

  //  Serial.write(int(h));
  //  Serial.println(int(t));
  //  Serial.println(t);
  Serial.write(int(t));
  //  delay(1000);
  Serial.write(int(h));
  //  Serial.println(h);

  //  Serial.println("state from ESP ");
  //  Serial.print(dataFromSlave);

  if (dataFromSlave == 1) {
    digitalWrite(13, LOW); // switch OFF LED
    digitalWrite(12, HIGH); // switch OFF LED
  }
  else if (dataFromSlave == 2) {
    digitalWrite(13, HIGH); // switch OFF LED
    digitalWrite(12, LOW); // switch OFF LED
  }
  else if (dataFromSlave == 0){
    digitalWrite(13, LOW); // switch OFF LED
    digitalWrite(12, LOW); // switch OFF LED
  }
  delay(1000);
  //  Serial.println(t);

  //  delay(10);
  //  Serial.println(int(h));
  //  delay(10);
  //  Serial.write(int(t));
  //  if (h > 15) {
  //    Serial.write("1");
  //    //    Serial.println("write one");
  //
  //    delay(100);
  //  }
  //  else {
  //    Serial.write("0");
  //    //    Serial.println("write zero");
  //
  //    delay(100);
  //  }

  //  Serial.println("BME");
  //  Serial.print("temp = ");
  //  Serial.println(temp);
  //  Serial.print("pressure = ");
  //  Serial.println(pressure);
  //
  //  Serial.println("DHT");
  //  Serial.print("temp = ");
  //  Serial.println(t);
  //  Serial.print("humidity = ");
  //  Serial.println(h);



  //  if (Serial.available()) {           // Read user input if available.
  //    delay(10);
  //  }
  //  if ( inData == "F") {
  //    Serial.println("LED OFF");
  //    digitalWrite(13, LOW); // switch OFF LED
  //    delay(500);
  //  }
  //  if ( inData == "N") {
  //    Serial.println("LED ON");
  //    digitalWrite(13, HIGH); // switch OFF LED
  //    delay(500);
  //    digitalWrite(13, LOW); // switch OFF LED
  //    delay(500);
  //  }
}
