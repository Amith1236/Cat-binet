
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>


// WiFi credentials
const char* ssid = "WIFI ID";
const char* password = "WIFI Password";

// Firebase credentials
const char* FIREBASE_HOST = "URL"; 
const char* FIREBASE_API_KEY = "KEY";

Servo myServo;
const int SERVO_PIN = 16;

// Function to send HTTP GET request to Firebase
bool getCabinetLockStatus() {
    WiFiClientSecure client;
    client.setInsecure();  // Bypass SSL for Firebase REST API

    HTTPClient https;
    String url = String(FIREBASE_HOST) + "/cabinet_status/locked.json?auth=" + FIREBASE_API_KEY;
    
    Serial.print("Requesting URL: ");
    Serial.println(url);

    https.begin(client, url);
    int httpCode = https.GET();

    if (httpCode > 0) {
        String payload = https.getString();
        Serial.print("Firebase response: ");
        Serial.println(payload);
        
        return payload.indexOf("true") != -1;
    } else {
        Serial.print("Error in HTTP request: ");
        Serial.println(httpCode);
    }

    https.end();
    return false;  // Default to locked
}

void setup() {
    Serial.begin(115200);
    
    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("Connected!");

    // Attach servo
    myServo.attach(SERVO_PIN);
}

void loop() {
    // Fetch cabinet lock status from Firebase
    bool isLocked = getCabinetLockStatus();

    if (isLocked) {
        Serial.println("Cabinet is LOCKED");
        myServo.write(0);  // Locked position
    } else {
        Serial.println("Cabinet is UNLOCKED");
        myServo.write(80);  // Unlocked position
    }

    delay(5000);
}
