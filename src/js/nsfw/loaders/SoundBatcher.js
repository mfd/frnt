/**
 * Sound
 * Batcher
 */
class SoundBatcher {


	constructor ( callback, verbose = false ) {

		// binding
		this.loaded = ::this.loaded;

		// params
		this.verbose = verbose;
		this.items = [];

		if ( callback && typeof callback === 'function' ) {
			this.callback = callback;
		}

		this.loader = new Audio();
		this.loader.addEventListener('canplaythrough', this.loaded, true);
	}

	addItem ( url ) {

		this.items.push(url);
	}

	/**
	 * Start
	 */
	start () {

		if(this.verbose) console.log('SoundBatcher :: Start');

		if ( this.items.length < 1 ) {
			console.warn('SoundBatcher :: No sound to preload');
			return;
		}

		this.loader.src = this.items[this.items.length - 1];
	}

	loaded () {
		
		if(this.verbose) console.log('SoundBatcher :: Sound loaded : ', this.items[this.items.length - 1]);

		this.items.pop();

		if ( this.items.length > 0 ) {
			
			this.start();

		} else {

			if ( this.callback ) this.callback();  

			this.dispose();
		}
	}

	/**
	 * Dispose
	 */
	dispose () {

		this.loader.removeEventListener('canplaythrough', this.loaded, true);

		this.loaded = null;
		this.loader = null;
		this.items = null;
		this.callback = null;
	}

}

export default SoundBatcher;