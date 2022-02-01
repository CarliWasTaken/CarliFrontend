import socket
import asyncio
import websockets

# init udp Socket
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
serverAddressPort = ("192.168.43.103", 20001)
bufferSize = 32

# tcp websocket
async def process_tcp_from_frontend(websocket, path):
    while True:
        # Receive data from the client
        obj = await websocket.recv()
        print('obj', str(obj))
        
        # Encode and send the data to the server
        sendBytes = str.encode(str(obj))
        UDPClientSocket.sendto(sendBytes, serverAddressPort)

async def main():
    async with websockets.serve(process_tcp_from_frontend, "127.0.0.1", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())







