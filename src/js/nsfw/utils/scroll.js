/**
 * Get scroll top position
 *
 * @return float
 */
export function getScrollTop() {
    if (window.isSafari) {
        return window.wrapper.scrollTop;
    } else {
        return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    }
}

/**
 * Scroll to (x,y)
 *
 * @return void
 */
export function scrollTo(x, y, wrapper = window ) {
    if (window.isSafari) {
        console.warn('scrollTo :: you need to provide a dom element.');
        wrapper.scrollTop = y;
    } else {
        wrapper.scrollTo(x,y);
    }
}

/**
 * Get distance from top document to top element
 *
 * @return float
 */
export function getOffsetTop($element) {
    let offsetTop = 0;
    
    do {
        if (!isNaN($element.offsetTop)) {
            offsetTop += $element.offsetTop;
        }
    } while ($element = $element.offsetParent);
    
    return offsetTop;
}