/**
 * LinkedinShare
 * v1.0
 * 
 * @param  element       {Element} - Share button - REQUIRED
 * @param  title         {String} - Shared along with the link
 * @param  summary       {String} - Shared along with the link
 * @param  source      	 {String} - Source of the content - Shared along with the link
 */

class LinkedinShare {
	constructor(element, title, summary, source) {
		
		// Bindings
		this.share = ::this.share;

		// Elements
		this.element = element;

		// Params
		this.params = "?mini=true&url=" + window.location.origin + window.location.pathname.replace(/\/$/, "") + encodeURIComponent(window.location.hash);
		if(title) this.params += `&title=${title}`;
		if(summary) this.params += `&summary=${summary}`;
		if(source) this.params += `&source=${source}`;

		// Events
		this.element.addEventListener('click', this.share);
	}

	/*
	 * SHARE
	 */
	share(event) {
		event.preventDefault();

		const shareurl = 'https://www.linkedin.com/shareArticle';
		
        window.open(
            shareurl + this.params,
            '_blank'
        );
	}

	
	/*
	 * DISPOSE
	 */
	dispose() {
		this.element.removeEventListener('click', this.share);

		this.element = null;
		this.params = null;
	}
}

export default LinkedinShare;


// WEBPACK FOOTER //
// ../src/js/nsfw/sharing/LinkedinShare.js