import RafManager from "nsfw/managers/RafManager";
import EventsManager from "nsfw/events/EventsManager";
import Events from "nsfw/events/Events";

class ProgressBar {
	constructor(id, view) {

		// Bindings
		this.render = ::this.render;
		this.replace = ::this.replace;

		// Elements
		this.id = id;
		this.view = view;
		this.inner = this.view.querySelector(".progress-bar__inner");
		this.parent = this.view.parentElement;

		// Params
		this.articleHeight = document.querySelector(".article").offsetHeight;
		this.headerHeight = document.querySelector("header").offsetHeight;
		this.viewTop = this.parent.getBoundingClientRect().top + window.currentScrollTop;
		this.isSticky = false;
		this.headerIsVisible = true;

		// Managers
		RafManager.bind(this.id, this.render);

		// Events
		EventsManager.on(Events.Header.TOGGLE, this.replace);
	}


	/**
	 * RENDER
	 */
	render() {
		let barScale = window.currentScrollTop / ((this.articleHeight + this.headerHeight) - window.h);

		if(barScale < 0)
			barScale = 0;
		else if(barScale > 1)
			barScale = 1;

		this.inner.style.transform = this.inner.style.webkitTransform = `scaleX(${barScale}) translateY(${window.isIE ? 0 : (this.isSticky ? window.scrollBar.offset.y : 0)}px)`;
	}


	/**
	 * SCROLL
	 */
	scroll() {
		const offset = window.w >= 980 ? 80 : (this.headerIsVisible ? 80 : 0);

		if(window.currentScrollTop >= (this.viewTop - offset) && !this.isSticky) { // header height
			this.isSticky = true;
			this.view.classList.add("progress-bar--sticky");
		}
		else if(window.currentScrollTop < (this.viewTop - offset) && this.isSticky) { // 977
			this.isSticky = false;
			this.view.classList.remove("progress-bar--sticky");
			this.view.classList.remove("sticky--animated");
			this.view.style.transform = this.view.style.webkitTransform = "translateY(0)";
		}
	}


	/**
	 * REPLACE
	 */
	replace(data) {
		this.headerIsVisible = data;

		if(this.headerIsVisible && this.isSticky) {
			this.view.classList.add("sticky--animated");
			this.view.style.transform = this.view.style.webkitTransform = `translateY(${window.w > 480 ? 83 : 79}px)`;
		}
		else if(!this.headerIsVisible && this.isSticky) {
			TweenMax.delayedCall(0.1, () => {
				this.view.style.transform = this.view.style.webkitTransform = "translateY(0)";
			});
		}
	}


	/**
	 * RESIZE
	 */
	resize() {
		this.articleHeight = document.querySelector(".article").offsetHeight;
		this.headerHeight = document.querySelector("header").offsetHeight;
		this.viewTop = this.parent.getBoundingClientRect().top + window.currentScrollTop;

		if(window.w >= 980 && this.view.classList.contains("sticky--animated")) {
			this.view.classList.remove("sticky--animated");
			this.view.style.transform = this.view.style.webkitTransform = "translateY(0)";
		}
	}
}

export default ProgressBar;


// WEBPACK FOOTER //
// ../src/js/custom/elements/ProgressBar.js