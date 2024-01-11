#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

/* Connection setup */
const char* ssid = "WIFI NAME";
const char* password = "WIFI PASSWORD";
const char* serverUrl = "http://domain-name:port/endpoint";

/* Sensor setup */
const int SENSOR1 = 4;
const int SENSOR2 = 5;
const int LED = 2;
uint8_t count = 0;
uint8_t prev_sent_count = 0;

void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("WiFi Connected");

  pinMode(SENSOR1, INPUT);
  pinMode(SENSOR2, INPUT);
  pinMode(LED, OUTPUT);
}

void sendDataToBackend(int count) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  String jsonData = "{\"sensorData\":{\"count\": " + String(count) + "}}";
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(httpResponseCode);
    Serial.println(response);
  } else {
    Serial.println("Error sending data to backend");
  }
  
  http.end();
}

// Going in
int checkSensor2(uint8_t *s1) {
  while (*s1 == HIGH) {
    *s1 = digitalRead(SENSOR1);
    uint8_t s2 = digitalRead(SENSOR2);
    if(s2 == HIGH) {
      return 1;
    }
  }
  return 0;
}

// Going out
int checkSensor1(uint8_t *s2) {
  while (*s2 == HIGH) {
    uint8_t s1 = digitalRead(SENSOR1);
    *s2 = digitalRead(SENSOR2);
    if(s1 == HIGH) {
      return 1;
    }
  }
  return 0;
}

void resetSensorRead(uint8_t *s1, uint8_t *s2) {
  *s1 = LOW;
  *s2 = LOW;
  delay(3000);
}

void loop() {
  uint8_t s1 = digitalRead(SENSOR1);
  uint8_t s2 = digitalRead(SENSOR2);
  
  if(count >= 5) { count = 1; }

  if (s1 == HIGH && s2 == LOW) {
    Serial.println("Motion detected on Sensor 1");
    if(checkSensor2(&s1) == 1) {
      count++;
      sendDataToBackend(count);
    }
    resetSensorRead(&s1, &s2);
  }

  if (s2 == HIGH && s1 == LOW) {
    Serial.println("Motion detected on Sensor 2");
    if(checkSensor1(&s2) == 1) {
      count--;
      sendDataToBackend(count);
    }
    resetSensorRead(&s1, &s2);
  }
  
  if(count > 0) {
    digitalWrite(LED, HIGH);
    Serial.println(count);
  } else {
    digitalWrite(LED, LOW);
  }

  delay(200);
}
