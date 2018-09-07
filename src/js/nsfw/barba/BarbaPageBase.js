import ResizeManager from '../managers/ResizeManager';
import BarbaController from './BarbaController';

import Header from '../../custom/views/core/Header';
import Button from '../../custom/views/elements/Button';
import AnimatedTextFill from '../../custom/views/elements/AnimatedTextFill';
import AnimatedCaseStudyBlock from '../../custom/views/elements/AnimatedCaseStudyBlock';
import AnimatedSquareFx from '../../custom/views/elements/AnimatedSquareFx';
import AnimatedBackground from '../../custom/views/elements/AnimatedBackground';
import FadeUp from '../../custom/views/elements/FadeUp';
import FadeLeft from '../../custom/views/elements/FadeLeft';
import ParallaxView from '../dom/ParallaxView';

/**
 * BARBA
 * PAGE
 * BASE
 */

class BarbaPageBase {

	constructor( id, slugs ) {

		// page id
		this.id = id;
		this.verbose = true;
		this.scrollPos = false;

		this.slugs = slugs;
		this.tracking = "";

		// bindings
		this.onEnter 			= ::this.onEnter;
		this.onEnterCompleted 	= ::this.onEnterCompleted;
		this.onLeave 			= ::this.onLeave;
		this.onLeaveCompleted 	= ::this.onLeaveCompleted;
		this.resize 			= ::this.resize;

		// custom bindings
		this.initButtons             = ::this.initButtons;
		this.initParallax            = ::this.initParallax;
		this.initAnimFill            = ::this.initAnimFill;
		this.initAnimatedBackground  = ::this.initAnimatedBackground;
		this.initFadeUp              = ::this.initFadeUp;
		this.initFadeLeft            = ::this.initFadeLeft;
		this.initProjects            = ::this.initProjects;

		this.barbaView = Barba.BaseView.extend({
			namespace: this.id,
			onEnter: this.onEnter,
			onEnterCompleted: this.onEnterCompleted,
			onLeave: this.onLeave,
			onLeaveCompleted: this.onLeaveCompleted
		});

		this.barbaView.init();

		BarbaController.register(this);
	}

	/**
	 * The new Container is readyand attached to the DOM.
	 */
	onEnter() {
		
		if(this.verbose) console.log(`%cBarbaPageBase :: Enter :: ${this.id}`, 'color:#cdc5f0');

		ResizeManager.bind( this.id, this.resize );

		// get the view
		for (let container of Array.from(document.querySelectorAll('.barba-container'))) {

			if (container.getAttribute('data-namespace') === this.id) {

				this.view = container;
				document.title = this.view.getAttribute('data-title');
				if ( this.view.getAttribute('data-image') ) document.querySelector('meta[property="og:image"]').setAttribute("content", this.view.getAttribute('data-image'));

				// Manage language switcher url
				// ============================
				let currentUrl = container.getAttribute('data-permalink');
				if ( currentUrl.includes('/fr/') ){
					document.getElementById('lang-switcher').setAttribute('href',this.view.getAttribute('data-url-en'));
				} else {
					document.getElementById('lang-switcher').setAttribute('href',this.view.getAttribute('data-url-fr'));
				}

				// Hotjar tracking url
				// ===================
				hj('vpv', currentUrl);	
			}
		}

		// Custom code should be added after super.

		// Google Analytics
		// ================
		window.analytics.sendPageview();


		// Manage Buttons
		// ==============
		this.initButtons();

	}

	/**
	 * The Transition has just finished.
	 */
	onEnterCompleted() {

		// Custom code should be added before super.

		// Remove footer if contact page
		// =============================
		this.footer = document.querySelector('footer');
		if ( this.view.getAttribute('data-namespace') == "contact" ){
			this.footer.style.display = "none";
		} else {
			this.footer.style.display = "block";
		}

		// Manage video headers that are not on home
		// =========================================
        if ( this.view.querySelector('#video-background') && this.id != 'home' ){
        	this.video = this.view.querySelector('#video-background');
	        this.video.volume = 0;
	        this.video.play();
        }
		
		// If not home, header button should be light
		// ==========================================
		if ( document.querySelector('header .button') && this.view.getAttribute('data-namespace') !== "contact" ){
			if ( !document.querySelector('.barba-container.page-home') && !document.querySelector('body.scrolled') ){
				document.querySelector('header .button').classList.add('light');
			} else {
				document.querySelector('header .button').classList.remove('light');
			}

			TweenMax.to( document.querySelector('header .button'), 0, {css:{autoAlpha:1} });	
		} 

		// All inits are now in resize()
		this.resize();
	}

