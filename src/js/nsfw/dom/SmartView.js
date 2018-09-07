/**
 * N * S * F * W
 * 
 * Smart View
 *
 * v1.01
 */

class SmartView {

	constructor ( id, view ) {

		// security checks
		if(window.currentScrollTop !== 0 && !window.currentScrollTop) {
			console.error('SmartView :: ScrollManager should be already started.');
		}

		if(!view) {
			console.error('SmartView :: View is undefined');
		}

		this.id = id;
		this.view = view;

		this.visible 	= false;
		this.visibility = false;

		this.offsetTop 		= 0;
		this.offsetBottom 	= 0;
		this.scrollTop 		= 0;
		this.triggerRatio 	= 1;
		
		this.locate();
	}

	/**
	 * Check if visible in viewport
	 */
	check () {

		this.visibility = this.offsetBottom > window.currentScrollTop && this.offsetTop < window.currentScrollTop + window.innerHeight * this.triggerRatio;
	}

	/**
	 *  Save the offset top position
	 *  (should be called on «resize»)
	 */
	locate () {

		this.offsetTop 		= window.currentScrollTop + this.view.getBoundingClientRect().top;
		this.offsetBottom 	= this.offsetTop + this.view.offsetHeight;
	
	}

	/**
	 * Dispose
	 */
	dispose() {

		this.view = null;

		this.visible = false;
		this.visibility = false;

		this.offsetTop = 0;
		this.offsetBottom = 0;
	}

}

export default SmartView;


// WEBPACK FOOTER //
// ../src/js/nsfw/dom/SmartView.js