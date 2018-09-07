import ResizeManager from 'nsfw/managers/ResizeManager';
import SmoothScrollManager from 'nsfw/managers/SmoothScrollManager';

import IframeVideo from '../elements/IframeVideo';
import SliderPosts from '../elements/SliderPosts';
import ListPosts from '../elements/ListPosts';
import Pastille from '../elements/Pastille';
import SliderPastilles from '../elements/SliderPastilles';
import FilterSelect from '../elements/FilterSelect';
import ExpertBar from '../elements/ExpertBar';
import FadeIn from '../shared/animations/FadeIn';
import AnimateChilds from '../shared/animations/AnimateChilds';
import AnimateSocials from '../shared/animations/AnimateSocials';
import ScrollEvents from '../shared/ScrollEvents';

import Revealer from './animations/Revealer';

class PageBase {
	
	constructor(id) {
		// Bindings
		this.scroll = ::this.scroll;
		this.resize = ::this.resize;
		this.gtmClickPostes = ::this.gtmClickPostes;

		// Elements
		this.id = id;
		this.view = document.querySelector(`main > .${id}`);
	
		// Managers
		SmoothScrollManager.bind(this.id, this.scroll);
		ResizeManager.bind(this.id, this.resize);

		// Init
		this.iframeVideos = [];
		this.sliderPosts = [];
		this.listPosts = [];
        this.sliderPastilles = [];
		this.pastilles = [];
		this.filterSelects = [];
		this.revealers = [];
		this.fadeIn = [];
		this.animateChilds = [];
		this.animateSocials = [];
		this.scrollEvents = null;
	}


	/**
	 * DISPLAY
	 */
	display() {

		// -------------
        // Components
		// -------------

		// Manage iframe embeds
		const iframeVideos = this.view.querySelectorAll("iframe:not(#player)");
		for (let i = 0; i < iframeVideos.length; i++) {
			this.iframeVideos[i] = new IframeVideo('iframe-videos-' + i, iframeVideos[i]);
		}

		// Slider Posts
		const sliderPosts = this.view.querySelectorAll(".slider-posts");
		for (let i = 0; i < sliderPosts.length; i++) {
			this.sliderPosts[i] = new SliderPosts('slider-posts-' + i, sliderPosts[i]);
		}

		// List Posts
		const listPosts = this.view.querySelectorAll(".list-posts");
		for (let i = 0; i < listPosts.length; i++) {
			this.listPosts[i] = new ListPosts('list-posts-' + i, listPosts[i]);
		}

        // Swiper Pastilles
        const sliderPastilles = this.view.querySelectorAll('.wrap-swiper-pastilles');
		for(let i = 0; i < sliderPastilles.length; i++) {
			if ( sliderPastilles[i].classList.contains('wrap-swiper-pastilles--services') ){
				this.sliderPastilles[i] = new SliderPastilles('slider-pastille-' + i, sliderPastilles[i], 5, true);
			} else {
				this.sliderPastilles[i] = new SliderPastilles('slider-pastille-' + i, sliderPastilles[i]);
			}
        }

        // Pastilles
        const pastilles = this.view.querySelectorAll('.pastille');
		for(let i = 0; i < pastilles.length; i++) {
            this.pastilles[i] = new Pastille('pastille-' + i, pastilles[i]);
        }

        // Filter Select
        const filterSelects = this.view.querySelectorAll('.search-filter__wrapfilter');
		for(let i = 0; i < filterSelects.length; i++) {
            this.filterSelects[i] = new FilterSelect('filter-select-' + i, filterSelects[i], this.id, this.searchFilterOfficesHeight);
        }

        // Expert bar
        const expertBar = document.querySelector('.expert--fixed-bar'); 
        if ( expertBar ) this.expertBar = new ExpertBar('expert-bar', expertBar);

        //GTM lien postes ouverts
        const linksGTMpostes = document.querySelectorAll('.gtm-postes a');
        for (let i = 0; i < linksGTMpostes.length; i++) {
        	linksGTMpostes[i].addEventListener('click', this.gtmClickPostes);
        }


		// -------------
        // Animations
		// -------------
		
		// Revealers
		const revealers = this.view.querySelectorAll(".anim--revealer");
		for (let i = 0; i < revealers.length; i++) {
			this.revealers[i] = new Revealer(`${this.id}-revealer-${i}`, revealers[i]);
		}

		// Fade in
		const fadeIn = document.querySelectorAll('.anim--fade');
		for(let i = 0; i < fadeIn.length; i++){
			let direction = "up", delay = 0, triggerRatio = 0.85;
			if (fadeIn[i].getAttribute('data-anim-direction')) direction = fadeIn[i].getAttribute('data-anim-direction');
			if (fadeIn[i].getAttribute('data-anim-delay')) delay = parseFloat(fadeIn[i].getAttribute('data-anim-delay'));
			if (fadeIn[i].getAttribute('data-anim-ratio')) triggerRatio = parseFloat(fadeIn[i].getAttribute('data-anim-ratio'));
			this.fadeIn[i] = new FadeIn('fade-' + i, fadeIn[i], direction, delay, triggerRatio);
		}

        // Animate childs
        const animateChilds = document.querySelectorAll('.anim--childs');
		for(let i = 0; i < animateChilds.length; i++) {
			let direction = "up", delay = 0, triggerRatio = 0.85;
			if (animateChilds[i].getAttribute('data-anim-direction')) direction = animateChilds[i].getAttribute('data-anim-direction');
			if (animateChilds[i].getAttribute('data-anim-delay')) delay = parseFloat(animateChilds[i].getAttribute('data-anim-delay'));
			if (animateChilds[i].getAttribute('data-anim-ratio')) triggerRatio = parseFloat(animateChilds[i].getAttribute('data-anim-ratio'));
			this.animateChilds[i] = new AnimateChilds('anim-childs-' + i, animateChilds[i], direction, delay, triggerRatio);
        }

        // Animate socials
        const animateSocials = this.view.querySelectorAll('.wrap-social .social--column');
		for(let i = 0; i < animateSocials.length; i++) {
			this.animateSocials[i] = new AnimateSocials('anim-socials-' + i, animateSocials[i]);
        }

        // -------------
        // Scroll events
		// -------------
		this.scrollEvents = new ScrollEvents('scroll-events');

	}

