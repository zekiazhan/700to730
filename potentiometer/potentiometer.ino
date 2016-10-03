//#include "Timer.h"
/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Graphical representation is available using serial plotter (Tools > Serial Plotter menu) 
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

  This example code is in the public domain.
*/
//Timer t;
const int knobPin = A0;
const int ledCount = 10;    // the number of LEDs in the bar graph
int ledPins[] = {
  4,5,6,7,8,9,10,11,12,13
};   // an array of pin numbers to which LEDs are attached
int greenLEDNum = 6;
// the interval between frame and frame
int intervalPreframe = 100;

// the state is used for record the state of
// the LED display
// 0 : None
// 1 : Opening
// 2 : PartOne
// 3 : OOC
// 4 : PartTwo
// 5 : ending
int state = 0;

// Update every frame to record the position of knob (0-1023)
int sensorReading;

// time_t timer = 0;

// the setup routine runs once when you press reset:
void setup() {
  // loop over the pin array and set them all to output:
  for (int thisLed = 0; thisLed < ledCount; thisLed++) {
    pinMode(ledPins[thisLed], OUTPUT);
  }
 // t.pulse(pin, 10 * 60 * 1000, HIGH); // 10 minutes  
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  //Serial.begin(115200);
  randomSeed(analogRead(knobPin));
}

// the loop routine runs over and over again forever:
void loop() {
  // t.update();
  sensorReading = analogRead(knobPin);
  // read the input on analog pin 0:
  int sensorValueA = analogRead(A0);
  int sensorValueB = analogRead(A1);

  // output the signal to the serial
  OutputControlSignal(sensorValueA, sensorValueB);

  // Read the input signal
  ReadFromSerial();

  // set the LED 
  SetLED();
  
  delay(intervalPreframe);
}

void SetLED()
{
  switch(state)
  {
    case 1: // Opening
      SetToRed();
      break;
    case 2: // Part One
      ControlAmongGreen(sensorReading);
      break;
    case 3: //OOC
      SetRedRandom();
      break;
    case 4: // Part Two
      ControlAmongGreen(sensorReading);
      break;
    case 5: // Ending
      SetToRed();
      break;
    default:
      SetToRed();
      break;      
  };
}

void TurnOff()
{
 for (int thisLed = 0; thisLed < ledCount; thisLed++) {
       digitalWrite(ledPins[thisLed], LOW);
  }
}

int RedRandomTimer = 0;
int RedRandomSwitchTimeMax = 1000;
int RedRandomSwitchTimeMin = 50;
void SetRedRandom()
{
  RedRandomTimer -= intervalPreframe;
  if ( RedRandomTimer < 0 )
  {
    RedRandomTimer = random(RedRandomSwitchTimeMin,RedRandomSwitchTimeMax);
    
    for (int thisLed = 0 ; thisLed < greenLEDNum; thisLed++) {
           digitalWrite(ledPins[thisLed] , LOW);
    }
    for (int thisLed = greenLEDNum ; thisLed < ledCount; thisLed++) {
         int rand = random(2);
         if ( rand == 0 )
           digitalWrite(ledPins[thisLed] , LOW);
         else 
           digitalWrite(ledPins[thisLed] , HIGH);
    }
  }

}

void SetToRed()  // set to Red
{
  for (int thisLed = 0; thisLed < ledCount; thisLed++) {
     if ( thisLed < greenLEDNum )
       digitalWrite(ledPins[thisLed], LOW);
     else
       digitalWrite(ledPins[thisLed], HIGH);
        
  }
}

void ControlAmongGreen(int analogValue)
{
  int ledLevel = map(analogValue, 0, 1023, 0, greenLEDNum);
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

void ReadFromSerial()
{
  if ( Serial.available()) {
    char input = Serial.read();
    state = input - '0';
  }
}

void ControlAll(int analogValue){
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

void OutputControlSignal(int analogValue0, int analogValue1){
  // print out the value you read:
    String sensorConcat = String(analogValue0)+"/"+String(analogValue1);

//  String sensorConcat = String(sensorValueA)+"/"+String(sensorValueB)+"/"+String(sensorValueC);
  Serial.println(sensorConcat);
  
}

