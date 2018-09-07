import SmartView from './SmartView';
import RafManager from 'nsfw/managers/RafManager';

/**
 * N * S * F * W
 * 
 * Animated View
 *
 * v1.0
 */

class AnimatedView extends SmartView {

	constructor(id, view) {

		super(id, view);

		this.id = id;

		RafManager.bind(this.id, ::this.check);

		this.locate();
	}

	/**
	 * Check
	 * (RAF)
	 */
	check() {

		super.check(); // (see SmartView)

		if( this.visibility && !this.visible )
			this.display();
		else if( !this.visibility && this.visible )
			this.hide();

	}

	/**
	 * Display
	 * Add your own animation (override)
	 */
	display() {

		this.visible = true;
	}

	/**
	 * Hide
	 * Add your own animation (override)
	 */
	hide () {

		this.visible = false;
	}

	/**
	 * Resize
	 * Locate your view in document
	 */
	resize () {

		this.locate();
	}


	/**
	 * Dispose
	 */
	dispose() {

		RafManager.unbind( this.id );

		this.id = null;

		super.dispose();
	}

}

export default AnimatedView;


// WEBPACK FOOTER //
// ../src/js/nsfw/dom/AnimatedView.js