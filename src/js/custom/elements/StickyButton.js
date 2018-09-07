import EventsManager from "nsfw/events/EventsManager";
import Events from "nsfw/events/Events";
import AnimatedView from 'nsfw/dom/AnimatedView';

/**
 * Stick button to header
 */

class StickyButton extends AnimatedView { 

	constructor(id, view) {

		super(id, view);

		// Bindings
        this.replace = ::this.replace;

		// Els
		this.button = this.view.querySelector('#button-apply');
		this.buttonParent = this.button.parentElement;
		this.buttonLink = this.button.querySelector(".button");
		this.footerHeight = document.querySelector("footer").offsetHeight;
		this.wrapper = document.querySelector(".scroll-wrapper");
		
        // Events
		EventsManager.on(Events.Header.TOGGLE, this.replace);
	} 

	check () {
		if ( window.currentScrollTop > this.offsetBottom ){
			this.visibility = true;

			if ( window.currentScrollTop > (window.scrollBar.size.content.height - this.footerHeight - 200) ){
				this.button.classList.add('out');
			} else {
				this.button.classList.remove('out'); 
			}

		} else {
			this.visibility = false;
		}

		if( this.visibility && !this.visible )
			this.display();
		else if( !this.visibility && this.visible )
			this.hide();
	}

	display() {

		super.display();
		this.stickButton();
	}

	hide () {

		super.hide();
		this.unstickButton();
	}

	stickButton() {
		
        this.wrapper.insertBefore(this.button, this.wrapper.firstChild);

		this.button.classList.add('sticky');

		this.stickButtonTimeout = setTimeout( () => {
			this.button.classList.add('visible');

			clearTimeout(this.stickButtonTimeout);
			this.stickButtonTimeout = null;
		}, 50 );
	}

	unstickButton() {

		this.insertAfter(this.button, this.buttonParent.lastChild);

		this.button.classList.remove('sticky');
		this.button.classList.remove('visible');

		TweenMax.set(this.buttonLink, {css: {transform: "translateY(0px)"}, delay: 0.1});
	}

	insertAfter(newNode, referenceNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}


	/**
	 * REPLACE button on nav toggle
	 */
	replace(headerIsVisible) {
		if(window.w > 768 && window.w < 980) {
			this.headerIsVisible = headerIsVisible;

			if(this.button.classList.contains("sticky") && headerIsVisible) {
				TweenMax.to(this.buttonLink, 0.5, {css: {transform: "translateY(80px)"}, ease: Power2.EaseOut});			
			}
			else if(this.button.classList.contains("sticky") && !headerIsVisible) {
				TweenMax.to(this.buttonLink, 0.5, {css: {transform: "translateY(0px)"}, delay: 0.1, ease: Power2.EaseOut});
			}
		}
	}

	/**
	 * RESIZE
	 */
	resize() {
		if(window.w >= 980) {
			this.buttonLink.removeAttribute("style");
		}
	}
}

export default StickyButton;


// WEBPACK FOOTER //
// ../src/js/custom/elements/StickyButton.js