let min = -127;
let neutral = 0;
let max = 127;

let speed = 0;
let direction = 0;
let speed_mod = 3.0;
let dir_mod = 3.0;

class WASD_Controller{
    /**
     * @param {*} f the function which should be called after every change in direction/speed 
     *      (sending these values via the websocket)
     */
    constructor(f){
        this.f = f;
        this.init();
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
        document.getElementById(e.key).classList.add('key-pressed');

        // if repeated key press
        if (e.repeat) {
            // get pressed key
            var key = e.key;
            
            // check if speed should be applied
            if (key == 'w') {
                speed += speed_mod;
            } else if (key == 's') {
                speed -= speed_mod;
            }
            
            if (speed < min) {
                speed = min;
            } else if(speed > max) {
                speed = max;
            }
    
    
            if (key == 's') {
                direction += dir_mod;
            } else if (key == 'a') {
                direction -= dir_mod;
            }
            
            if (direction < min) {
                direction = min;
            } else if(direction > max) {
                direction = max;
            }
            
            // send speed value
            this.f(direction, speed);
        }
    }

    /**
     * handler: key-up
     * @param {*} e event
     */
    onKeyUp(e){
        if (!e.repeat) {
            var key = e.key;
    
            if (key == 'w') {
                speed = 0;
                socketSpeed.emit('speed', { data: 0 });
                document.getElementById(key).classList.remove('key-pressed');
                console.log(key);
            } else if (key == 's') {
                speed = 0;
                socketSpeed.emit('speed', { data: 0 });
                document.getElementById(key).classList.remove('key-pressed');
            } else if (key == 'a') {
                direction = 0;
                socketSpeed.emit('direction', { data: 0 });
                document.getElementById(key).classList.remove('key-pressed');
            } else if (key == 'd') {
                direction = 0;
                socketSpeed.emit('direction', { data: 0 });
                document.getElementById(key).classList.remove('key-pressed');
            }
        }
    }
}
