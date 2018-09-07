import AnimatedView from 'nsfw/dom/AnimatedView';

/**
 * Animate the view's childs
 */

class AnimateChilds extends AnimatedView {

	constructor(id, view, direction = "up", delay = 0, triggerRatio = 0.85) {

		super(id, view);

		// Els
		this.view = view;
		this.direction = direction;
        this.delay = delay;
		this.childs = this.view.children;
 
		// Bindings
        this.animateChilds = ::this.animateChilds;

        // Vars
		this.triggerRatio = triggerRatio;
	}
 
	display() {

		super.display();
		this.animateChilds();
	}

	animateChilds() {

		let transform,
			duration;

		if ( this.direction == "left" || this.direction == "right" ){
			transform = {x:"0"};
		} 
		else {
			transform = {y:"0"};
		}
		
		if ( window.isMobile ) this.delay = 0;
		if ( this.view.classList.contains('anim--css') ){
			TweenMax.staggerTo(this.childs, 0, {...transform, opacity:1, delay:this.delay}, 0.2);
		} else {
			TweenMax.staggerTo(this.childs, 0.8, {...transform, opacity:1, delay:this.delay, ease:Power2.easeOut}, 0.2);
		}
		
	}
}

export default AnimateChilds;


// WEBPACK FOOTER //
// ../src/js/custom/shared/animations/AnimateChilds.js