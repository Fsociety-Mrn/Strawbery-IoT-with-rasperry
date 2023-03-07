import RPi.GPIO as GPIO

from Firebase.firebase import firebaseReadChild,firebaseUpdateChild


import os
import time
import threading


# ********************************************************* Strawberry Backend ********************************************************* #


# ********************** Pin Configuration ********************** #


# ********************** setup functions ********************** # 
def setup():
    GPIO.setwarnings(False) 
    GPIO.setmode(GPIO.BOARD)

# ********************** functions ********************** #  


# ********************** loop function ********************** #
def loop():
    
    print("testing....")
    return loop()



setup()
loop()
