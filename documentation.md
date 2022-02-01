# Documentation

## `tcp2udp.py`

Due to the lack off UDP support in JavaScript, we need a converter for the sake of time sensitive data tranfer.

This program opens a websocket connection to the car and sends the data received by the webbrowser over a socket-io connection

In order to work, it is needed to change the corresponding IPs


## `home-controll.py`

To check wheter the frontend works or not, it's needed to send testing data to the car and check if the car is moving or if there is a backend error. The car should move straight forward with the speed of 123. It's important to change the IP-Adress to the corresponding one used by the car.


## `joy-stick-controll.py`

This is the main file for the Joy-Stick. It is mainly used for testing and should be worked into the correct frontend files.

When the users pushes down the throttle button, the client will send the data in the following format:

```json
{
    'speed': [value],
    'steer': [value]    
}
```

The values are read from the joystick position.


## `index.html`

This is the landing page for a user. The user has all the controls over the car after connecting to it first. The `tcp2udp.py` most already be started to correctly send the data to the server! It is also possible to switch to AI mode, where the car drives itself.


## `index.css`

All styling tags are present for the `index.html` file


## `socket.io-1.2.0.js`

This is the [socket-io](https://socket.io/) file which is used for transmitting data to the `tcp2udp.py` file. This file is due to the lack of internet on the PC whilst connected to the car itself.