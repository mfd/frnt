class MenuLink {
	constructor(view) {

		// Bindings
		this.onMouseOver = ::this.onMouseOver;
		this.onMouseOut = ::this.onMouseOut;

		// Elements
		this.view = view;
		this.border = view.querySelector("rect");

		// Params
		this.width = view.offsetWidth;
		this.hasSubmenu = view.classList.contains("has-submenu");
		this.baseAnim = 125;

		// Events
		this.ref = this.hasSubmenu ? this.view : this.view.querySelector("a");

		this.ref.addEventListener("mouseenter", this.onMouseOver);
		this.ref.addEventListener("mouseleave", this.onMouseOut);
	}

	onMouseOver() {
		TweenMax.to(this.border, (this.baseAnim/this.width), {strokeDashoffset: 0, ease: Power1.easeInOut});
	}

	onMouseOut() {
		TweenMax.set(this.border, {strokeDashoffset: 420, delay: 0.35});
	}
}

export default MenuLink;


// WEBPACK FOOTER //
// ../src/js/custom/shared/header/MenuLink.js