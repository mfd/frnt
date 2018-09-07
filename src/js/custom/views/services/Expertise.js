import PageBase from "../../shared/PageBase";

import StickyElement from "../../elements/StickyElement";

class Service extends PageBase {
	constructor() {
		super("expertise");
	}


	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		if(window.w > 768)
			this.stickyExpert = new StickyElement(this.view.querySelector(".expert--sticky"), this.view.querySelector(".sticky-ref"), 20);
	}


	/**
	 * SCROLL
	 */
	scroll() {
		super.scroll();

		if(this.stickyExpert) this.stickyExpert.scroll();
	}


	/**
	 * RESIZE
	 */
	resize() {
		super.resize();

		if(this.stickyExpert)
			this.stickyExpert.resize();
		else if(!this.stickyExpert && window.w > 768)
			this.stickyExpert = new StickyElement(this.view.querySelector(".expert--sticky"), this.view.querySelector(".sticky-ref"), 20);
	}
}

export default Service;




// WEBPACK FOOTER //
// ../src/js/custom/views/services/Expertise.js