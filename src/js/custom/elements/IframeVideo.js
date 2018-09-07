/**
 * Iframe Video
 */

class IframeVideo {

    constructor (id, view) {

        // Els
        this.id = id;
        this.view = view;
        this.wrapper = "";
        this.state = "pauseVideo";

        // Bindings
        this.wrapIframe = ::this.wrapIframe;
        this.playVideo = ::this.playVideo;

        this.wrapIframe();
    }

    wrapIframe() {

        // Enable iframe JS api
        if ( this.view.src.indexOf('enablejsapi') == -1 ) {
            this.view.src += "?enablejsapi=1"; 
        }

        // Create the wrapper and add the iframe
        this.wrapper = document.createElement('span');
        this.wrapper.className = "intrinsic-container intrinsec-container--content intrinsic-container--16x9";
        this.view.parentNode.insertBefore(this.wrapper, this.view);
        this.wrapper.appendChild(this.view);

        // Manage play / pause
        this.wrapper.addEventListener('click', this.playVideo);
    } 

    playVideo() {

        if ( this.state == "pauseVideo" ) { 
            this.state = "playVideo";
            this.view.contentWindow.postMessage('{"event":"command","func":"' + this.state + '","args":""}','*');
        } else {
            this.state = "pauseVideo";
            this.view.contentWindow.postMessage('{"event":"command","func":"' + this.state + '","args":""}','*');
        }
    }
}

export default IframeVideo;


// WEBPACK FOOTER //
// ../src/js/custom/elements/IframeVideo.js