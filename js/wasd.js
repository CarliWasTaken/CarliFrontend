
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
        this.speed_multiplier = 1.1;
        this.dir_multiplier = 1.1;

        this.step = 0.01;


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

        let step = this.step;
        
        switch(key){

            // back
            case 's':
                step = -this.step;

            // forward
            case 'w':
                this.speed = this.exponentialSpeedUp(this.speed, step, this.speed_multiplier);
                // this.speed = this.linearSpeedUp(this.speed, step);
                this.speed = Math.max(this.speed, WASD_Controller.min_speed);
                this.speed = Math.min(this.speed, WASD_Controller.max_speed);
                break;
            
            // left
            case 'a':
                step = -this.step; 

            // right
            case 'd':
                this.dir = this.exponentialSpeedUp(this.dir, step, this.dir_multiplier);
                // this.dir = this.linearSpeedUp(this.dir, step);
                this.dir = Math.max(this.dir, WASD_Controller.min_direction);
                this.dir = Math.min(this.dir, WASD_Controller.max_direction);
                break;
        }

        
        // send speed+direction values
        this.sendDataFunction(this.dir, this.speed);
    }


    /**
     * Exponential Speed-up function
     * ----------------------------
     * 
     * > `value = (0^|value| * step + value) * multiplier`
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
        value = Math.pow(0, Math.abs(value)) * step + value; // eliminate zero-values for `this.speed`
        value *= multiplier;
        return value;
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
