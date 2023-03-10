import RPi.GPIO as GPIO
import os
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
import Adafruit_DHT

import threading


from adafruit_ads1x15.analog_in import AnalogIn
from Firebase.firebase import firebaseReadChild,firebaseUpdateChild


# ********************************************************* Strawberry Backend ********************************************************* #

# *********************** for soil moisture *********************** #

# Define calibration constants
VOLTAGE_MIN = 0.0  # minimum voltage reading from sensor
VOLTAGE_MAX = 3.3  # maximum voltage reading from sensor
MOISTURE_MIN = 0   # moisture value corresponding to VOLTAGE_MIN
MOISTURE_MAX = 100 # moisture value corresponding to VOLTAGE_MAX

# Create the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Create the ADC object using the I2C bus
ads = ADS.ADS1115(i2c)

# ********************** Pin Configuration ********************** #

Moisture_1 = AnalogIn(ads, ADS.P0)  # A0
Moisture_2 = AnalogIn(ads, ADS.P1)  # A1
Humid = 4 							# GPIO4
Trigger = 17                    	# GPIO17
Echo = 27							# GPIO27
FloatSwitch = 23 					# GPIO23

# *********************** for humidity *********************** #
sensor = Adafruit_DHT.DHT22
# ********************** setup functions ********************** # 
def setup():
    
    GPIO.setwarnings(False) 
    if GPIO.getmode() == -1:
        GPIO.setmode(GPIO.BOARD)
    
    # Ultrasonic Sensor
    GPIO.setup(Trigger,GPIO.OUT)
    GPIO.setup(Echo,GPIO.IN)
    
    # Floatswitch
    GPIO.setup(FloatSwitch,GPIO.IN)

# ********************** functions ********************** #  

# Humidity / Temperature celcius
def Humidity():

    humidity, temperature = Adafruit_DHT.read_retry(sensor, Humid)

    if humidity is not None:
    
        temp = float('%.1f'%(temperature))
        return str('%.1f'%((((temp - 32) * 5 )/ 9)*0.1)) + "°C"

        
# soil moisture
def calcu_moisture(moisture_sensor):
    voltage = moisture_sensor.voltage

    # Convert the voltage to a moisture value using linear interpolation
    moisture = (voltage - VOLTAGE_MIN) * \
               (MOISTURE_MAX - MOISTURE_MIN) / \
               (VOLTAGE_MAX - VOLTAGE_MIN) + MOISTURE_MIN
    return round(float(moisture), 2) 

# water level

def UltrasonicSensor():
    try: 
        Arduino.flush()
        data = Arduino.readline().decode('utf-8').rstrip()
        time.sleep(0.4)
        return data
    except:
        return "Error Serial Communication"

def waterLevel():
    GPIO.output(Trigger, GPIO.LOW)
    GPIO.output(Trigger, GPIO.HIGH)
    
    time.sleep(0.00001)
    
    GPIO.output(Trigger, GPIO.LOW)

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
    
    #print(inches)
    print(GPIO.input(FloatSwitch))
    
# water pump

# ********************** loop function ********************** #
def loop():
    #print("Temperatyre: " + Humidity())
    print("M1: ",calcu_moisture(Moisture_1))
    #print("M2: ",calcu_moisture(Moisture_2))
    #print("Water Level: inch ", waterLevel())
    
    waterLevel()
    time.sleep(0.5)
   
    return loop()



setup()
loop()

