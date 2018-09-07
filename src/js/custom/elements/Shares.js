import FacebookShare from "nsfw/sharing/FacebookShare";
import TwitterShare from "nsfw/sharing/TwitterShare";
import LinkedinShare from "nsfw/sharing/LinkedinShare";

class Shares {
	constructor(view) {

		// Bindings
		this.openCopyLightbox = ::this.openCopyLightbox;
		this.closeCopyLightbox = ::this.closeCopyLightbox;
		this.copyLink = ::this.copyLink;

		// Elements
		this.view = view;
		this.copyShare = view.querySelector(".sharing__copy");
		this.copyLightbox = view.querySelector(".lightbox--copy");
		this.copyLinkBtn = this.copyLightbox.querySelector(".copy-link-btn");
		this.closeLightboxBtn = this.copyLightbox.querySelector(".button--close");

    	this.facebookShare = new FacebookShare(view.querySelector(".sharing__facebook"));
		this.twitterShare = new TwitterShare(view.querySelector(".sharing__twitter"), document.querySelector("h1.title").innerHTML, "", "rcgt");
		this.linkedinShare = new LinkedinShare(view.querySelector(".sharing__linkedin"));

		// Events
		this.copyShare.addEventListener("click", this.openCopyLightbox);	
	}


	/**
	 * OPEN COPY LIGHTBOX
	 */
	openCopyLightbox(event) {
		event.preventDefault();

		this.copyLightbox.classList.add("lightbox--visible");
		this.copyLightbox.style.transform = this.copyLightbox.style.webkitTransform = `translateY(${window.scrollBar.offset.y}px)`;

		// Disable scrolling
		window.scrollBar.unregisterEvents(/./);
		
		this.copyLinkBtn.addEventListener("click", this.copyLink);
		this.closeLightboxBtn.addEventListener("click", this.closeCopyLightbox);	
	}


	/**
	 * CLOSE COPY LIGHTBOX
	 */
	closeCopyLightbox(event) {
		event.preventDefault();

		this.copyLightbox.classList.remove("lightbox--visible");

		// Enable scrolling
		window.scrollBar.registerEvents(/./);

		this.copyLinkBtn.removeEventListener("click", this.copyLink);
		this.closeLightboxBtn.removeEventListener("click", this.closeCopyLightbox);

		if(this.copyLinkInfo && this.copyLinkSuccess) {
			this.copyLinkInfo.style.display = "block";
			this.copyLinkSuccess.style.display = "none";
		}
	}


	/**
	 * COPY LINK
	 */
	copyLink(event) {
		event.preventDefault();

		let input = this.copyLightbox.querySelector("input[type='text']");
		input.select();

		if(isSafari && !isDesktop) { // FIX for iPhone + iPad
			input.value;
            input.contentEditable = true;
            input.readOnly = false;
            let range = document.createRange();
            range.selectNodeContents(input);
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            input.setSelectionRange(0, 999999);
            input.contentEditable = false;
            input.readOnly = true;
		}

		try {
			const successful = document.execCommand('copy');

			if(successful) {
				this.copyLinkInfo = this.view.querySelector(".copy-link-info");
				this.copyLinkSuccess = this.view.querySelector(".copy-link-success");

				this.copyLinkInfo.style.display = "none";
				this.copyLinkSuccess.style.display = "block";

				input.selectionStart = input.selectionEnd = 0;
				input.blur();
			}

		} catch (err) {
			// console.log('Oops, unable to copy');
		}
	}
	
}

export default Shares;


// WEBPACK FOOTER //
// ../src/js/custom/elements/Shares.js