
const inputType = {
    JOYSTICK: 0,
    WASD: 1,
    CUSTOM: 2
};

class Controller{
    constructor(method=inputType.JOYSTICK){
        this.method = method;
        this.updateFunction;

        this.sendInterval = 1; // in ms


        if(this.method == inputType.JOYSTICK){
            let joyStickController = new JoyStickController();
            this.updateFunction = joyStickController.pollGamepads.bind(this);
        }

        if(this.method == inputType.WASD){
            // TODO
        }

        if(this.method == inputType.CUSTOM){
            this.updateFunction = () =>{
                // maybe TODO
            }
        }

        // poll gamepad object every 500ms
        this.interval = setInterval(this.updateFunction(this.sendData), this.update_interval);

    }

    sendData(angle, throttle){
        console.log('sending data:', angle, throttle);
    }
}

let controller = new Controller(inputType.JOYSTICK);