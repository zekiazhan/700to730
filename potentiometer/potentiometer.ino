//#include "Timer.h"
/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Graphical representation is available using serial plotter (Tools > Serial Plotter menu)
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

  This example code is in the public domain.
*/
//Timer t;
const int analogPin = A0;
const int ledCount = 10;    // the number of LEDs in the bar graph
int ledPins[] = {
  4,5,6,7,8,9,10,11,12,13
};   // an array of pin numbers to which LEDs are attached

// the setup routine runs once when you press reset:
void setup() {
  // loop over the pin array and set them all to output:
  for (int thisLed = 0; thisLed < ledCount; thisLed++) {
    pinMode(ledPins[thisLed], OUTPUT);
  }
 // t.pulse(pin, 10 * 60 * 1000, HIGH); // 10 minutes  
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  // t.update();
  int sensorReading = analogRead(analogPin);
  // read the input on analog pin 0:
  int sensorValueA = analogRead(A0);
  int sensorValueB = analogRead(A1);
//  int sensorValueC = analogRead(A2);
 LedController(sensorReading);
 SerialController(sensorValueA, sensorValueB);
  
}

void LedController(int analogValue){
  // map the result to a range from 0 to the number of LEDs:
  int ledLevel = map(analogValue, 0, 1023, 0, ledCount);
  // loop over the LED array:
  for (int thisLed = 0; thisLed < ledCount; thisLed++) {
    // if the array element's index is less than ledLevel,
    // turn the pin for this element on:
    if (thisLed < ledLevel) {
      digitalWrite(ledPins[thisLed], HIGH);
    }
    // turn off all pins higher than the ledLevel:
    else {
      digitalWrite(ledPins[thisLed], LOW);
    }
  }
}

void SerialController(int analogValue0, int analogValue1){
  // print out the value you read:
    String sensorConcat = String(analogValue0)+"/"+String(analogValue1);

//  String sensorConcat = String(sensorValueA)+"/"+String(sensorValueB)+"/"+String(sensorValueC);
  Serial.println(sensorConcat);
  delay(100);        // delay in between reads for stability
}

