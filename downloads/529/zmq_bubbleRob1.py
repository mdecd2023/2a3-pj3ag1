# pip install pyzmq cbor keyboard
from zmqRemoteApi import RemoteAPIClient
import keyboard
import random

client = RemoteAPIClient('2001:288:6004:17:2023:cda:1:3', 23000)

print('Program started')
sim = client.getObject('sim')
#sim.startSimulation()
print('Simulation started')

def setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):
    leftMotor = sim.getObject('/leftMotor4')
    rightMotor = sim.getObject('/rightMotor4')
    
    sim.setJointTargetVelocity(leftMotor, leftWheelVelocity)
    sim.setJointTargetVelocity(rightMotor, rightWheelVelocity)

'''
# Example usage 1:
setBubbleRobVelocity(1.0, 1.0)
time.sleep(2)
setBubbleRobVelocity(0.0, 0.0)
'''

while True:
    if keyboard.is_pressed('w'):
        setBubbleRobVelocity(4.0, 4.0)
    elif keyboard.is_pressed('s'):
        setBubbleRobVelocity(-3.0, -3.0)
    elif keyboard.is_pressed('a'):
        setBubbleRobVelocity(-2.0, 2.0)
    elif keyboard.is_pressed('d'):
        setBubbleRobVelocity(2.0, -2.0)
    elif keyboard.is_pressed('q'):
        # stop simulation
        sim.stopSimulation()
    else:
        setBubbleRobVelocity(0.0, 0.0)




