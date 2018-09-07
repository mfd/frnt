class Loading {
	constructor(currentPage, header) {

		this.currentPage = currentPage;
		this.header = header;

		// Elements
		this.view = document.querySelector(".loading");

		// Show loading for first time on site only
		if(sessionStorage['loading']) {
			this.hide();
		}
		else {
			try {
				sessionStorage['loading'] = true;
			}
			catch(e) {
				// console.log(e);
			}

			document.body.classList.add("overflow-hidden");
			this.display();
		}
	}

	/**
	 * DISPLAY
	 */
	display() {
		this.view.classList.add("loading--visible");

		// On .loading__bg css animation completed
		this.timeout = setTimeout(() => {
			this.hide();
		}, 1400);
	}


	/**
	 * HIDE
	 */
	hide() {
		TweenMax.to(this.view, 0.5, {autoAlpha: 0, onComplete: () => {
			this.view.style.display = "none";

			document.body.classList.remove("overflow-hidden");

			this.header.display();

			TweenMax.delayedCall(0.5, () => {
				this.currentPage.display(); // Display current page after header animation
			});

			clearTimeout(this.timeout);
			this.timeout = null;

		}, ease: Power2.easeOut});
	}
}

export default Loading;


// WEBPACK FOOTER //
// ../src/js/custom/shared/Loading.js