import RafManager from 'nsfw/managers/RafManager';

import DisplayObject from 'nsfw/dom/DisplayObject';
import SmartView from 'nsfw/dom//SmartView';

import Vector2 from 'nsfw/math/Vector2';

/**
 * N * S * F * W
 * 
 * Parallax View
 *
 * v1.0
 */

class ParallaxView extends SmartView {
	
	constructor(id, view, options = {}) {

		const displayObject = new DisplayObject( view );

		super(id, displayObject.view);

		// view
		this.displayObject = displayObject;

		// params
		this.interpolation = new Vector2(0,0);
		this.distance = 0;
		this.ratio = 0;

		// options
		const { amplitude, smooth, depth } = options;
		this.options = { amplitude: amplitude || 100, smooth: smooth || .2, depth: depth || 1 };

		// bindings
		RafManager.bind( this.id, ::this.render);
	}

	/**
	 * Parallax
	 * Could be overwritten depends on what parallax style you need
	 */
	 parallax() {
	 	
	 	if( this.visibility ) {

			this.distance = ( window.currentScrollTop + window.innerHeight) - this.offsetTop;
			this.ratio = (Math.min(this.distance / window.innerHeight, 1) - .5 ) * this.options.depth;

			this.interpolation.y = this.ratio * -this.options.amplitude;
		}

		this.displayObject.position.y += ( this.interpolation.y - this.displayObject.position.y ) * this.options.smooth;
	 }


	/** 
	 * Render
	 */
	render() {

		super.check(); // (see SmartView)

		this.parallax();

		this.displayObject.render();
	}


	/** 
	 * Resize
	 */
	resize() {

		this.locate();
	}

	/**
	 * Dispose
	 */
	dispose(){

		RafManager.unbind( this.id);

		super.dispose();
	}

}

export default ParallaxView;


// WEBPACK FOOTER //
// ../src/js/nsfw/dom/ParallaxView.js