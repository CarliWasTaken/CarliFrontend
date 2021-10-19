// socket used for speed
var socketSpeed = io('http://127.0.0.1:5000/drive');
var socketDirection = io('http://127.0.0.1:2001/drive');

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

document.addEventListener('keydown', (e) => {
    //document.getElementById(e.key).classList.add('key-pressed');
    if (e.repeat) {
        // get pressed key
        var key = e.key;
        
        // add key to map
        k_map[key] = true;
        
        if(slider_speed == null){
            slider_speed = document.getElementById("sliderSpeed");
            // set slider max
            slider_speed.max = max_speed * 100;
            // set slider min
            slider_speed.min = min_speed * 100;
            // set slider starting position
            slider_speed.value = (max_speed / 2) * 100;
        }
        
        // speed value
        let speed = 0.0;
        // direction value
        let dir = 0;
        
        // speed handling
        if(k_map['w']){
            speed = slider_speed.value / 100;
        }
        else if(k_map['s']){
            speed = slider_speed.value / 100 * -1;
        }
        
        // direction handling
        if(k_map['a']){
            dir = -1;
        }
        else if(k_map['d']){
            dir = 1;
        }

        // send speed value
        socketSpeed.emit('speed', { data: Math.round(speed) });
        socketDirection.emit('direciton', { data: dir });
        
        // debug output
        console.log("Speed      : " + speed);
        console.log("Direction  : " + dir);
    }
});

document.addEventListener('keyup', (e) => {
    if (!e.repeat) {
        var key = e.key;
        
        // remove key from map
        k_map[key] = false;
        
        switch(key){
            case 'w':
            case 's':
                socketSpeed.emit('speed', { data: 0 });
                break;
                
            case 'a':
            case 'd':
                socketDirection.emit('direciton', { data: 0 });
                break;
        }
    }
});