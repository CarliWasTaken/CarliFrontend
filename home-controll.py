import socket
from turtle import back
import pygame

# init Socket
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
serverAddressPort = ("127.0.0.1", 20001)
bufferSize = 32

# init pygame
pygame.init()
done = False
clock = pygame.time.Clock()
while not done:
    variables = variables = {'speed': 123, 'steer': 0}
    print(variables)
    sendBytes = str.encode(str(variables))
    UDPClientSocket.sendto(sendBytes, serverAddressPort)

    clock.tick(50)
pygame.quit()