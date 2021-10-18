
class JoyStickController{
    constructor(){
        this.init();
    }

    init(){
        console.log('init joystick..');
        window.addEventListener("gamepadconnected", this.onJoyStickConnected);
        window.addEventListener("gamepaddisconnected", this.onJoyStickDisconnected);
    }

    onJoyStickConnected(e){
        console.log('controller connected');

        var gp = navigator.getGamepads()[e.gamepad.index];
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gp.index, gp.id,
            gp.buttons.length, gp.axes.length);
    
        console.log(gp.buttons);
        console.log(gp.axes);

        console.log('TODO - HERE.....');
    }

    onJoyStickDisconnected(e){
        console.log("disconnected controller");
    }
}


const controller = new JoyStickController();


        
        