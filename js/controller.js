
const inputType = {
    JOYSTICK: 0,
    WASD: 1,
    CUSTOM: 2
};

class Controller{
    /**
     * 
     * @param {*} method The InputType {joystick, wasd}
     * @param {*} ip Carli's IP address 
     */
    constructor(method=inputType.JOYSTICK, ip){
        this.ip = ip;
        this.openSockets();
        this.init(method);
    }

    /**
     * @param {*} method the input type {joystick, wasd}
     */
    init(method){
        console.log('init controller');


        this.method = method;
        this.updateFunction;

        this.sendInterval = 1; // in ms


        // -- check for input type --
        
        // joystick
        if(this.method == inputType.JOYSTICK){
            let joyStickController = new JoyStickController();

            this.updateFunction = () =>{
                joyStickController.pollGamepads(this.sendData.bind(this));
            };

            // call the update-function every ... ms
            this.interval = setInterval(this.updateFunction, this.sendInterval);
        }

        // WASD
        if(this.method == inputType.WASD){
            let wasdController = new WASD_Controller(this.sendData.bind(this));
        }

        // other
        if(this.method == inputType.CUSTOM){
            this.updateFunction = () =>{
                // maybe TODO
            }
        }
    }

    openSockets(){
        this.websocket = new WebSocket(this.ip);
    }

    /**
     * method that sends angle and throttle over the sockets
     * @param {*} angle 
     * @param {*} throttle 
     */
    sendData(angle, throttle){
        console.log('sending data: angle=', angle, ', throttle=', throttle);

        this.websocket.send(JSON.stringify({'speed': Math.round(throttle*100)/100, 'steer': Math.round(angle*100)/100}));
    }
}

let controller = new Controller(inputType.WASD, 'ws://localhost:8765');