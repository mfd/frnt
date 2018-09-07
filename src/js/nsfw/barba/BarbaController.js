import SmoothScrollManager from 'nsfw/managers/SmoothScrollManager';
import Events from 'nsfw/events/Events';
import EventsManager from 'nsfw/events/EventsManager';
import { scrollTo } from '../utils/scroll';

/**
 * 
 * BARBA 
 * CONTROLLER
 * 
 * Based on http://barbajs.org
 *
 * (CUSTOM)
 * CUSTOM MADE FOR IGOTCHA
 */

class BarbaController {

	static init( verbose = true ) {

		window.Barba = require('barba.js');

		// params
		BarbaController.context = null;
		BarbaController.verbose = verbose;
		BarbaController.pages = {};
		BarbaController.callbacks = {
			'before' : [],
			'after' : []
		};
		BarbaController.lang = document.documentElement.lang.split("-")[0];

		// Barba
		Barba.Pjax.getTransition 	= BarbaController.getTransition;
		Barba.Pjax.onLinkClick 		= BarbaController.onLinkClick; // special trick 
		Barba.Pjax.start();

		BarbaController.container = Barba.Pjax.Dom.getWrapper();

	}

	/**
	 * Start
	 * Inits and displays the current view loaded by CMS
	 */
	static start( delay = .3 ) {

		const container = document.querySelector('.barba-container');
        const first = BarbaController.pages[ container.getAttribute('data-namespace') ];

        first.onEnter();

        TweenMax.delayedCall( delay, ()=>{ 
        	BarbaController.loader.hide();
        	first.display( container, first.onEnterCompleted, 'start' );

        	// Event - Page changed
			EventsManager.emit(Events.Header.UPDATE, { pageid:first.view.getAttribute('data-permalink') });
        });
	}


	/**
	 * Get Transition
	 */
	static getTransition () {

		return Barba.BaseTransition.extend({

			start: function() {
		
				SmoothScrollManager.lock(true);
		
				BarbaController.loader.display();

				const before = BarbaController.callbacks.before; 
				if(before.length > 0) for(let i = 0; i < before.length; i++ ) before[i]();

				Promise
					.all([this.newContainerLoading, this.hideCurrent()])
					.then(this.display.bind(this));
			},

			hideCurrent: function() {
			 
				let deferred = Barba.Utils.deferred();

				if(BarbaController.verbose) console.log('%cHide current', 'color:#ccc;');

				const id 	= this.oldContainer.getAttribute('data-namespace');
				const page 	= BarbaController.pages[id];
				const ctx 	= BarbaController.context;

				page.hide( this.oldContainer, deferred.resolve, ctx );

				return deferred.promise;
			},

			display: function() {

				if(BarbaController.verbose) console.log('%cDisplay', 'color:#ccc;', this.newContainer.getAttribute('data-namespace'));

				const id 	= this.newContainer.getAttribute('data-namespace'); 
				const page 	= BarbaController.pages[id];
				const ctx 	= BarbaController.context;

				if(!page) console.error(`BarbaController :: View doesn't exist`);

				scrollTo(0,0);

				// append content at the right spot
				const smoothScrollContent = BarbaController.container.querySelector('.scroll-content');

				if(smoothScrollContent)
					smoothScrollContent.appendChild(this.newContainer);
				else
					BarbaController.container.appendChild(this.newContainer);


				this.oldContainer.parentNode.removeChild(this.oldContainer);

				if ( !page.scrollPos ){
					window.scrollBar.stop();
					window.scrollBar.setPosition(0, 0);
				}

				page.display( this.newContainer, this.deferred.resolve, ctx );

				const after = BarbaController.callbacks.after; 
				if(after.length > 0) for(let i = 0; i < after.length; i++ ) after[i]();

				// Event - Page changed
				EventsManager.emit(Events.Header.UPDATE, { pageid:this.newContainer.getAttribute('data-permalink') });

				// clean up
				//TweenMax.delayedCall( .5, ()=>{
					
					/**
					 * We used to call «this.done();» 
					 * But what we really need here is to get rid of the old container
					 * and that's what we do.
					 * 
					 * You could of course set a more accurate delay.
					 */

					//this.oldContainer.parentNode.removeChild(this.oldContainer);
				//});

				

				BarbaController.loader.hide();

				// reset
				SmoothScrollManager.lock(false);
				
				window.scrollBar.stop();
				BarbaController.context = null;
			}
		});
	}

	/**
	 * Add Loader
	 * Loader object needs to get a display/hide methods
	 */
	static addLoader( loader ) {

		BarbaController.loader = loader;

	}

	/**
	 * Register 
	 * Page must extends BarbaPageBase !
	 */
	static register( page ) {

		BarbaController.pages[page.id] = page;

		// TODO: auto-caching
	}

	/**
	 * Add CallBack
	 * Param must be function
	 */
	static addCallBack ( callback, timing ) {

		if( timing !== 'before' && timing !== 'after' ) {
			console.error('BarbaController :: addCallBack :: Timing is invalid', timing);
			return;
		}

		BarbaController.callbacks[timing].push(callback);

	}

	/**
	 * Go To
	 * - Add a specific context
	 * - Useful for multi-transitions website.
	 */
	static goto( url, context ) {

		BarbaController.context = context;
	
		Barba.Pjax.goTo(url);
	}

	static onLinkClick (evt) {
		let el = evt.target;

		//Go up in the nodelist until we
		//find something with an href
		while (el && !Barba.Pjax.getHref(el)) {
			el = el.parentNode;
		}

		if (Barba.Pjax.preventCheck(evt, el)) {
			evt.stopPropagation();
			evt.preventDefault();

			Barba.Dispatcher.trigger('linkClicked', el, evt);

			BarbaController.context = el.getAttribute('data-context');

			this.goTo( Barba.Pjax.getHref(el) );

		}
	}

}

export default BarbaController;