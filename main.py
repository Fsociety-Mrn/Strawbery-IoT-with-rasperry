import RPi.GPIO as GPIO

from Firebase.firebase import firebaseReadChild,firebaseUpdateChild
from Arduino.SerialCom import readTDS

import os
import time
import Adafruit_DHT
import threading


# ********************************************************* Hydroponics Backend ********************************************************* #
# Sensor should be set to Adafruit_DHT.DHT11,
# Adafruit_DHT.DHT22, or Adafruit_DHT.AM2302.

sensor = Adafruit_DHT.DHT22

# ********************** Pin Configuration ********************** #
LED = 12
Humid = 4
FloatSwitchh = 16

WaterPump = 11
OxyPump = 13
PeralPump = 15

pump = 36

# ********* Sonar Sensor
Trig = 38 # violet
Echo = 40 # green

# ********************** setup functions ********************** # 
def setup():
    GPIO.setwarnings(False) 
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(LED,GPIO.OUT) 
    GPIO.setup(FloatSwitchh,GPIO.IN)
    GPIO.setup(OxyPump,GPIO.OUT)
    GPIO.setup(WaterPump,GPIO.OUT)
    GPIO.setup(PeralPump,GPIO.OUT)
    
    GPIO.setup(pump,GPIO.OUT)
    
    GPIO.setup(Trig,GPIO.OUT)
    GPIO.setup(Echo,GPIO.IN)
# ********************** functions ********************** #  

# for humidty function
def Humidity():

    humidity, temperature = Adafruit_DHT.read_retry(sensor, Humid)

    if humidity is not None:
    
        temp = float('%.1f'%(temperature))
        firebaseUpdateChild("Humid","Humidity",str('%.1f'%((((temp - 32) * 5 )/ 9)*0.1)) + "°C")

    else:
        firebaseUpdateChild("Humid","Humidity","unable to read")

# for temperature function
        
# Led function
def Led():
    if (firebaseReadChild("LED","turnOn")):
        
        GPIO.output(LED,GPIO.HIGH)
    else:
        GPIO.output(LED,GPIO.LOW)  
    # print(firebaseReadChild("LED","turnOn"))

def waterLevel():
    GPIO.output(Trig, GPIO.LOW)
    GPIO.output(Trig, GPIO.HIGH)
    
    time.sleep(0.00001)
    
    GPIO.output(Trig, GPIO.LOW)

    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(Echo) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(Echo) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    pulse_duration = StopTime - StartTime
    
    cm = round(pulse_duration * 17150, 2)
    inches = int(cm / 2.54);
    percent = int(inches*100/8)
    percent = 100 - percent
    print(percent)
    if GPIO.input(FloatSwitchh):
        firebaseUpdateChild("waterLevel","level","100%")
    else:
        firebaseUpdateChild("waterLevel","level",str(percent) + "%")

def tdsLevel():

    firebaseUpdateChild("TDS","data", str(readTDS()))

def oxygenPump():
  
    GPIO.output(OxyPump,firebaseReadChild("oxyPump","data"))
    
def waterPump():

    GPIO.output(WaterPump,firebaseReadChild("waterPump","data"))
    
def peralPump():
    # 20L of tubig
    data = firebaseReadChild("peralPump","data")
    

    GPIO.output(PeralPump,data)
    
    if data == False:
        firebaseUpdateChild("waterPump","data",False)
        GPIO.output(WaterPump,GPIO.LOW)
        time.sleep(102)
        firebaseUpdateChild("peralPump","data",True)
        firebaseUpdateChild("waterPump","data",True)
        
    


# ********************** loop function ********************** #
def loop():
    
    #LED
    threading.Thread(target=Led, args=()).start()
    
    #Humidity convert to  Temperature
    threading.Thread(target=Humidity, args=()).start()

    #Oxygen Pump
    threading.Thread(target=oxygenPump, args=()).start()
    
    #Water Pump
    threading.Thread(target=waterPump, args=()).start()
    
    #Peraltalstic Pump
    threading.Thread(target=peralPump, args=()).start()
   
    #TDS
    threading.Thread(target=tdsLevel, args=()).start()
    
    #water level
    threading.Thread(target=waterLevel, args=()).start()
    
    
    

    return loop()



setup()
loop()
