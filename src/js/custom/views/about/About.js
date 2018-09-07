import PageBase from "../../shared/PageBase";
import StickyElement from "../../elements/StickyElement";

class About extends PageBase {
	constructor() {

		super("qui-sommes-nous");

		// Bindings
		this.goToSection = ::this.goToSection;

		// Elements
		this.navButtons = this.view.querySelectorAll(".nav-sections li");
		this.sections = this.view.querySelectorAll(".scroll-section");

		// Params
		this.sectionsTop = [];
		this.currentSection = 0;

		// Events
		for (let i = 0; i < this.navButtons.length; i++) {
			this.navButtons[i].addEventListener("click", this.goToSection);
		}
	}


	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		this.stickyNav = new StickyElement(this.view.querySelector(".nav-sections"), this.view.querySelector(".sticky-ref"), 30, true);

		// Sections offset top
		for (let i = 0; i < this.sections.length; i++) {
			this.sectionsTop[i] = this.sections[i].getBoundingClientRect().top + window.currentScrollTop;
		}
	}


	/**
	 * SCROLL
	 */
	scroll() {

		super.scroll();

		if(this.stickyNav) this.stickyNav.scroll();

		//
		// Change current nav button section
		//
		let currentSection = 0;
		for (let i = this.sectionsTop.length - 1; i >= 0; i--) {
			if(window.currentScrollTop + window.h/2 >= this.sectionsTop[i]) {
				currentSection = i;
				break;
			}
		}

		if(this.currentSection != currentSection) {
			this.navButtons[this.currentSection].classList.remove('current');
			this.navButtons[currentSection].classList.add('current');
			this.currentSection = currentSection;
		}
	}


	/**
	 * GO TO SECTION
	 */
	goToSection(event) {
		const sectionSelected = event.target.getAttribute("data-section");

		if(!event.target.classList.contains("current")) {
			window.scrollBar.scrollIntoView(this.view.querySelector(`#${sectionSelected}`), {offsetTop: 80});
		}
	}


	/**
	 * RESIZE
	 */
	resize() {
		super.resize();

		this.stickyNav.resize();

		// New positions
		for (let i = 0; i < this.sections.length; i++) {
			this.sectionsTop[i] = this.sections[i].getBoundingClientRect().top + window.currentScrollTop;
		}
	}
}

export default About;


// WEBPACK FOOTER //
// ../src/js/custom/views/about/About.js