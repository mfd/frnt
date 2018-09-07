import { getScrollTop } from '../utils/scroll';

/**
 * Scroll Manager
 */

class ScrollManager {


	static start() {

		ScrollManager.views = [];

		if (window.isSafari) {
			window.wrapper.addEventListener('scroll', ScrollManager.scroll );
		} else {
			window.addEventListener('scroll', ScrollManager.scroll );
		}

		ScrollManager.scroll();
	}

	/**
	 * Scroll
	 */
	static scroll() {

		window.currentScrollTop = getScrollTop();

		for(let i=0; i < ScrollManager.views.length; i++) ScrollManager.views[i].fn();

	}

	/**
	 * Bind
	 * Add view
	 */
	static bind( id, fn) {

		ScrollManager.views.push({id:id,fn:fn});
	}

	static unbind(id) {

		let tgtID = -1;

		for(let i=0; i < ScrollManager.views.length; i++)
		{
			if(ScrollManager.views[i].id === id)
			{
				tgtID = i;
				break;
			}
		}

		if( tgtID > -1 ) ScrollManager.views.splice( tgtID, 1);
	}
}

export default ScrollManager;