	//Tracking GTM sur lin open positions
	gtmClickPostes(){
		var dataLayer = window.dataLayer || [];
		  dataLayer.push({
		    'event': 'career',
		    'eventAction': 'click on open positions',
		    'eventLabel': ''
		  });
	}

	/**
	 * SCROLL
	 */
	scroll() {
	}


	/**
	 * RESIZE
	 */
	resize() {
	
		// -------------
		// Components
		// -------------
	
		// Slider Posts
		for (let i = 0; i < this.sliderPosts.length; i++) {
			this.sliderPosts[i].resize();
		}

		// List Posts
		for (let i = 0; i < this.listPosts.length; i++) {
			this.listPosts[i].resize();
		}

		// Swiper Pastilles
		for (let i = 0; i < this.sliderPastilles.length; i++) {
			this.sliderPastilles[i].resize();
		}

		// Filter Select
		if ( this.filterSelects.length > 0 ){
			for(let i = 0; i < this.filterSelects.length; i++) {
	            this.filterSelects[i].resize();
	        }
		}

		// Expert Bar
		if ( this.expertBar ){
	        this.expertBar.resize();
		}


		// -------------
		// Animations
		// -------------
		
		// Revealers
		for (var i = 0; i < this.revealers.length; i++) {
			this.revealers[i].resize();
		}

		// Fade in
		for(let i = 0; i < this.fadeIn.length; i++){
			this.fadeIn[i].resize();
		}

        // Animate childs
		for(let i = 0; i < this.animateChilds.length; i++) {
			this.animateChilds[i].resize();
        }
	}
}

export default PageBase;


// WEBPACK FOOTER //
// ../src/js/custom/shared/PageBase.js