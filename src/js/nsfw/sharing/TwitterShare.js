/**
 * TwitterShare
 * v1.0
 * 
 * @param  element       {Element} - Share button - REQUIRED
 * @param  text          {String} - Shared along with the link
 * @param  hashtags      {String} - Comma-seperated list of hashtags (without #)
 * @param  via           {String} - A Twitter username to associate to the Tweet
 */

class TwitterShare {
	constructor(element, text, hashtags, via) {
		
		// Bindings
		this.share = ::this.share;

		// Elements
		this.element = element;

		// Params
		this.params = "?url=" + window.location.origin + window.location.pathname.replace(/\/$/, "") + encodeURIComponent(window.location.hash);
		if(text) this.params += `&text=${text}`;
		if(hashtags) this.params += `&hashtags=${hashtags}`;
		if(via) this.params += `&via=${via}`;

		// Events
		this.element.addEventListener('click', this.share);
	}

	/*
	 * SHARE
	 */
	share(event) {
		event.preventDefault();

		const shareurl = 'https://twitter.com/intent/tweet';

        const top = Math.round(window.h / 2 - 210);
        const left = Math.round(window.w / 2 - 275);

        window.open(
            shareurl + this.params,
            '_blank',
            'width=550,height=420,toolbar=no,scrollbars=no,resizable=no,top=' + top + ',left=' + left
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

export default TwitterShare;


// WEBPACK FOOTER //
// ../src/js/nsfw/sharing/TwitterShare.js