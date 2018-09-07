import PageBase from "../../shared/PageBase";

import StickyElement from "../../elements/StickyElement";

class Contact extends PageBase {
	constructor() {
		super("joindre");
	}


	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		this.stickyColumn = new StickyElement(this.view.querySelector(".block--content--sticky"), this.view.querySelector(".sticky-ref"), 45);
		
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

		if(this.stickyColumn) this.stickyColumn.resize();
	}
}

export default Contact;


// WEBPACK FOOTER //
// ../src/js/custom/views/contact/Contact.js