	/**
	 * A new Transition toward a new page has just started.
	 */
	onLeave() {

		ResizeManager.unbind( this.id );

		// Buttons destroy
		if(this.buttons){
			for ( let i = 0; i < this.buttons.length; i++ ){
				this.buttons[i].dispose();	
			}
			this.buttons = null;
		}

		// Case study blocks destroy
		if(this.caseStudyBlocks){
			for ( let i = 0; i < this.caseStudyBlocks.length; i++ ){
				this.caseStudyBlocks[i].dispose();	
			}
			this.caseStudyBlocks = null;
		}

		// Animated Square FX destroy
		if(this.squareFxBlocks){
			for ( let i = 0; i < this.squareFxBlocks.length; i++ ){
				this.squareFxBlocks[i].dispose();	
			}
			this.squareFxBlocks = null;
		}

		// Animated Background destroy
		if(this.animatedBackground){
			for ( let i = 0; i < this.animatedBackground.length; i++ ){
				this.animatedBackground[i].dispose();	
			}
			this.animatedBackground = null;
		}

		// Animated Text Fill destroy
		if(this.animFillBlocks){
			for ( let i = 0; i < this.animFillBlocks.length; i++ ){
				this.animFillBlocks[i].dispose();	
			}
			this.animFillBlocks = null;
		}

		// Parallax destroy
		if(this.parallaxBlocks){
			for ( let i = 0; i < this.parallaxBlocks.length; i++ ){
				this.parallaxBlocks[i].dispose();	
			}
			this.parallaxBlocks = null;
		}

		// Fade destroy
		if(this.fadeUpBlocks){
			for ( let i = 0; i < this.fadeUpBlocks.length; i++ ){
				this.fadeUpBlocks[i].dispose();	
			}
			this.fadeUpBlocks = null;
		}

		// Fade destroy
		if(this.fadeLeftBlocks){
			for ( let i = 0; i < this.fadeLeftBlocks.length; i++ ){
				this.fadeLeftBlocks[i].dispose();	
			}
			this.fadeLeftBlocks = null;
		}

		// Video destroy
		if(this.video){
			this.video.pause();
			this.video = null;
		}
	}

	/**
	 * The Container has just been removed from the DOM.
	 */
	onLeaveCompleted() {

		this.dispose();
	}


	/**
	 * Display Transition
	 */
	display( container, promise, context ) {

		if(this.verbose) console.log(`%cBarbaPageBase :: Display :: ${this.id} (${context})`, 'color:#cdc5f0');

		// Default animation needs to be overriden !

		TweenMax.to( container, .3, {css:{autoAlpha:1}});
		TweenMax.delayedCall( .4, promise);

	}

	/**
	 * Hide Transition 
	 */
	hide ( container, promise, context ) {

		if(this.verbose) console.log(`%cBarbaPageBase :: Hide :: ${this.id} (${context})`, 'color:#cdc5f0');

		if(!promise) console.warn('BarbaPageBase ::', this.id,':: Hide :: Promise is missing !');

		// Default animation needs to be overriden !
		// Do not forget the Promise !

		// TweenMax.to( container, .3, {css:{autoAlpha:0}, delay:.65});
		// TweenMax.delayedCall( 1.1, promise);

		TweenMax.to( container, .3, {css:{autoAlpha:0}, delay:.7 });
		TweenMax.delayedCall( 1.1, promise);

	}

	/**
	 * Resize
	 */
	resize ( width = window.w, height = window.h ) {

		this.initParallax();
		this.initSquareFxBlocks();
		this.initProjects();
		this.initAnimatedBackground();
		this.initAnimFill();
		this.initFadeUp();
		this.initFadeLeft();
	}

	/**
	 * Dispose
	 */
	dispose () {


	}

