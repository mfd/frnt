import EventsManager from "nsfw/events/EventsManager";
import Events from "nsfw/events/Events";

class StickyElement {
	constructor(view, ref, offset, isReverse = false, initOffset = false) {
		
		// Bindings
		this.replace = ::this.replace;

		// Elements
		this.view = view;
		this.viewParent = this.view.parentElement;
		this.ref = ref;
		this.offset = offset;
		this.isReverse = isReverse;
		this.initOffset = initOffset;
		this.wrapper = document.querySelector(".scroll-wrapper");

		// Params
		this.refHeight = ref.offsetHeight;
		this.viewHeight = isReverse ? view.offsetWidth : view.offsetHeight;
		this.refTop = window.currentScrollTop + ref.getBoundingClientRect().top;
		this.viewTop = this.refTop + (isReverse ? offset : 0) + (initOffset ? initOffset : 0);
		this.isSticky = false;
		this.disallowSticky = false;
		this.headerIsVisible = true;


		// Events
		EventsManager.on(Events.Header.TOGGLE, this.replace);


		// sticky si l'élément entre en hauteur dans la page ou qu'il est plus grand que son ref
		if(window.w <= 768 || window.h < (this.viewHeight + this.offset + 80) || (this.viewHeight + (initOffset ? initOffset : 0)) >= this.refHeight) {
			this.disallowSticky = true;
		}
		else {
			this.view.classList.remove("static");
		}
	}
	

	/**
	 * SCROLL
	 */
	scroll() {
		if(this.disallowSticky) {
			return;
		}

		this.headerHeight = window.w >= 980 ? 80 : (this.headerIsVisible ? 80 : 0);

		if(window.currentScrollTop >= (this.refTop + this.refHeight - (this.headerHeight + this.offset) - this.viewHeight)) {

			if(this.isSticky) {

				// To make better
				this.insertAfter(this.view, this.viewParent.lastChild);
				
				this.isSticky = false;

				this.view.classList.remove("sticky");
				this.view.style.top = (this.refHeight - this.viewHeight) + 'px';
			}
		}
		else if(window.currentScrollTop >= this.viewTop - (this.headerHeight + this.offset)) {

			// fix for contact form confirmation
			if(document.body.classList.contains("form-confirmation"))
				return;

			if(!this.isSticky) {

				// To make better
				this.wrapper.insertBefore(this.view, this.wrapper.firstChild);

				this.isSticky = true;

				this.view.classList.add("sticky");
				this.view.removeAttribute("style");

				if(window.w < 980 && this.headerIsVisible) {
					this.view.classList.remove("sticky--animated");

					this.setTransform("83px");
				}
			}
		}
		else {
			if(this.isSticky) {

				// To make better
				this.insertAfter(this.view, this.viewParent.lastChild);

				this.isSticky = false;

				this.view.classList.remove("sticky");
				this.view.classList.remove("sticky--animated");
				this.view.removeAttribute("style");
			}
		}
	}


	/**
	 * REPLACE
	 */
	replace(headerIsVisible) {
		this.headerIsVisible = headerIsVisible;

		if(this.view.classList.contains("sticky") && headerIsVisible) {
			this.view.classList.add("sticky--animated");
			
			this.setTransform("83px");
		}
		else if(this.view.classList.contains("sticky") && !headerIsVisible) {
			this.view.classList.add("sticky--animated");

			this.setTransform("0px");
		}
	}


	/**
	 * SET TRANSFORM ON VIEW
	 */
	setTransform(transformY) {
		if(this.isReverse)
			this.view.style.transform = this.view.style.webkitTransform = `rotate(-90deg) translate(-${transformY}, calc(-100% + 10px))`;
		else
			this.view.style.transform = this.view.style.webkitTransform = `translateY(${transformY})`;
	}


	/**
	 * INSERT AFTER METHOD
	 */
	insertAfter(newNode, referenceNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}


	/**
	 * RESIZE
	 */
	resize() {

		if(window.w <= 768 || window.h < (this.viewHeight + this.offset + 80) || (this.viewHeight + (this.initOffset ? this.initOffset : 0)) >= this.refHeight) {
			if(!this.disallowSticky) {
				
				if(this.isSticky) {
					this.insertAfter(this.view, this.viewParent.lastChild);
					this.isSticky = false;
					
					this.view.classList.remove("sticky");
					this.view.classList.remove("sticky--animated");
					this.view.removeAttribute("style");
				}
				
				this.disallowSticky = true;
				
				if(this.viewHeight > this.refHeight) {
					this.view.classList.add("static");
				}
			}
		}
		else {			
			this.disallowSticky = false;

			this.refHeight = this.ref.offsetHeight;
			this.viewHeight = this.isReverse ? this.view.offsetWidth : this.view.offsetHeight;
			this.refTop = window.currentScrollTop + this.ref.getBoundingClientRect().top;
			this.viewTop = this.refTop + (this.isReverse ? this.offset : 0) + (this.initOffset ? this.initOffset : 0);

			this.scroll();
		}
	}
}

export default StickyElement;


// WEBPACK FOOTER //
// ../src/js/custom/elements/StickyElement.js