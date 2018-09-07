import Swiper from 'swiper';

class SliderPosts {
	constructor(id, view, speed = 1000) {

		// Elements
		this.id = id;
		this.view = view;
		this.container = this.view.querySelector('.slider-posts__slider');
        this.slides = this.container.querySelectorAll('.slider-posts__slide');

		// Params
		this.speed = speed;
		this.onlyMobile = this.view.classList.contains("slider-posts--sm");


		// Max slides in view
        if(window.w > 768) {
            this.maxSlidesLength = 2;
        }
        else {
            this.maxSlidesLength = 1;
        }

		// Set slider
		if(this.onlyMobile) {
			// Slider only for mobile (and only if slides don't fit in page width)
			if(window.w <= 768 && this.slides.length > this.maxSlidesLength) {
				this.setSlider();
			}
			else if(window.w <= 768 && this.slides.length <= this.maxSlidesLength) {
	            this.view.querySelector(".slider-posts__nav-buttons").style.display = "none";
			}
		}
		else {
			// Slider only if slides don't fit in page width
			if(this.slides.length <= this.maxSlidesLength) {
	            if ( this.view.querySelector(".slider-posts__nav-buttons") ) this.view.querySelector(".slider-posts__nav-buttons").style.display = "none";
	        }
	        else {
	            this.setSlider();
	        }
		}
		
	}


	/*
	 * SET SLIDER
	 */
	setSlider() {
		this.view.classList.add("slider-posts--enabled");

		this.slider = new Swiper(this.container, {
		    speed: this.speed,
			loop: true,
			loopedSlides: Math.floor(this.slides.length / 2) + 1,
			slidesPerView: 'auto',
			nextButton: '.nav-button--right',
			prevButton: '.nav-button--left',
			wrapperClass: 'slider-posts__row',
			slideClass: 'slider-posts__slide',
			onClick: (swiper, event) => {
				// Slide to prev or next on click on slide
				if(swiper.clickedSlide) {
					if(swiper.clickedIndex < swiper.activeIndex) {
						swiper.slidePrev();
					}
					else if(swiper.clickedIndex > swiper.activeIndex) {
						swiper.slideNext();
					}
				}
			}
		});
	}


	/*
	 * RESIZE
	 */
	resize() {
		// Max slides in view
        if(window.w > 768) {
            this.maxSlidesLength = 2;
        }
        else {
            this.maxSlidesLength = 1;
        }
		

		// Set slider
		if(this.onlyMobile) {
			// Slider only for mobile (and only if slides don't fit in page width)
			if(window.w > 768 && this.slider) {
				this.slider.destroy(true, true);
				this.slider = null;
	          
				this.view.classList.remove("slider-posts--enabled");
	            this.view.querySelector(".slider-posts__nav-buttons").style.display = "none";
			}
			else if(window.w <= 768 && !this.slider && this.slides.length > this.maxSlidesLength) {
				this.setSlider();

	            this.view.querySelector(".slider-posts__nav-buttons").style.display = "block";
			}
			else if(window.w <= 768 && !this.slider && this.slides.length <= this.maxSlidesLength) {
	            this.view.querySelector(".slider-posts__nav-buttons").style.display = "none";
			}
		}
		else {
			// Slider only if slides don't fit in page width
			if(this.slides.length > this.maxSlidesLength && !this.slider) {
	            this.setSlider();
	           
	            this.view.querySelector(".slider-posts__nav-buttons").style.display = "block";
	        }
	        else if(this.slides.length <= this.maxSlidesLength && this.slider) {
	        	this.slider.destroy(true, true);
				this.slider = null;

				this.view.classList.remove("slider-posts--enabled");
	            this.view.querySelector(".slider-posts__nav-buttons").style.display = "none";
	        }
		}
	}
}

export default SliderPosts;


// WEBPACK FOOTER //
// ../src/js/custom/elements/SliderPosts.js