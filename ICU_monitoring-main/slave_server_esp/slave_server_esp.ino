#include <Arduino.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Arduino_JSON.h>
#include <WiFiClient.h>


const char * username = "Mikasa";
const char * password = "mnnymnny";
//const char* username = "STUDBME2";
//const char* password = "BME2Stud";
//ESP8266WiFiMulti WiFiMulti;
int wifiCount;
String state;

WiFiClient client;
HTTPClient http;

void setup() {

  Serial.begin(9600);

  WiFi.begin(username, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    wifiCount++;
    if (wifiCount == 20) {
      wifiCount = 0;

    }
    Serial.print(".");
  }
  Serial.println("WiFi connected");

}

// habd function
//String httpGETRequest(const char* urlString){
String httpGETRequest(String urlString) {
  //  WiFiClient client;
  //  HTTPClient http;

  // Your IP address with path or Domain name with URL path
  http.begin(client, urlString);

  // Send HTTP POST request
  int httpResponseCode = http.GET();
//  Serial.println("fn ");
  String payload = "{}";

  if (httpResponseCode > 0) {
//    Serial.print("HTTP Response code: ");
//    Serial.println(httpResponseCode);
    payload = http.getString();
    //    Serial.print("payload: ");
    //    Serial.println(payload);
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}


void loop() {
 
  //  int t = Serial.read();
  int t = Serial.read();
//  Serial.print("t = ");
//  Serial.println(t);
  //  delay(1000);
  int h = Serial.read();
//  Serial.print("h = ");
//  Serial.println(h);
  delay(1000);

  if (WiFi.status() == WL_CONNECTED) {

    //    String urlString = "http://127.28.133.54:8090/recieve_data?ID=" + String(1) + "&temp=" + String(t) + "&hum=" String(h) + "&";
    String urlString = "http://192.168.43.240:8090/recieve_data?ID=" + String(1) + "&temp=" + String(t) + "&hum=" + String(h) ;
    //    String urlString = "http://192.168.43.140:8090/recieve_data?ID=" + String(1) + "&temp=" + String(5) + "&hum=" + String(4) ;
    //    String urlString = "http://192.168.43.140:8090/recieve_data?ID=" + String(1);

    http.begin(client, urlString.c_str());
    // Your Domain name with URL path or IP address with path
    int httpResponseCode = http.GET();
    //    Serial.print("httpResponseCode_sensors = ");
    //    Serial.println(httpResponseCode);

    String payload = http.getString();
    //    Serial.println(payload);
    // Free resources
    http.end();




    String response;
    //    String responseArr[2];
    String responseArr[1];
    //
    //    //    leds_url = "http://127.28.133.54:8090/leds";
    String leds_url = "http://192.168.43.240:8090/leds";
    //
    response = httpGETRequest(leds_url);
//    Serial.print("httpResponseCode_leds = ");
//    Serial.println(response);

    JSONVar myObject = JSON.parse(response);

    // JSON.typeof(jsonVar) can be used to get the type of the var
    if (JSON.typeof(myObject) == "undefined") {
      Serial.println("Parsing input failed!");
      return;
    }


//    Serial.print("JSON object = ");
//    Serial.println(myObject);

//    Serial.print("which led = ");
//    Serial.println(myObject);

//    state = myObject[0];
    state = myObject;
    if (state == "1")
    {
      Serial.write(1);
    }
    else if (state == "2")
    {
      Serial.write(2);
    }
    
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
  //    Serial.print("dataFromMaster = ");
  //    Serial.println(dataFromMaster);
  //  Serial.println("from sensors ");
  //  Serial.print("t = ");
  //  Serial.println(t);
  //  Serial.print("h = ");
  //  Serial.println(h);

  //  Serial.write(1);
  //  Serial.write(int(state));

  delay(1000);
}
