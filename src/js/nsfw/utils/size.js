/**
 * Get the height of the page
 *
 * @return float
 */
export function getPageHeight () {
    const body = document.body;
    const html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
}

/**
 * Get the inner height of the element
 *
 * @return float
 */
export function getInnerHeight ($element) {
    const styles = window.getComputedStyle($element);

    return $element.clientHeight - parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
}