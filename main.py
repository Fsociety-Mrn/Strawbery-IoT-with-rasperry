import RPi.GPIO as GPIO

from Firebase.firebase import firebaseReadChild,firebaseUpdateChild

import os
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
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

Moisture_1 = AnalogIn(ads, ADS.P0)
Moisture_2 = AnalogIn(ads, ADS.P1)

# ********************** setup functions ********************** # 
def setup():
    
    # Create single-ended input on channel 0
    chan = AnalogIn(ads, ADS.P0)
    
    GPIO.setwarnings(False) 
    GPIO.setmode(GPIO.BOARD)
    


# ********************** functions ********************** #  

def calcu_moisture(moisture_sensor):
    voltage = moisture_sensor.voltage

    # Convert the voltage to a moisture value using linear interpolation
    moisture = (voltage - VOLTAGE_MIN) * \
               (MOISTURE_MAX - MOISTURE_MIN) / \
               (VOLTAGE_MAX - VOLTAGE_MIN) + MOISTURE_MIN
    return float(moisture)


# ********************** loop function ********************** #
def loop():
    
    print("M1: ",calcu_moisture(Moisture_1))
    print("M2: ",calcu_moisture(Moisture_2))
    return loop()



setup()
loop()



