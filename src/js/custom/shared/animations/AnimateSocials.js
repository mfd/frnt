import AnimatedView from 'nsfw/dom/AnimatedView';

/**
 * Animate social networks
 */

class AnimateSocials extends AnimatedView {

	constructor(id, view) {

		super(id, view);

		// Els
		this.id = id;
        this.view = view;
		this.socials = this.view.querySelectorAll('.social__elem > a');
 
		// Bindings
        this.animateSocials = ::this.animateSocials; 

        // Vars
		this.customOffset = window.h / 1.35;
		this.customOffsetBottom = this.offsetBottom - 250;
		this.customScrollTop = 0;
	}

	check () {

		this.customScrollTop = window.currentScrollTop + this.customOffset;

		if ( this.customScrollTop > this.offsetTop && window.currentScrollTop < this.customOffsetBottom ){
			this.visibility = true;
		}

		if ( this.visibility && !this.visible )
			this.display();
	}

	display() {

		super.display();
		this.animateSocials();
	}

	animateSocials() {

		TweenMax.staggerTo(this.socials, 0.15, {className:"+=anim--border"}, 0.3);
		// TweenMax.staggerTo(this.socials, 0.15, {scaleX:1.65, scaleY:1.65, yoyo:true, repeat:1}, 0.3); 
	}
}

export default AnimateSocials;


// WEBPACK FOOTER //
// ../src/js/custom/shared/animations/AnimateSocials.js