	initButtons(){

		if ( document.querySelectorAll('.button').length > 0 ){
			const buttons = document.querySelectorAll('.button');
			this.buttons = [];

			for(let i = 0; i < buttons.length; i++) {
                this.buttons[i] = new Button(buttons[i]);
            }
		}
	}

	initParallax(){

		if ( this.view.querySelectorAll('.parallax').length > 0 ){

            if( window.w >= 1025 && !this.parallaxBlocks ) {
            	const parallaxBlocks = this.view.querySelectorAll('.parallax');
	            this.parallaxBlocks = [];
	          
	            let options = { amplitude: 220 };

                for(let i = 0; i < parallaxBlocks.length; i++) {
                	if ( parallaxBlocks[i].classList.contains('p-more') ) options = { amplitude: 240 };
                    this.parallaxBlocks[i] = new ParallaxView('parallax-block' + i, parallaxBlocks[i], options);
                }
            }
        }
	}

	initAnimFill(){

		if ( this.view.querySelectorAll('.anim-fill').length > 0 ){
  
            // if( window.w >= 1025 && !this.animFillBlocks ) {
            if( !this.animFillBlocks ) {
            	const animFillBlocks = this.view.querySelectorAll('.anim-fill');
            	this.animFillBlocks = [];

                for(let i = 0; i < animFillBlocks.length; i++) {
                    this.animFillBlocks[i] = new AnimatedTextFill('anim-fill-block' + i, animFillBlocks[i]);
                }
            }
        }
	}

	initAnimatedBackground(){

		if ( this.view.querySelectorAll('.bg-dark').length > 0 ){
            
            // if( window.w >= 1025 && !this.animatedBackground ) {
            if( !this.animatedBackground ) {
            	const animatedBackground = this.view.querySelectorAll('.bg-dark');
            	this.animatedBackground = [];

            	for(let i = 0; i < animatedBackground.length; i++) {
                	animatedBackground[i].classList.remove('bg-dark');
                    this.animatedBackground[i] = new AnimatedBackground('bg-anim-block' + i, animatedBackground[i]);
                }
            }
        }
	}

	initSquareFxBlocks(){

		if ( this.view.querySelectorAll('.fx-square').length > 0 ){
              
            if( window.w >= 1025 && !this.squareFxBlocks ) {
            	const squareFxBlocks = this.view.querySelectorAll('.fx-square');
            	this.squareFxBlocks = [];

                for(let i = 0; i < squareFxBlocks.length; i++) {
                    this.squareFxBlocks[i] = new AnimatedSquareFx('square-fx-block' + i, squareFxBlocks[i]);
                }
            }
        }
	}

	initFadeUp(){

		if ( this.view.querySelectorAll('.fade-up').length > 0 ){
             
            // if( window.w >= 1025 && !this.fadeUpBlocks ) {
            if ( !this.fadeUpBlocks ) {
            	const fadeUpBlocks = this.view.querySelectorAll('.fade-up');
            	this.fadeUpBlocks = [];

                for(let i = 0; i < fadeUpBlocks.length; i++) {
                    this.fadeUpBlocks[i] = new FadeUp('fade-up-block' + i, fadeUpBlocks[i]);
                }
            }
        }
	}

	initFadeLeft(){

		if ( this.view.querySelectorAll('.fade-left').length > 0 ){
               
            // if( window.w >= 1025 && !this.fadeLeftBlocks ) {
            if( !this.fadeLeftBlocks ) {
            	const fadeLeftBlocks = this.view.querySelectorAll('.fade-left');
            	this.fadeLeftBlocks = [];

                for(let i = 0; i < fadeLeftBlocks.length; i++) {
                    this.fadeLeftBlocks[i] = new FadeLeft('fade-left-block' + i, fadeLeftBlocks[i]);
                }
            }
        }
	}

	initProjects(){

		if ( this.view.querySelector('#projets') ){
              
            if( window.w >= 1025 && !this.caseStudyBlocks && window.isDesktop ) {
            	const caseStudyBlocks = this.view.querySelectorAll('#projets .single-project');
            	this.caseStudyBlocks = [];

                for(let i = 0; i < caseStudyBlocks.length; i++) {
                    this.caseStudyBlocks[i] = new AnimatedCaseStudyBlock('case-study-block' + i, caseStudyBlocks[i]);
                }
            }
        }
	}
}

export default BarbaPageBase;