/**
 * Visibility Manager
 *
 * v1.0
 */

class VisibilityManager {


	static start() {

		// security check
		if(VisibilityManager.views) return;

		VisibilityManager.views = [];

		document.addEventListener('visibilitychange', VisibilityManager.handleVisibility);
	}

	/**
	 * bind - add a callback
	 * 
	 * @param  id {String} - must be unique 
	 * @param  fn {Function} - callback function called on «visibilitychange»
	 */
	static bind(id, fn) {

		VisibilityManager.views.push({id:id,fn:fn});
	}

	/**
	 * unbind - remove an existing callback
	 * 
	 * @param  id {String}
	 */
	static unbind(id) {

		let tgtID = -1;

		for(let i=0; i < VisibilityManager.views.length; i++)
		{
			if(VisibilityManager.views[i].id === id)
			{
				tgtID = i;
				break;
			}
		}

		if( tgtID > -1 ) VisibilityManager.views.splice( tgtID, 1);
	}

	/**
	 * Visible
	 */
	static handleVisibility() {

		const isVisible = !document.hidden;

		for(let i=0; i < VisibilityManager.views.length; i++) VisibilityManager.views[i].fn(isVisible);

	}

}

export default VisibilityManager;