import EventsManager from '../events/EventsManager';
import Events from '../events/Events';

/**
 *  YOUTUBE
 *  PLAYER
 */

class Youtube {

	constructor ( el, id, autoplay = false, loop = false, mute = false ) {

		this.autoplay = autoplay;
		this.loop = loop;
		this.mute = mute;
		this.done = false;

		// bindings
		this.onPlayerReady = ::this.onPlayerReady;
		this.onPlayerStateChange = ::this.onPlayerStateChange;

		this.player = new YT.Player(el, {
			playerVars: {
				rel:0,
				controls:2,
				disablekb:0,
				modestbranding:1
			},
			height: '390',
			width: '640',
			autoplay: this.autoplay ? 1 : 0,
			videoId: id,
			events: {
				'onReady': this.onPlayerReady,
				'onStateChange': this.onPlayerStateChange
			}
		});

	}

	onPlayerReady ( event ) {

		event.target.playVideo();
		
	}

	onPlayerStateChange ( event ) {

		// 1st play
		if (event.data == YT.PlayerState.PLAYING && !this.done) {
			if (!this.autoplay) this.stop();
			if (this.mute) this.player.mute();
			this.done = true;
			
		// pause
		} else if (event.data === YT.PlayerState.PAUSED ) {

			EventsManager.emit( Events.Video.PAUSE );

		// end
		} else if (event.data == YT.PlayerState.ENDED) {
			this.stop();
			EventsManager.emit( Events.Video.PAUSE );
			EventsManager.emit( Events.Video.END );
			if (this.loop) {
				this.play();
			}
		}

	}

	play () {

		if(this.player) this.player.playVideo();

	}

	pause () {

		this.player.pauseVideo();

	}

	stop () {

		this.player.seekTo(0);
		this.player.stopVideo();

	}

	dispose () {

		this.player.destroy();
		this.player = null;

		this.onPlayerReady = 
		this.onPlayerStateChange = null;
		
	}

}

export default Youtube;