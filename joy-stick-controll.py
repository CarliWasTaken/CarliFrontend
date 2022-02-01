import socket
import pygame

# init Socket
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
serverAddressPort = ("192.168.43.103", 20001)
bufferSize = 32

# init pygame
pygame.init()
done = False
clock = pygame.time.Clock()
pygame.joystick.init()
speed = False

while not done:
    # Iterate all user events
    for event in pygame.event.get():
        if event.type == pygame.JOYBUTTONDOWN:
            speed = True
        elif event.type == pygame.JOYBUTTONUP:
            speed = False

    # Get count of joysticks
    joystick_count = pygame.joystick.get_count()

    # Init every joystick
    for i in range(joystick_count):
        joystick = pygame.joystick.Joystick(i)
        joystick.init()

        variables = None

        # Checks if the throttle button is pressed
        if(speed):
            variables = {'speed': -1*round(joystick.get_axis(3),2), 'steer': round(joystick.get_axis(0),2)}
        else:
            variables = {'speed': 0, 'steer': round(joystick.get_axis(0),2)}
        # Print variables for debug
        print(variables)
        
        # Encode and send the data to the server
        sendBytes = str.encode(str(variables))
        UDPClientSocket.sendto(sendBytes, serverAddressPort)

    clock.tick(50)
pygame.quit()