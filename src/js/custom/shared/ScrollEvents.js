import RafManager from 'nsfw/managers/RafManager';

class ScrollEvents {

	constructor(id) {

		// Els
		this.id = id;
		this.reached30, this.reached60, this.reached90 = false;
		this.pageHeight = document.querySelector('.scroll-content').offsetHeight;

		// Bindings
		this.scroll = ::this.scroll;

		RafManager.bind('scrolling', this.scroll);
	}

	scroll() {

		if ( window.currentScrollTop + window.h > this.pageHeight * 0.3 && !this.reached30 ) {	

			this.reached30 = true;

			var dataLayer = window.dataLayer || []; 
			dataLayer.push({
			  'event':'scroll',
			  'eventAction':'scroll to 30%',
			  'eventLabel':''
			});
		}

		if ( window.currentScrollTop + window.h > this.pageHeight * 0.6 && !this.reached60 ) {	

			this.reached60 = true;

			var dataLayer = window.dataLayer || [];
			dataLayer.push({
			  'event':'scroll',
			  'eventAction':'scroll to 60%',
			  'eventLabel':''
			});
		}

		if ( window.currentScrollTop + window.h > this.pageHeight * 0.9 && !this.reached90 ) {	

			this.reached90 = true;

			var dataLayer = window.dataLayer || [];
			dataLayer.push({
			  'event':'scroll',
			  'eventAction':'scroll to 90%',
			  'eventLabel':''
			});
		}

	}
}

export default ScrollEvents;


// WEBPACK FOOTER //
// ../src/js/custom/shared/ScrollEvents.js