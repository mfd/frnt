import PageBase from "../../shared/PageBase";

import PromoHeader from './PromoHeader';

class Home extends PageBase {
	constructor() {
		
		super("home");

		//Bindings
		this.gtmBlocksPromo = ::this.gtmBlocksPromo;

		//GTM for Promo blocks
		this.promoBlocks = this.view.querySelectorAll(".promo-header a");
		
		for (let i = 0; i < this.promoBlocks.length; i++) {
			this.promoBlocks[i].addEventListener('click',this.gtmBlocksPromo);
		}
	}

	// Send GTM info for Promo block
	gtmBlocksPromo(e){
		let link = e.currentTarget.getAttribute("href");

		var dataLayer = window.dataLayer || [];
		dataLayer.push({
		  'event':'engagement',
		  'eventAction':'click on article box',
		  'eventLabel': link
		});
	}

	/**
 	 * DISPLAY
 	 */
	display() {
		super.display();

		if(window.w <= 768) {
			this.promoHeader = new PromoHeader(this.view.querySelector(".promo-header"));
		}
	}


	/**
	 * RESIZE
	 */
	resize() {
		super.resize();

		if(window.w <= 768 && !this.promoHeader) {
			this.promoHeader = new PromoHeader(this.view.querySelector(".promo-header"));
		}
		else if (window.w > 768 && this.promoHeader) {
			this.promoHeader.destroy();
			this.promoHeader = null;
		}
	}
}

export default Home;


// WEBPACK FOOTER //
// ../src/js/custom/views/home/Home.js