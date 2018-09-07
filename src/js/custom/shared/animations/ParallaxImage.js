import ParallaxView from "nsfw/dom/ParallaxView";

class ParallaxImage extends ParallaxView {
	constructor(id, view, options) {

		super(id, view, options);
	
	}


	/**
	 * PARALLAX
	 */
	parallax() {
	 	
	 	if( this.visibility ) {

			this.distance = ( window.currentScrollTop + window.innerHeight) - this.offsetTop;
			this.ratio = (this.distance / window.innerHeight - .5 ) * this.options.depth;

			this.interpolation.y = this.ratio * -this.options.amplitude;
		}

		this.displayObject.position.y += ( this.interpolation.y - this.displayObject.position.y ) * this.options.smooth;
	}
}

export default ParallaxImage;


// WEBPACK FOOTER //
// ../src/js/custom/shared/animations/ParallaxImage.js