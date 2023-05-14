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
phLevel = AnalogIn(ads, ADS.P2)     # A2 
Humid = 4 							# GPIO4
Trigger = 17                    	# GPIO17
Echo = 27							# GPIO27
FloatSwitch = 23 					# GPIO23
WaterPump = 24                      # GPIO24
SprayPump = 25                      # GPIO25
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
    
    # WaterPump
    GPIO.setup(WaterPump,GPIO.OUT)
    
    # SprayPump
    GPIO.setup(SprayPump,GPIO.OUT)

# ********************** functions ********************** #  

# Humidity / Temperature celcius
def Humidity():

    humidity, temperature = Adafruit_DHT.read_retry(sensor, Humid)

    if humidity is not None:
    
        temp = float('%.1f'%(temperature))
        firebaseUpdateChild("Humidity","data",str('%.1f'%((((temp - 32) * 5 )/ 9)*0.1)) + "°C")
    else:
        firebaseUpdateChild("Humidity","data","unable to read")

        
# soil moisture
def calcu_moisture(Moisture_,moisture_sensor):
    voltage = moisture_sensor.voltage

    # Convert the voltage to a moisture value using linear interpolation
    moisture = (voltage - VOLTAGE_MIN) * (MOISTURE_MAX - MOISTURE_MIN) / (VOLTAGE_MAX - VOLTAGE_MIN) + MOISTURE_MIN
    
    percentage = int(moisture*100/68)
               
    firebaseUpdateChild(Moisture_,"data",str(100-percentage) + "%")



# water level
def waterLevel():
    # print(GPIO.input(FloatSwitch))
    if not GPIO.input(FloatSwitch):
        firebaseUpdateChild("waterLevel","data","100%")
    else:
        
        GPIO.output(Trigger, False)
        time.sleep(0.5)

        GPIO.output(Trigger, True)
        time.sleep(0.00001)
        GPIO.output(Trigger, False)

        pulse_start, pulse_end = 0, 0
        while GPIO.input(Echo) == 0:
            pulse_start = time.time()

        while GPIO.input(Echo) == 1:
            pulse_end = time.time()

        distance = (pulse_end - pulse_start) * 17150
        inches = round(distance / 2.54, 1)
        
        notFulltank = 9.8
        percent = int(inches*100/notFulltank)
        percent = 100 - percent
        # print(inches)
        firebaseUpdateChild("waterLevel","data",str(percent) + " %")
    
    
# water pump
def waterPump():
    GPIO.output(WaterPump,firebaseReadChild("waterPump","data"))

# ph level 
def phLevelSensor():
    voltage = phLevel.voltage
    pH = 7 - ((voltage - 3.05) / 0.18)
    print("pH level:", round(pH, 2))
    firebaseUpdateChild("phLevel","data",round(pH, 2))
    
def sprayPumpS():
    GPIO.output(SprayPump,firebaseReadChild("sprayPump","data"))

# ********************** loop function ********************** #
def loop():
    
    # Moisture 1
    calcu_moisture("Moisture 1",Moisture_1)
    
    # Moisture 2
    calcu_moisture("Moisture 2",Moisture_2)
    
    # ph level
    phLevelSensor()
    
    # water level
    threading.Thread(target=waterLevel, args=()).start()
    
    # water pump
    threading.Thread(target=waterPump, args=()).start()
    
    # spray pump
    threading.Thread(target=sprayPumpS, args=()).start()
    
    # Humidity
    threading.Thread(target=Humidity, args=()).start()
   
    return loop()



# setup()
# loop()

