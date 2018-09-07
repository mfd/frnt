import PageBase from "../../shared/PageBase";

import StickyElement from "../../elements/StickyElement";

class BesoinSingle extends PageBase {
	constructor() {
		super("besoin");
	}

	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		this.stickyColumn = new StickyElement(this.view.querySelector(".block--content--sticky"), this.view.querySelector(".sticky-ref"), 20);
	}


	/**
	 * SCROLL
	 */
	scroll() {
		super.scroll();

		if(this.stickyColumn) this.stickyColumn.scroll();
	}


	/**
	 * RESIZE
	 */
	resize() {
		super.resize();

		this.stickyColumn.resize();
	}
}

export default BesoinSingle;


// WEBPACK FOOTER //
// ../src/js/custom/views/besoins/BesoinSingle.js