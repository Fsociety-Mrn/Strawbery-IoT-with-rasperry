
#define Trig 2
#define Echo 3

void setup() {
  Serial.begin(9600);
  pinMode(Trig, OUTPUT);
  pinMode(Echo, INPUT);
}

void loop() {
  
  digitalWrite(Trig, LOW);
  delayMicroseconds(2);
  digitalWrite(Trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trig, LOW);

//  duration
  long duration = pulseIn(Echo, HIGH);

//return an inches
  int inches = duration / 74 / 2;
  
  Serial.println(inches);
}
