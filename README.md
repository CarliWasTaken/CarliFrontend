# Carli Frontend
This provides a number of options for controlling the car:
- `joy-stick-controll.py` is a Python Controller for the car using the Joystick.
- Under `index.html` is a WASD controller [WIP]

# Carli Frontend | Car Controls

## Controller.js
In this case "controller" does not refer to anything but the input device for the car. Depending on the input type, the controller sends Data such as angle and throttle to either the `JoyStickController`  or `WASD_Controller` class.

## Class `WASD_Controller`
Handles keyboard input. When the W or S key is held down, the script will tell the car to either accelerate or drive backwards via a dedicated websocket. Same goes for the A and D keys, except those are used to steer left or right.

## Class `JoyStickController`
Handles joystick input. If the controller is connected, the script will listen for angle and throttle changes of the joystick. Leaning the joystick forwards for example will accelerate the car.

## Socket.io.js
Socket.io library.

## speedup.js
Calculates smooth movement. The longer the key/button/joystick is held down, the faster the car gets. If the key/button/stick is let go, it'll make sure that the car decelerates smoothly, preventing a sudden stop.
