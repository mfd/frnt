import { getScrollTop } from '../utils/scroll';

/**
 * Smooth ScrollManager
 *
 * Wrap of 
 * https://github.com/idiotWu/smooth-scrollbar
 * 
 */

class SmoothScrollManager {

	constructor ( options ) {

		this.scroll = ::this.scroll;

		if(!Scrollbar) {
			console.error('SmoothScrollManager :: Scrollbar plugin needed.');
			return;
		}

		// elements
		this.barbaWrapper = document.querySelector('#barba-wrapper');

		this.views = [];

		window.keepItOnTop = false;
	}

	static init() {

		const instance = SmoothScrollManager.instance;

		window.currentScrollTop = 0;

		// window.scrollBar = Scrollbar.init(instance.barbaWrapper, {speed:.9});
		window.scrollBar = Scrollbar.init(document.querySelector('.scroll-wrapper'), {speed:.9});
		window.scrollBar.addListener(instance.scroll);		
	}

	static lock( status ) {

		window.keepItOnTop = status;
	}
	

	static start( options = {} ) {

		window.currentScrollTop = 0;

		SmoothScrollManager.instance = new SmoothScrollManager();	

		SmoothScrollManager.init();	
	}

	/**
	 * Smooth scroll
	 */
	scroll ( status ) {

		// TODO: Check if it's really efficient

		if(window.keepItOnTop) {

			window.scrollBar.stop();
			window.scrollBar.setPosition(0,0);
			window.currentScrollTop = 0;

		} else {

			window.currentScrollTop = status.offset.y;
			window.currentScrollDirection = status.direction.y;
		}


		for(let i=0; i < this.views.length; i++) this.views[i].fn();
	}

	/**
	 * Bind
	 * Add view
	 */
	static bind( id, fn) {

		SmoothScrollManager.instance.views.push({id:id,fn:fn});
	}

	static unbind(id) {

		const instance = SmoothScrollManager.instance;

		let tgtID = -1;

		for(let i=0; i < instance.views.length; i++)
		{
			if(instance.views[i].id === id)
			{
				tgtID = i;
				break;
			}
		}

		if( tgtID > -1 ) instance.views.splice( tgtID, 1);
	}
}

export default SmoothScrollManager;