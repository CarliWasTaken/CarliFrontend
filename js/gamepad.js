
class JoyStickController{

    constructor(){
        this.init();
        this.interval;
        this.gp;
        this.gamepad_index;

        // axes[0] ... x-axis ... 1 = left, -1 = right
        // axes[1] ... y-axis ... 1 = back, -1 = front
        // axes[6] ... throttle ... -1 = front --> factor needed: -1 !!!!!
        this.throttle_index = 6;
        this.angle_index = 0;
        //this.y_axis = 0;

        this.update_interval = 1; // in ms
    }

    /**
     * add event listener for joystick
     */
    init(){
        console.log('init joystick..');
        window.addEventListener("gamepadconnected", this.onJoyStickConnected.bind(this));
        window.addEventListener("gamepaddisconnected", this.onJoyStickDisconnected.bind(this));
    }

    /**
     * handler for the joystick (when connected)
     * - If necessary: a button needs to be pushed (in order to detect it)
     * @param {*} e event
     */
    onJoyStickConnected(e){
        console.log('controller connected');
        this.gamepad_index = e.gamepad.index;

        this.gp = navigator.getGamepads()[e.gamepad.index];
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            this.gp.index, this.gp.id,
            this.gp.buttons.length, this.gp.axes.length);
    
        console.log(this.gp.buttons);
        console.log(this.gp.axes);

        // poll gamepad object every 500ms
        //this.interval = setInterval(this.pollGamepads.bind(this), this.update_interval);

    }

    /**
     * handler for disconnecting the joystick
     * @param {*} e 
     */
    onJoyStickDisconnected(e){
        console.log("disconnected controller");
        clearInterval(this.interval);
    }

    /**
     * is called every `this.update_interval` milliseconds (interval!) 
     */
    pollGamepads(f){

        console.log('polling gamepads..', this);
        this.gp = navigator.getGamepads()[this.gamepad_index];
        let angle = this.gp.axes[this.angle_index];
        let throttle = this.gp.axes[this.throttle_index];

        console.log('throttle: ', throttle);
        console.log('angle:', angle);

        f(angle, throttle);
    }
}
      