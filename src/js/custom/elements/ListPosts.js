import Swiper from "swiper";

class ListPosts {
	constructor(id, view, speed = 1000) {

		// Elements
		this.id = id;
		this.view = view;

		// Params
		this.speed = speed;


		if(window.w <= 768) {
			this.setSlider();
		}
	}


	/*
	 * SET SLIDER
	 */
	setSlider() {
		this.slider = new Swiper(this.view, {
		    speed: this.speed,
			loop: true,
			loopedSlides: 2,
			slidesPerView: 'auto',
			pagination: '.list-posts__pagination',
		    paginationClickable: true,
			wrapperClass: 'list-posts__row',
			slideClass: 'list-posts__slide'
		});
	}
	

	/*
	 * RESIZE
	 */
	resize() {
		if(window.w > 768 && this.slider) {
			this.slider.destroy(true, true);

			this.slider = null;
		}
		else if(window.w <= 768 && !this.slider) {
			this.setSlider();
		}
	}
}

export default ListPosts;


// WEBPACK FOOTER //
// ../src/js/custom/elements/ListPosts.js