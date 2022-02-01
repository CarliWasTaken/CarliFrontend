
class WASD_Controller{

    // minimum values
    static min_speed = -1.0;
    static min_direction = -1.0;

    // maximum values
    static max_speed = 1.0;
    static max_direction = 1.0;

    // speed slider
    static slider_speed = null;

    

    /**
     * @param {*} sendDataFunction the function which should be called after every change in direction/speed 
     *      (sending these values via the websocket)
     */
    constructor(sendDataFunction){    
        this.sendDataFunction = sendDataFunction; 

        this.step_throttle = 0.01;
        this.step_dir = 0.333333;

        this.speedFunctionThrottle = new SpeedUp(0);
        this.speedFunctionDir = new SpeedUp(0);
        
        this.init();
    }

    /**
     * Initializing all Event Handlers for Keyboard Input
     */
    init(){
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        setTimeout(() => this.gameloop(), 2000);
    }

    gameloop(){
        // send speed+direction values
        setInterval(() => {
            
            // // for linear speedup
            // let dir = this.speedFunctionThrottle.linearSpeedUp(this.step_throttle);
            // let speed = this.speedFunctionThrottle.linearSpeedUp(this.step_dir);

            // for "bezier" / "circular"? speedup
            let dir = this.speedFunctionDir.y;
            let speed = this.speedFunctionThrottle.y;
            console.log('speed', speed, 'dir', dir);

            this.sendDataFunction(dir, speed);
        }, 60); // 60ms
    }

    /**
     * Key Down event
     * 
     * @param {} e event
     */
    onKeyDown(e){

        // add class for styling
        document.getElementById(e.key).classList.add('key-pressed');

        // get pressed key
        let key = e.key;


        if(key == 's'){
            this.speedFunctionThrottle.x -= this.step_throttle;
            this.speedFunctionThrottle.bezier();
        }
        if(key == 'a'){
            this.speedFunctionDir.x -= this.step_dir;
            this.speedFunctionDir.bezier();
        }
        if(key == 'w'){
            this.speedFunctionThrottle.x += this.step_throttle;
            this.speedFunctionThrottle.bezier();
        }
        if(key == 'd'){
            this.speedFunctionDir.x += this.step_dir;
            this.speedFunctionDir.bezier();
        }
    }
      

    /**
     * handler: key-up
     * @param {*} e event
     */
    onKeyUp(e){
        let key = e.key;

        if(key == 'w' || key == 's'){
            this.speedFunctionThrottle.x = 0;
            this.speedFunctionThrottle.y = 0;
            this.sendDataFunction(this.speedFunctionDir.y, -2) // send current direction, speed=0
        }
        if(key =='a' || key == 'd'){
            this.speedFunctionDir.x = 0;
            this.speedFunctionDir.y = 0;
            this.sendDataFunction(-2, this.speedFunctionThrottle.y); // send direction=0, current speed
        }
    
        // remove class for styling
        document.getElementById(key).classList.remove('key-pressed');
    }
}
