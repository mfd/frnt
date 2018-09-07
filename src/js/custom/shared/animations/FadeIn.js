import AnimatedView from 'nsfw/dom/AnimatedView';

/**
 * Fade in the view
 * Direction  : "up" (default), "left", "right", "scale"
 * Ex         : <div class="anim--fade" data-anim-direction="left" data-anim-delay="0.2">
 */

class FadeIn extends AnimatedView {

	constructor(id, view, direction = "up", delay = 0, triggerRatio = 0.85) {

		super(id, view);

		// Els
        this.direction = direction;
        this.delay = delay;
 
		// Bindings
        this.fadeIn = ::this.fadeIn; 
 
        // Vars
		this.triggerRatio = triggerRatio;
		this.isAjaxRow = this.view.getAttribute("data-anim-ajax"); 
	}

	display() {

		super.display();
		this.fadeIn();
	}

	fadeIn() { 
		let transform,
			duration;

		if ( this.direction == "left" || this.direction == "right" ){
			transform = {x:"0"};
		} 
		else if ( this.direction == "scale" ){
			transform = {scale:1};
			// duration = 0.75;
		}
		else {
			transform = {y:"0"};
		}

		if ( window.isMobile ) this.delay = 0;
		TweenMax.to(this.view, duration || 0.8, {...transform, opacity:1, delay:this.delay, ease:Power2.easeOut, onComplete: () => {
			if(this.isAjaxRow) {
				this.view.classList.add("faded");
			}
		}});
	}
}

export default FadeIn;


// WEBPACK FOOTER //
// ../src/js/custom/shared/animations/FadeIn.js