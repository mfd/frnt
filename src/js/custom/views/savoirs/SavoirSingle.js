import PageBase from "../../shared/PageBase";

import ParallaxImage from "../../shared/animations/ParallaxImage";

import ProgressBar from "../../elements/ProgressBar";
import Shares from "../../elements/Shares";
import DownloadLink from "../../elements/DownloadLink";

class SavoirSingle extends PageBase {
	constructor() {
		
		super("savoir");

		// Elements
		this.progressBar = new ProgressBar("en-action-progress-bar", this.view.querySelector(".progress-bar"));

		// Animation hover download links for IE & Edge only
		if(window.isEdge || window.isIE) {
			const downloadLinks = this.view.querySelectorAll(".documents__elem");
			this.downloadLinks = [];
			for (let i = 0; i < downloadLinks.length; i++) {
				this.downloadLinks[i] = new DownloadLink(downloadLinks[i]);
			}
		}

		if(window.isMobile) {
			const bannerHeader = this.view.querySelector(".banner-header");
			if(bannerHeader.getAttribute('data-vignette'))
				bannerHeader.style.backgroundImage = `url(${bannerHeader.getAttribute('data-vignette')})`;
		}
	}


	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		this.sharings = new Shares(this.view.querySelector(".sharing"));
		
		if(window.isDesktop) {
			const parallaxImages = this.view.querySelectorAll(".banner-header--parallax .banner-header__content");
			this.parallaxImages = [];
			for (let i = 0; i < parallaxImages.length; i++) {
				this.parallaxImages[i] = new ParallaxImage("savoir-parallax-image-" + i, parallaxImages[i], {amplitude: 200, depth: -1});
			}
		}
	}


	/**
	 * SCROLL
	 */
	scroll() {
		super.scroll();

		this.progressBar.scroll();
	}


	/**
	 * RESIZE
	 */
	resize() {
		super.resize();

		this.progressBar.resize();
	}
}

export default SavoirSingle;


// WEBPACK FOOTER //
// ../src/js/custom/views/savoirs/SavoirSingle.js