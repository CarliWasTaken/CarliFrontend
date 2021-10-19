
const inputType = {
    JOYSTICK: 0,
    WASD: 1,
    CUSTOM: 2
};

class Controller{
    constructor(method=inputType.JOYSTICK, ip){
        this.init(method);
        this.openSockets(ip);
    }

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

    openSockets(ip){
        this.socketMove = io(ip);
    }

    /**
     * method that sends angle and throttle over the sockets
     * @param {*} angle 
     * @param {*} throttle 
     */
    sendData(angle, throttle){
        console.log('sending data: angle=', angle, ', throttle=', throttle);

        this.socketMove.emit('steer', { data: Math.round(angle) });
        this.socketMove.emit('drive', { data: Math.round(throttle) });
    }
}

let controller = new Controller(inputType.WASD, 'http://192.168.43.103:5000/move');