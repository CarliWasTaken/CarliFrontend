import socket
import pygame

# init Socket
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
serverAddressPort = ("192.168.43.130", 20001)
bufferSize = 32

# init pygame
pygame.init()
done = False
clock = pygame.time.Clock()
pygame.joystick.init()
AI_MODE = False
while not done:
    joystick = pygame.joystick.Joystick(0)
    joystick.init()

    for b in range(joystick.get_numbuttons()):
        print(str(joystick.get_axis(0)))
        if joystick.get_button(b) == 1:
            print(f'Button {b}: {joystick.get_button(b)}')
    '''
    variables = None
    if joystick.get_button(1) == 1:
        AI_MODE = not AI_MODE
        print("here")
    if AI_MODE:
        # AI MODE
        variables = {'speed': 123, 'steer': 0}
    else:
        if joystick.get_button(0) == 1:
            speed = -1*round(joystick.get_axis(3),2)
    
            if speed < 0.15 and speed > -0.15:
                speed = 0

            variables = {'speed': speed, 'steer': round(joystick.get_axis(0),2)}
        else:
            variables = {'speed': 0, 'steer': round(joystick.get_axis(0),2)}

    print(variables)
    sendBytes = str.encode(str(variables))
    UDPClientSocket.sendto(sendBytes, serverAddressPort)
        '''

    clock.tick(50)
pygame.quit()