import Vector2 from '../math/Vector2';
import Vector3 from '../math/Vector3';

/**
 * DisplayObject
 */

class DisplayObject {
	
	constructor( view ) {

		// bindings
		this.click 	= ::this.click;
		this.over 	= ::this.over;
		this.out 	= ::this.out;

		if(!view) {

			/**
			 * More about dom-create-element
			 * https://github.com/BaptisteBriel/dom-create-element
			 */

			const create = require('dom-create-element');

			view = create({ selector: 'div' });

		}

		this.view = view;

		// security check
		this.view.style.position = 'absolute';

		this.position = new Vector3();
		this.rotation = new Vector3();
		this.scale = new Vector2(1, 1);

		this.alpha = 1;

	}

	/**
	 * Render
	 */
	render() {

		this.view.style.transform = 
		this.view.style.webkitTransform = `translate3d(${this.position.x}px,${this.position.y}px,${this.position.z}px) scale(${this.scale.x},${this.scale.y}) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) rotateZ(${this.rotation.z}deg)`;

		this.view.style.opacity = this.alpha;
	}

	/**
	 * Click
	 */
	click ( event ) {

	}

	/**
	 * Over
	 */
	over ( event ) {

	}

	/**
	 * Out
	 */
	out ( event ) {

	}

	/**
	 * Interactive
	 * status : Boolean
	 */
	interactive ( status = true ) {

		if( status ) {

			this.view.addEventListener('click', 	this.click);
			this.view.addEventListener('mouseover', this.over);
			this.view.addEventListener('mouseout', 	this.out);

		} else {

			this.view.removeEventListener('click', 		this.click);
			this.view.removeEventListener('mouseover', 	this.over);
			this.view.removeEventListener('mouseout', 	this.out);
		}
	}

	/**
	 * Button Mode
	 * status: Boolean
	 */
	buttonMode ( status = true ) {

		this.view.style.cursor = status ? 'pointer' : null;
	}


	/**
	 * Pivot 
	 * value: Object {x,y}
	 */
	pivot({ x = 0, y = 0 }) {

		this.view.style.transformOrigin = `${x}% ${y}%`;
	}

	/**
	 * Move
	 * value: Object {x,y}
	 */
	move({ x = 0, y = 0 }) {
		this.view.style.left 	= `${x}px`;
		this.view.style.top 	= `${y}px`;
	}

	/**
	 * Dispose
	 */
	dispose () {

		this.interactive(false);

		this.click 	= 
		this.over 	= 
		this.out 	= null;

	}
}

export default DisplayObject;


// WEBPACK FOOTER //
// ../src/js/nsfw/dom/DisplayObject.js