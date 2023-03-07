import RPi.GPIO as GPIO

from Firebase.firebase import firebaseReadChild,firebaseUpdateChild

import os
import time
import Adafruit_DHT
import threading
import Adafruit_ADS1x15

# ********************************************************* Strawberry Backend ********************************************************* #





# Initialize the ADS1115 ADC (change address to match your setup)
adc = Adafruit_ADS1x15.ADS1115(address=0x48)

# Choose a gain of 1 for reading voltages from 0 to 4.096V
GAIN = 1

# Define the analog input channel for the soil moisture sensor
moisture_channel = 0

# ********************** setup functions ********************** # 
def setup():
    GPIO.setwarnings(False) 
    GPIO.setmode(GPIO.BOARD)

# ********************** functions ********************** #  
def adc_to_voltage(adc_value):
    # The ADS1115 has 16-bit resolution, so there are 2^16 possible values
    # The voltage range for a gain of 1 is -4.096V to +4.096V, so each
    # bit represents 8/65536 = 0.00012207V
    voltage = adc_value * 0.00012207
    return voltage

# ********************** loop function ********************** #
def loop():
    
    # Read the ADC value from the soil moisture sensor
    moisture_adc = adc.read_adc(moisture_channel, gain=GAIN)
    # Convert the ADC reading to voltage
    moisture_voltage = adc_to_voltage(moisture_adc)
    # Print the moisture voltage
    print("Moisture voltage: {:.2f}V".format(moisture_voltage))
    # Wait for 1 second before taking another reading
    time.sleep(1)
    
    return loop()



setup()
loop()



