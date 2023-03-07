import RPi.GPIO as GPIO

from Firebase.firebase import firebaseReadChild,firebaseUpdateChild

import os
import time
import Adafruit_DHT
import threading


# ********************************************************* Strawberry Backend ********************************************************* #


# ********************** setup functions ********************** # 
def setup():
    GPIO.setwarnings(False) 
    GPIO.setmode(GPIO.BOARD)

# ********************** functions ********************** #  


# ********************** loop function ********************** #
def loop():
    
    print("testing...")

    return loop()



setup()
loop()
