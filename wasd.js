
// minimum values
var min_speed = 0.0;
var min_direction = -1.0;
// maximum values
var max_speed = 1.0;
var max_direction = 1.0;

// speed slider
var slider_speed = null;

// key map
var k_map = {};

class WASD_Controller{
    /**
     * @param {*} f the function which should be called after every change in direction/speed 
     *      (sending these values via the websocket)
     */
    constructor(f){
        this.f = f;
        this.init();
        this.dir = 0;
        this.speed = 0;
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
        // document.getElementById(e.key).classList.add('key-pressed');

        // if repeated key press
        if (e.repeat) {
            // get pressed key
            var key = e.key;
            
            // add key to map
            k_map[key] = true;
            
            if(slider_speed == null){
                slider_speed = document.getElementById("customRange2");
                // set slider max
                slider_speed.max = max_speed * 100;
                // set slider min
                slider_speed.min = min_speed * 100;
                // set slider starting position
                slider_speed.value = (max_speed / 2) * 100;
            }
            
            // speed value
            this.speed = 0.0;
            // direction value
            this.dir = 0;
            
            // speed handling
            if(k_map['w']){
                this.speed = slider_speed.value / 100;
            }
            else if(k_map['s']){
                this.speed = slider_speed.value / 100 * -1;
            }
            
            // direction handling
            if(k_map['a']){
                this.dir = -1;
            }
            else if(k_map['d']){
                this.dir = 1;
            }
            
            // send speed value
            this.f(this.dir, this.speed);
        }
    }

    /**
     * handler: key-up
     * @param {*} e event
     */
    onKeyUp(e){
        if (!e.repeat) {
            var key = e.key;
        
            // remove key from map
            k_map[key] = false;
            
            switch(key){
                case 'w':
                case 's':
                    this.f(this.dir, 0)
                    // socketSpeed.emit('speed', { data: 0 });
                    break;
                    
                case 'a':
                case 'd':
                    this.f(0, this.dir)
                    // socketDirection.emit('direciton', { data: 0 });
                    break;
            }

            // if (key == 'w') {
            //     speed = 0;
            //     socketSpeed.emit('speed', { data: 0 });
            //     document.getElementById(key).classList.remove('key-pressed');
            //     console.log(key);
            // } else if (key == 's') {
            //     speed = 0;
            //     socketSpeed.emit('speed', { data: 0 });
            //     document.getElementById(key).classList.remove('key-pressed');
            // } else if (key == 'a') {
            //     direction = 0;
            //     socketSpeed.emit('direction', { data: 0 });
            //     document.getElementById(key).classList.remove('key-pressed');
            // } else if (key == 'd') {
            //     direction = 0;
            //     socketSpeed.emit('direction', { data: 0 });
            //     document.getElementById(key).classList.remove('key-pressed');
            // }
        }
    }
}
