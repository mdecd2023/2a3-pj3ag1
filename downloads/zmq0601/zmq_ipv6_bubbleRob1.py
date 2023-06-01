# pip install pyzmq cbor
from zmqRemoteApi import RemoteAPIClient
from zmqRemoteApi_IPv6 import RemoteAPIClient
import keyboard
import sim
import time
import simConst
import math

print('Program started')
sim.simxFinish(-1) # just in case, close all opened connections
clientID=sim.simxStart('2001:288:6004:17:2023:cda:1:1',23000)
sim.simxStartSimulation(clientID, sim.simx_opmode_oneshot_wait)

if clientID!=-1:
    print('Connected to remote API server')
else:
    print('Failed connecting to remote API server')

print('Simulation started')

errorCode, leftMotor = sim.simxGetObjectHandle(clientID, 'leftMotor3', sim.simx_opmode_oneshot_wait)
errorCode, rightMotor = sim.simxGetObjectHandle(clientID, 'rightMotor3', sim.simx_opmode_oneshot_wait)

def setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):
    errorCode, leftMotor = sim.simxGetObjectHandle(clientID, '/leftMotor3', sim.simx_opmode_oneshot_wait)
    errorCode, rightMotor = sim.simxGetObjectHandle(clientID, '/rightMotor3',sim.simx_opmode_oneshot_wait)
    sim.simxSetJointTargetVelocity(clientID, leftMotor, leftWheelVelocity, simConst.simx_opmode_streaming)
    sim.simxSetJointTargetVelocity(clientID, rightMotor, rightWheelVelocity, simConst.simx_opmode_streaming)
    
def setBubbleRobangle(angle):
    angle = [-90*math.pi/180, angle*math.pi/180, 0*math.pi/180]
    errorCode,leftMotor = sim.simxGetObjectHandle(clientID,'/leftMotor3',sim.simx_opmode_oneshot_wait)
    errorCode,rightMotor = sim.simxGetObjectHandle(clientID,'/rightMotor3',sim.simx_opmode_oneshot_wait)
    sim.simxSetObjectOrientation(clientID,leftMotor,-1, angle,sim.simx_opmode_oneshot)
    sim.simxSetObjectOrientation(clientID,rightMotor,-1, angle,sim.simx_opmode_oneshot)

'''
# Example usage 1:
setBubbleRobVelocity(1.0, 1.0)
time.sleep(2)
setBubbleRobVelocity(0.0, 0.0)
'''
# use keyborad to move BubbleRob

while True:
    if keyboard.is_pressed('w'):
        setBubbleRobVelocity(2.0, 2.0)
        if keyboard.is_pressed('a'):
            setBubbleRobangle(-40)
        elif keyboard.is_pressed('d'):
            setBubbleRobangle(40)
        else:
            setBubbleRobangle(0)
    elif keyboard.is_pressed('s'):
        setBubbleRobVelocity(-2.0, -2.0)
        if keyboard.is_pressed('a'):
            setBubbleRobangle(-40)
        elif keyboard.is_pressed('d'):
            setBubbleRobangle(40)
        else:
            setBubbleRobangle(0)
    elif keyboard.is_pressed('a'):
        setBubbleRobVelocity(-2.0, 2.0)
    elif keyboard.is_pressed('d'):
        setBubbleRobVelocity(2.0, -2.0)
    elif keyboard.is_pressed('q'):
        # stop simulation
        sim.stopSimulation()
    else:
        setBubbleRobVelocity(0.0, 0.0)


