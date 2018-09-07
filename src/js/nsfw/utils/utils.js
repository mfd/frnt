/**
 * Re-maps a number from one range to another
 *
 * @return float
 */
export function map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

/**
 * Return true 1 times out of {chances}
 *
 * @return boolean
 */
export function lucky(chances) {
    return !~~(Math.random() * chances);
}

/**
 * Generates random numbers
 *
 * @return float
 */
export function random(low, hight) {
    return Math.random() * (hight-low) + low;
}

/**
 * Get random value of an array
 *
 * @return array value
 */
export function randomFromArray(array) {
    return array[~~(Math.random() * array.length)];
}

/**
 * Returns a suffled version of the original array
 * 
 * @return Array
 */
export function shuffleArray(o) {
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/**
* Return a clamped value between two bounds
*
* @return {number} clamped value
*/
export function clamp ( value, min, max ) {
    if ( value < min ) {
        return min; 
    }

    if ( value > max ) {
        return max; 
    }

    return value;
};