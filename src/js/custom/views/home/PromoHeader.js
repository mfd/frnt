import Swiper from "swiper";

class PromoHeader {
	constructor(view) {

		// Elements
		this.view = view;

		// Params
		this.sliderDuration = 5000;
		this.sliderTransition = 1000;


		// Set slider
		this.slider = new Swiper(this.view, {
			loop: true,
			loopedSlides: 1,
            spaceBetween: 15,
		    autoplay: this.sliderDuration,
		    speed: this.sliderTransition,
			autoplayDisableOnInteraction: false,
			pagination: '.swiper-pagination',
		    paginationClickable: true,
			wrapperClass: 'promo-header__row',
			slideClass: 'promo-header__slide'
		});
	}

	
	/**
	* DESTROY
	*/
	destroy() {
		this.slider.destroy(true, true);

		this.view = null;
	}
}

export default PromoHeader;


// WEBPACK FOOTER //
// ../src/js/custom/views/home/PromoHeader.js