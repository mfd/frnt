/**
 * Resize Manager
 *
 * v1.0
 */

class ResizeManager {

	constructor( debounceTime ) {

		this.views = [];

		this.timer = -1;
		this.debounceTime = debounceTime;
	}

	static start( debounce = true, debounceTime = 400 ) {

		if(!ResizeManager.instance) ResizeManager.instance = new ResizeManager( debounceTime );

		window.addEventListener('resize', debounce ? ResizeManager.debounceResize : ResizeManager.resize );

		ResizeManager.resize();
	}

	/**
	 * bind - add a callback
	 * 
	 * @param  id {String} - must be unique 
	 * @param  fn {Function} - callback function called on «resize»
	 */
	static bind(id, fn) {

		ResizeManager.instance.views.push({id:id,fn:fn});
	}

	/**
	 * unbind - remove an existing callback
	 * 
	 * @param  id {String}
	 */
	static unbind(id) {

		let tgtID = -1;
		const instance = ResizeManager.instance;

		for(let i=0; i < instance.views.length; i++)
		{
			if(instance.views[i].id === id)
			{
				tgtID = i;
				break;
			}
		}

		if( tgtID > -1 ) instance.views.splice(tgtID, 1);
	}

	/**
	 * Debounced Resize
	 */
	static debounceResize () {

		window.clearTimeout( ResizeManager.instance.timer );

		ResizeManager.instance.timer = window.setTimeout( ResizeManager.resize, ResizeManager.instance.debounceTime );
	}

	/**
	 * Resize
	 */
	static resize() {

		const views = ResizeManager.instance.views;

		window.w = document.documentElement.clientWidth;
		window.h = document.documentElement.clientHeight;

		for(let i=0; i < views.length; i++) views[i].fn(window.w,window.h);
	}

}

export default ResizeManager;