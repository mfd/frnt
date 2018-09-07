import PageBase from "../../shared/PageBase";

import StickyElement from "../../elements/StickyElement";

class Service extends PageBase {
	constructor() {
		super("service");
	}


	/**
	 * DISPLAY
	 */
	display() {
		
		super.display();

        if ( window.w > 768 ) {
        	const offsetTop = this.view.querySelector(".service__illustration").offsetHeight - 130;
			this.stickyExpert = new StickyElement(this.view.querySelector(".expert--sticky"), this.view.querySelector(".sticky-ref"), 20, false, offsetTop);
        }
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

		if(this.stickyExpert) {
			this.stickyExpert.initOffset = this.view.querySelector(".service__illustration").offsetHeight - 130;
			this.stickyExpert.resize();
		}
		else if(!this.stickyExpert && window.w > 768) {
        	const offsetTop = this.view.querySelector(".service__illustration").offsetHeight - 130;
			this.stickyExpert = new StickyElement(this.view.querySelector(".expert--sticky"), this.view.querySelector(".sticky-ref"), 20, offsetTop);
		}
	}
}

export default Service;




// WEBPACK FOOTER //
// ../src/js/custom/views/services/Service.js