/**
 * SOUND
 * CHANNEL
 */

class SoundChannel {

	constructor () {
		this.id = '';
		this.howl = {};
		this.isPlaying = false;
		this.isHowl = false;
		this.verbose = true;

		this.audio = new Audio();
		this.audio.addEventListener('ended', ::this.onEnd);

		if(this.verbose) document.body.appendChild(this.audio);
	}

	play ( sound, isMuted ) {
		const { id, src, loop, volume } = sound;

		if ( !src ) {
			throw new Error('SoundManager :: cannot play a sound without a source', sound);
		}

		if (this.verbose) console.log(`%cSoundChannel :: play :: ${id} - ${src}`, `color:#ddd;`);
		if (this.verbose) this.audio.classList.add('playing');

		this.id = id;
		this.sound = sound;

		if ( loop ) {
			const sameSource = this.howl._src === `${window.location.origin}${src}` || this.howl._src === src;

			if ( !sameSource ) {
		        this.isHowl = true;
		        this.isPlaying = true;
				this.howl = new Howl({
		            src: src,
		            autoplay: true,
		            loop: true,
		            volume: isMuted ? 0 : volume,
		        });
			}

			this.howl.play();
		} else {
			const sameSource = this.audio.src === `${window.location.origin}${src}` || this.audio.src === src;

			if ( !sameSource ) {
				this.isHowl = false;
				this.audio.volume = isMuted ? 0 : volume;
				this.audio.src = src;
				this.audio.load();
			}

			this.isPlaying = true;
			this.audio.play();
		}
	}

	stop () {
		console.log('SoundChannel :: stop', this.id, this.isHowl);

		if ( this.isHowl ) {
			this.howl.pause();
		} else {
			this.audio.pause();
		}

		this.clear();
	}

	fade ( volume, duration ) {
		const track = this.getTrack();

		TweenMax.to(track, duration, { volume: volume });
	}

	onEnd () {
		this.clear();
	}

	clear () {
		if(this.verbose) this.audio.classList.remove('playing');

		this.isPlaying = false;
	}

	getTrack () {
		if ( this.isHowl ) {
			return this.howl;
		}

		return this.audio;
	}

	mute () {
		if ( !this.isPlaying ) return;

		if ( this.isHowl ) {
			this.howl.volume(0);
		} else {
			this.audio.volume = 0;
		}
	}

	unmute () {
		if ( !this.isPlaying ) return;

		if ( this.isHowl ) {
			this.howl.volume(this.sound.volume);
		} else {
			this.audio.volume = this.sound.volume;
		}
	}

}

export default SoundChannel;