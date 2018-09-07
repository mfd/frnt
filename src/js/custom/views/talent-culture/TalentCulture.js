import PageBase from "../../shared/PageBase";
import StickyButton from "../../elements/StickyButton";

class TalentCulture extends PageBase {

	constructor() {
		super("talent-culture");

		// Bindings 
		this.playVideo = ::this.playVideo;
		this.injectVideo = ::this.injectVideo;
		this.clickVideo = ::this.clickVideo;
		this.onPlayerStateChange = ::this.onPlayerStateChange;
		this.gtmApplyNow = ::this.gtmApplyNow;

		// Els
		this.buttonApply = this.view.querySelector('#button-apply a');
		this.vidPlaceholder = this.view.querySelector('.video .video__frame > img');
		this.video = this.view.querySelector('.video .video__frame .vid');
		this.videoWrap = this.view.querySelector('.video .video__frame');
		if ( this.video ) this.videoID = this.video.getAttribute('data-vid-id');
		this.videoContent = this.view.querySelector('.video .video__content .row > div');
		if ( this.video ) this.videoContentChilds = this.videoContent.children;
		this.btnPlay = this.view.querySelectorAll('.video__play');
		this.player = null;
		this.timeout = null;

		// Events 
		if ( this.btnPlay.length > 0 ){
			for ( let i = 0; i < this.btnPlay.length; i++ ){
				this.btnPlay[i].addEventListener('click', this.playVideo);
			}
		}
		this.buttonApply.addEventListener('click',this.gtmApplyNow);
	}

	/**
	 * DISPLAY
	 */
	display() {
		super.display();

		this.stickyButton = new StickyButton('sticky-button', this.view.querySelector(".wrap-sticky-button"));

		// Add youtube API
		let youtube = document.createElement('script');
        youtube.src = 'https://www.youtube.com/player_api';
        document.body.appendChild(youtube);

        youtube.onload = () => {
	        	
        	window.onYouTubePlayerAPIReady = () => {

		        this.player = new YT.Player('player', {
		          height: '100%',
		          width: '100%',
		          videoId: this.videoID,
		          playerVars: {rel: 0},
		          events: {
		            'onStateChange': this.onPlayerStateChange
		          }
		        });
		    }
        }
	}

	// When video ends
	onPlayerStateChange(event) {
 
		if ( this.timeout ) clearTimeout(this.timeout);

		// Get time remaining
		let timeRemaining = this.player.getDuration() - this.player.getCurrentTime();

		// Reset video 1 second before end
		timeRemaining = (timeRemaining * 1000) - 1000;
		this.timeout = setTimeout( () => this.resetVideo(), timeRemaining );
    }

	playVideo(e) {
		e.preventDefault();

		// Animations to play
		if ( window.w > 768 ){
			TweenMax.staggerTo(this.videoContentChilds, 0.4, {css:{transform:"matrix(1, 0, 0, 1, 0, -20)", autoAlpha:0}, ease:Linear.easeNone, onComplete:this.injectVideo}, 0.15);
		} else {
			TweenMax.staggerTo(this.btnPlay, 0.4, {autoAlpha:0, ease:Power2.easeOut}, 0.2); 
			this.injectVideo();
		}
		TweenMax.to(this.vidPlaceholder, 0.6, {autoAlpha:0, ease:Power2.easeOut, delay:0.7}); 
	}

	injectVideo() {

		// Play video
		this.player.playVideo();

		setTimeout( () => { 
			this.videoContent.classList.add('desktop-hidden'); 
			this.videoWrap.classList.add('is-playing'); 
			this.videoWrap.addEventListener('click', this.clickVideo);
		}, 100 ); 
	}

	resetVideo() {

		// Reset video to initial state
		this.videoContent.classList.remove('desktop-hidden'); 
		this.videoWrap.classList.remove('is-playing'); 
		TweenMax.to(this.vidPlaceholder, 0, {autoAlpha:1, ease:Power2.easeOut}); 

		// Reverse animations to play
		if ( window.w > 768 ){
			TweenMax.staggerTo(this.videoContentChilds, 0.4, {css:{transform:"matrix(1, 0, 0, 1, 0, 0)", autoAlpha:1}, ease:Linear.easeNone, delay:0.8}, 0.15);
		} else {
			TweenMax.staggerTo(this.btnPlay, 0.4, {autoAlpha:1, ease:Power2.easeOut, delay:0.8}, 0.2); 
		}
	}

	clickVideo() {

		if ( this.player.getPlayerState() == 1 ){
			this.player.pauseVideo();
		} else {
			this.player.playVideo();
		}
	}

	gtmApplyNow(){
		var dataLayer = window.dataLayer || [];
		dataLayer.push({
			'event': 'career',
			'eventAction': 'click on apply now',
			'eventLabel': ''
		});
	}

	/**
	 * RESIZE
	 */
	resize() {
		super.resize();

		if(this.stickyButton)
			this.stickyButton.resize();
	}
}

export default TalentCulture;


// WEBPACK FOOTER //
// ../src/js/custom/views/talent-culture/TalentCulture.js