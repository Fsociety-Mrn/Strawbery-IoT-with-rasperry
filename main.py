import RPi.GPIO as GPIO

from Firebase.firebase import firebaseReadChild,firebaseUpdateChild

import os
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
import Adafruit_DHT

from adafruit_ads1x15.analog_in import AnalogIn

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

Moisture_1 = AnalogIn(ads, ADS.P0) # A0
Moisture_2 = AnalogIn(ads, ADS.P1) # A1
Humid = 4

# *********************** for humidity *********************** #
sensor = Adafruit_DHT.DHT22

# ********************** setup functions ********************** # 
def setup():
    
    GPIO.setwarnings(False) 
    if GPIO.getmode() == -1:
        GPIO.setmode(GPIO.BOARD)
    

# ********************** functions ********************** #  

# Humidity / Temperature celcius
def Humidity():

    humidity, temperature = Adafruit_DHT.read_retry(sensor, Humid)

    if humidity is not None:
    
        temp = float('%.1f'%(temperature))
        return str('%.1f'%((((temp - 32) * 5 )/ 9)*0.1)) + "°C"
    #     firebaseUpdateChild("Humid","Humidity",str('%.1f'%((((temp - 32) * 5 )/ 9)*0.1)) + "°C")

    # else:
    #     firebaseUpdateChild("Humid","Humidity","unable to read")
        
# soil moisture
def calcu_moisture(moisture_sensor):
    voltage = moisture_sensor.voltage

    # Convert the voltage to a moisture value using linear interpolation
    moisture = (voltage - VOLTAGE_MIN) * \
               (MOISTURE_MAX - MOISTURE_MIN) / \
               (VOLTAGE_MAX - VOLTAGE_MIN) + MOISTURE_MIN
    return round(float(moisture), 2) 

# water level 
# water pump

# ********************** loop function ********************** #
def loop():
    print("Temperatyre: " + Humidity())
    print("M1: ",calcu_moisture(Moisture_1))
    print("M2: ",calcu_moisture(Moisture_2))
    time.sleep(1)
    return loop()



setup()
loop()
