# pip install pyzmq cbor keyboard
from zmqRemoteApi import RemoteAPIClient
from zmqRemoteApi_IPv6 import RemoteAPIClient
import keyboard

client = RemoteAPIClient('192.168.56.1', 19997)

print('Program started')
sim = client.getObject('sim')

sim.startSimulation()
print('Simulation started')

def setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):
    leftMotor = sim.getObject('/leftMotor')
    rightMotor = sim.getObject('/rightMotor')
    sim.setJointTargetVelocity(leftMotor, leftWheelVelocity)
    sim.setJointTargetVelocity(rightMotor, rightWheelVelocity)
    
# use keyborad to move BubbleRob
while True:
    if keyboard.is_pressed('up'):
        setBubbleRobVelocity(1.0, 1.0)
    elif keyboard.is_pressed('down'):
        setBubbleRobVelocity(-1.0, -1.0)
    elif keyboard.is_pressed('left'):
        setBubbleRobVelocity(-1.0, 1.0)
    elif keyboard.is_pressed('right'):
        setBubbleRobVelocity(1.0, -1.0)
    elif keyboard.is_pressed('q'):
        # stop simulation
        sim.stopSimulation()
    else:
        setBubbleRobVelocity(0.0, 0.0)




