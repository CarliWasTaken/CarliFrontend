
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
        this.dir = 0.0;
        this.speed = 0.0;
        this.speed_multiplier = 1.1;
        this.dir_multiplier = 1.1;
        
        this.step_throttle = 0.01;
        this.step_dir = 0.5;
        
        this.init();
    }

    /**
     * initializes all the handlers
     */
    init(){
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        setTimeout(() => this.gameloop(), 2000);
        // this.gameloop();
    }

    gameloop(){
        // send speed+direction values
        setInterval(() => {
            
            // // for linear/exponential speedup
            // let dir = this.dir;
            // let speed = this.speed;

            // for "bezier" / "circular"? speedup (the linearSpeedUp-function has to be used as well, to increase the `x`-coordinates !!)
            let dir = this.bezier(this.dir);
            let speed = this.bezier(this.speed);
            console.log('speed', speed, this.speed);


            this.sendDataFunction(dir, speed);
        }, 60);
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

        let step_throttle = this.step_throttle;
        let step_dir = this.step_dir;

        if(key == 's'){
            step_throttle = -this.step_throttle;
            this.onThrottle(step_throttle);
        }
        if(key == 'a'){
            step_dir = -this.step_dir;
            this.onDir(step_dir);
        }

        if(key == 'w'){
            this.onThrottle(step_throttle);
        }
        if(key == 'd'){
            this.onDir(step_dir);
        }
    }

    onThrottle(step){
        // this.speed = this.exponentialSpeedUp(this.speed, step, this.speed_multiplier);
        this.speed = this.linearSpeedUp(this.speed, step);
        this.speed = Math.max(this.speed, WASD_Controller.min_speed);
        this.speed = Math.min(this.speed, WASD_Controller.max_speed);
    }

    onDir(step){
        // this.dir = this.exponentialSpeedUp(this.dir, step, this.dir_multiplier);
        this.dir = this.linearSpeedUp(this.dir, step);
        this.dir = Math.max(this.dir, WASD_Controller.min_direction);
        this.dir = Math.min(this.dir, WASD_Controller.max_direction);
    }
    


    /**
     * Exponential Speed-up function
     * ----------------------------
     * 
     * > value = ((0 ^ |value|) * step + value) * multiplier
     * 
     * > `(0 ^ |value|) * step + value` .... eliminate zero-values or preserve the original value
     * 
     * ---
     * 
     *  0^0 = 1 
     *  - if `value` = 0 --> it will take `step` as base value to start with 
     *      > (`value` = `step`, iff `value` = 0)
     *  - if `value` = 0.1234 --> 0^0.1234 * `step` = 0 
     *      > (`value` = `value`, if `value` != 0)
     * ---
     * @param {*} step whether it's positive or negative speedup
     * @param {*} value the value to be exponentially manipulated
     * @param {*} multiplier the factor the `value` will be multiplied with
     */
    exponentialSpeedUp(value, step, multiplier){
        value = Math.pow(0, Math.abs(value)) * step + value; // eliminate zero-values for `value`
        value *= multiplier;
        return value;
    }

    /**
     * A 3-point bezier curve that looks like a quarter circle.
     *  - provides very fast speedup in the beginning, slow speedup in the end
     * 
     *  f(x) = sqrt(1 - (x-1)^2), x in [0; 1]
     * 
     * 
     * 1|                 ***********
     *  |          *******
     *  |      ***
     *  |   ***
     *  |  **
     *  | **
     *  | *
     *  | *
     *  | *
     * 0 --------------------------- 1
     * ---
     * 
     * To use kind of speedup, simple use the `linearSpeedup`-function to increase the `x`-values 
     * and this function (`bezier`) to compute the actual speed
     * 
     * @param {*} x a number between 0 and 1
     * @returns a number between 0 and 1
     */
    bezier(x){
        return Math.sqrt(1.0 - Math.pow(x-1.0, 2));
    }

     /**
     * The Linear Speed-up Function
     * @param {*} value The value to be linearly increased/decreased
     * @param {*} step 
     */
    linearSpeedUp(value, step){
        return value + step;
    }

    /**
     * handler: key-up
     * @param {*} e event
     */
    onKeyUp(e){
        let key = e.key;

        if(key == 'w' || key == 's'){
            this.speed = 0 // stop
            this.sendDataFunction(this.dir, -2) // send current direction, speed=0
        }
        if(key =='a' || key == 'd'){
            this.dir = 0 // stop
            this.sendDataFunction(-2, this.speed) // send direction=0, current speed
        }
    
        // remove class for styling
        document.getElementById(key).classList.remove('key-pressed');
    }
}
