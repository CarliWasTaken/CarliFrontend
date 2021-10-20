
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
        this.init();
        this.dir = 0.0;
        this.speed = 0.0;

        // key map
        this.k_map = {};
    }

    /**
     * initializes all the handlers
     */
    init(){
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    /**
     * handler: key-down
     * @param {} e event
     */
    onKeyDown(e){

        // add class for styling
        document.getElementById(e.key).classList.add('key-pressed');

        // get pressed key
        let key = e.key;
        
        let step = 0.01;
        switch(key){

            // back
            case 's':
                step = -0.01; 

            // forward
            case 'w':
                this.speed = this.speed + step // for exponential speed-up change this line
                this.speed = Math.max(this.speed, WASD_Controller.min_speed);
                this.speed = Math.min(this.speed, WASD_Controller.max_speed);
                break;
            
            // left
            case 'a':
                step = -0.01; 

            // right
            case 'd':
                this.dir = this.dir + step // for exponential speed-up change this line
                this.dir = Math.max(this.dir, WASD_Controller.min_direction);
                this.dir = Math.min(this.dir, WASD_Controller.max_direction);
                break;
        }

        
        // send speed+direction values
        this.sendDataFunction(this.dir, this.speed);
    }

    /**
     * handler: key-up
     * @param {*} e event
     */
    onKeyUp(e){
        let key = e.key;
    
        switch(key){
            case 'w':
            case 's':
                this.speed = 0
                this.sendDataFunction(this.dir, this.speed) // send current direction, speed=0
                break;
                
            case 'a':
            case 'd':
                this.dir = 0
                this.sendDataFunction(this.dir, this.dir) // send direction=0, current speed
                break;
        }

        // remove class for styling
        document.getElementById(key).classList.remove('key-pressed');
    }
}
