class DownloadLink {
	constructor(view) {

		// Bindings
		this.hover = ::this.hover;
		this.out = ::this.out;

		// Elements
		this.view = view;
		this.arrowSVG = this.view.querySelector(".path--arrow");

		// Events
		this.view.addEventListener("mouseover", this.hover);
		this.view.addEventListener("mouseout", this.out);

		// Timeline animation
		this.tl = new TimelineMax({paused: true, repeat: -1, repeatDelay: 0.3})
					.to(this.arrowSVG, 0.35, {y: 0})
					.to(this.arrowSVG, 0.35, {y: -5})
					.to(this.arrowSVG, 0.2, {y: 2, delay: 0.05})
					.to(this.arrowSVG, 0.15, {y: -1})
					.to(this.arrowSVG, 0.15, {y: 0});
	}

	/**
	 * ON HOVER
	 */
	hover() {

		this.tl.restart();

	}


	/**
	 * ON OUT
	 */
	out() {

		this.tl.pause(0);

	}
}

export default DownloadLink;


// WEBPACK FOOTER //
// ../src/js/custom/elements/DownloadLink.js