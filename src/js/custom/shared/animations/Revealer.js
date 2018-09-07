import AnimatedView from "nsfw/dom/AnimatedView";

class Revealer extends AnimatedView {
	constructor(id, view, triggerRatio = 0.85) {
		
		super(id, view);

		// Elements
		this.mask = this.view.querySelector(".anim--revealer__mask");

		// Params
		this.delay = this.view.getAttribute("data-anim-delay") || 0;

		this.triggerRatio = triggerRatio;
	}


	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		if(window.isDesktop)
			TweenMax.to(this.mask, 1, {css: {transform: "scaleX(0)"}, delay: this.delay, ease: Power4.easeInOut});
	}
}

export default Revealer;


// WEBPACK FOOTER //
// ../src/js/custom/shared/animations/Revealer.js