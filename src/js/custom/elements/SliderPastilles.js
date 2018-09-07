/**
 * Slider Pastilles
 */

class SliderPastilles {

    constructor (id, view, slidesPerView = 4, isServices = false) {

        // Elements
        this.id = id;
        this.view = view;
        this.container = this.view.querySelector('.swiper-container');
        this.slides = this.view.querySelectorAll('.pastille');
        this.nextButton = this.view.querySelector('.swiper-button-next');
        this.prevButton = this.view.querySelector('.swiper-button-prev');
        this.previousSlide = null;
        this.nextSlide = null;    
        this.shrinked = null;
        this.visibleSlides = null;
        this.loopedSlides = this.view.querySelector('.swiper-wrapper').childElementCount;

        // Bindings
        this.initSlider = ::this.initSlider;
        this.resetSlidesAnimState = ::this.resetSlidesAnimState;
        this.manageDuplicates = ::this.manageDuplicates;

        // Params
        this.slidesPerView = slidesPerView;
        this.isServices = isServices;


        // Max slides in view
        if(window.w >= 1440) {
            this.maxSlidesLength = 5;
        }
        else if(window.w >= 1024) { 
            this.maxSlidesLength = 4;
        }
        else if(window.w >= 768) {
            this.maxSlidesLength = 3;
        }
        else {
            this.maxSlidesLength = 2;
        }

        // Slider only if slides don't fit in page width
        if(this.isServices && this.slides.length <= this.maxSlidesLength) {
            this.view.querySelector(".nav-buttons").style.display = "none";
        }
        else {
            this.initSlider();
        }
    }

    initSlider(){

        if ( this.sliderPastilles ) this.sliderPastilles.destroy(true,true); this.sliderPastilles = null;

        // Init
        this.sliderPastilles = new Swiper(this.container, {
            loop: true,
            loopedSlides : this.loopedSlides,
            slidesPerView: this.slidesPerView,
            spaceBetween: 20,
            speed: 850,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,

            // Navigation arrows
            nextButton: this.nextButton,
            prevButton: this.prevButton,

            // Responsive breakpoints
            breakpoints: {
                600: {
                  slidesPerView: 1 
                },
                979: {
                  slidesPerView: 2 
                },
                1299: {
                  slidesPerView: this.slidesPerView - 1
                }
            }
        });

        this.sliderPastilles.on('slideNextStart', function (s) { 

            this.visibleSlides = document.querySelectorAll('.wrap-swiper-pastilles .pastille.swiper-slide-visible');
            
            // Fade out current slide (position 0) on next slide
            this.currentSlide = this.visibleSlides[0].previousElementSibling;
            this.currentSlide.classList.add('shrink');

            // Fade in next slide (position slideCount) on next slide
            this.newSlide = this.visibleSlides[this.visibleSlides.length - 1];
            this.newSlide.classList.add('pre-shrink','shrink');

            setTimeout( () => { this.newSlide.classList.remove('shrink'); }, 20 );

        });

        this.sliderPastilles.on('slidePrevStart', function (s) {
 
            this.visibleSlides = document.querySelectorAll('.wrap-swiper-pastilles .pastille.swiper-slide-visible');

            // Fade out last slide (position slideCount) on previous slide 
            this.lastSlide = this.visibleSlides[this.visibleSlides.length - 1].nextElementSibling;
            this.lastSlide.classList.add('shrink');

            // Fade in prev slide (position 0) on previous slide
            this.newSlide = this.visibleSlides[0];
            this.newSlide.classList.add('pre-shrink','shrink');

            setTimeout( () => { this.newSlide.classList.remove('shrink'); }, 10 );

        });

        this.sliderPastilles.on('slideChangeEnd', function (s) {

            for ( let i = 0; i < s.slides.length; i++ ){
                if ( s.slides[i].classList.contains('shrink') ) s.slides[i].classList.remove('shrink');
                if ( s.slides[i].classList.contains('pre-shrink') ) s.slides[i].classList.remove('pre-shrink');
            }

        });

        this.manageDuplicates();
    }


    // Reset slides animation state prior to transition
    resetSlidesAnimState(s){

        // Visible slides
        this.visibleSlides = this.container.querySelectorAll('.pastille.swiper-slide-visible');

        // Current slide (first on the left)
        this.currentSlide = this.container.querySelector('.pastille.swiper-slide-visible.swiper-slide-active');

        // Add shrink class to previous slide, prep for animation
        this.previousSlide = this.visibleSlides[0].previousElementSibling;
        this.previousSlide.classList.add('shrink');

        // Add shrink class to next slide, prep for animation
        this.nextSlide = this.visibleSlides[this.visibleSlides.length - 1].nextElementSibling;
        this.nextSlide.classList.add('shrink');      
    }


    // Change ids to manage duplicates and keep mask working
    manageDuplicates(){

        // Manage duplicate IDs from swiper loop
        this.duplicates = this.sliderPastilles.container[0].querySelectorAll('.pastille--image.swiper-slide');

        for ( let i = 0; i < this.duplicates.length; i++ ){

            // Vars
            let mask = this.duplicates[i].querySelector('svg > defs > mask');
            let image = this.duplicates[i].querySelector('svg > image');

            // Update values
           let id = mask.getAttribute('id');
           let newId = id+i;

           mask.setAttribute('id', newId);
           image.setAttribute('mask','url(#'+newId+')');
        }
    }


    /**
     * RESIZE
     */
    resize() {
        // Max slides in view
        if(window.w >= 1440) {
            this.maxSlidesLength = 5;
        }
        else if(window.w >= 1024) {
            this.maxSlidesLength = 4;
        }
        else if(window.w >= 768) {
            this.maxSlidesLength = 3;
        }
        else {
            this.maxSlidesLength = 2;
        }

        // Slider only if slides don't fit in page width
        if(this.isServices && this.slides.length <= this.maxSlidesLength && this.sliderPastilles) {
            this.sliderPastilles.destroy(true, true);
            this.sliderPastilles = null;

            this.view.querySelector(".nav-buttons").style.display = "none";
        }
        else if(this.isServices && this.slides.length > this.maxSlidesLength && !this.sliderPastilles) {
            this.initSlider();
         
            this.view.querySelector(".nav-buttons").style.display = "block";
        }
    }
}

export default SliderPastilles;


// WEBPACK FOOTER //
// ../src/js/custom/elements/SliderPastilles.js