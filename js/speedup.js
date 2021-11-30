class SpeedUp{

    constructor(x){
        this.x = x;
        this.y = x;
    }

    increaseX(step){
        this.x += step;
    }

    /**
     * makes sure that the `x`-value is between 0 and 1
     */
    checkDomain(){
        this.x = Math.min(1, this.x);
        this.x = Math.max(-1, this.x);
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
    static exponentialSpeedUp(value, step, multiplier){
        value = Math.pow(0, Math.abs(value)) * step + value; // eliminate zero-values for `value`
        value *= multiplier;
        return value;
    }

    /**
     * This exponential function simply computes f(x) = x^{exponent}
     * @param {*} step the step to move on the x-axis
     * @param {*} exponent 
     * @returns  x^{exponent}
     */
    exp2(step, exponent){
        this.x += step;
        return Math.pow(this.x, exponent);
    }


    /**
     * A 3-point bezier curve that looks like a quarter circle.
     *  - provides very fast speedup in the beginning, slow speedup in the end
     * 
     *  f(x) = sign(x) * sqrt(1 - (x-1)^2), x in [-1; 1]
     *      sign(x) = x/|x|
     * 
     *                     1|                 ***********
     *                      |          *******
     *                      |      ***
     *                      |   ***
     *                      |  **
     *                      | **
     *                      | *
     *                      | *
     *                      | *
     * -1------------------ 0 --------------------------- 1
     *                     *|
     *                     *|
     *                     *|
     *                    **|
     *                   ** |
     *                 ***  |
     *                ***   |
     *               ***    |
     *          *****       |
     * ********             | -1
     * 
     * To use kind of speedup, simple use the `linearSpeedup`-function to increase the `x`-values 
     * and this function (`bezier`) to compute the actual speed
     * 
     * @param {*} x a number between 0 and 1
     * @returns a number between 0 and 1
     */
    static bezierFunction(x){
        return Math.sign(x) * Math.sqrt(1.0 - Math.pow(Math.abs(x)-1.0, 2));
    }

    /**
     * see: {@link SpeedUp.bezierFunction}
     */
    bezier(){
        this.checkDomain();
        this.y = SpeedUp.bezierFunction(this.x);
    }

    /**
     * The Linear Speed-up Function
     * @param {*} value The value to be linearly increased/decreased
     * @param {*} step 
     */
    static linearSpeedUpFunction(x, step){
        return x + step;
    }

    /**
     * see: {@link SpeedUp.linearSpeedUpFunction}
     * @returns 
     */
    linearSpeedUp(step){
        this.y = SpeedUp.linearSpeedUpFunction(step);
        this.y = Math.min(1, this.y);
        this.y = Math.max(-1, this.y);
    }
}