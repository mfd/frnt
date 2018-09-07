/**
 * FacebookShare
 * v1.0
 * 
 * @param  element       {Element} - Share button - REQUIRED
 * @param  callback      {Function} - Callback function returns Object
 * @param  hashtag       {String}
 * @param  quote         {String} - Shared along with the link
 * @param  mobile_iframe {Boolean} - Opens a popup on top of page for mobile
 */

class FacebookShare {
    constructor(element, callback, hashtag, quote, mobile_iframe = false) {

        // Bindings
        this.share = ::this.share;

        // Elements
        this.element = element;

        // Params
        this.params = {
            method: 'share',
            display: 'popup',
            href: window.location.origin + window.location.pathname.replace(/\/$/, "") + window.location.hash,
            hashtag: hashtag,
            quote: quote,
            mobile_iframe: mobile_iframe
        };

        // Events
        this.element.addEventListener('click', this.share);
    }

    
    /*
     * SHARE
     */
    share(event) {
        event.preventDefault();

        FB.ui(this.params, this.callback);
    }


    /*
     * DISPOSE
     */
    dispose() {
        this.element.removeEventListener('click', this.share);

        this.element = null;
        this.params = null;
    }
}

export default FacebookShare;


// WEBPACK FOOTER //
// ../src/js/nsfw/sharing/FacebookShare.js