/**
 * Convert a node collection to a regular array
 * 
 * @return Array
 */
export function arrayify(nodeCollection) {
    return Array.from(nodeCollection);
}

/**
 * ???
 * 
 * @return float
 */
export function getRemainingTime(upcoming) {
    const time = {h:0,m:0,s:0};

    let remainingTime = ( upcoming - window.timestamp ) / 1000;

    if( remainingTime > 0 ) {

        const h = ( remainingTime / 3600 ) >> 0;
        remainingTime -= h * 3600;
        const m = ( remainingTime / 60 ) >> 0;
        remainingTime -= m * 60;

        time.h = h;
        time.m = m;
        time.s = remainingTime;
    }
    

    return time;
}