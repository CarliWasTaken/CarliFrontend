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

while not done:

    for event in pygame.event.get(): # User did something.
        if event.type == pygame.JOYBUTTONDOWN:
            print("Joystick button pressed.")
        elif event.type == pygame.JOYBUTTONUP:
            print("Joystick button released.")

    # Get count of joysticks.
    joystick_count = pygame.joystick.get_count()

    # For each joystick:
    for i in range(joystick_count):
        joystick = pygame.joystick.Joystick(i)
        joystick.init()

        variables = {'speed': round(joystick.get_axis(1)*-127), 'steer': round(joystick.get_axis(0)*127)}
        sendBytes = str.encode(str(variables))
        UDPClientSocket.sendto(sendBytes, serverAddressPort)

    clock.tick(60)
pygame.quit()