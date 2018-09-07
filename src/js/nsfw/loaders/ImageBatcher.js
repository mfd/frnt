/**
 * Image <img/>
 * Batcher
 */
class ImageBatcher {


	constructor( cb = null, verbose = true ) {

		this.items = [];
		this.pics = [];
		
		this.verbose = verbose;

		if(cb) this.callback = cb;

	}

	add ( url ) {

		this.items.push(url);

	}

	start () {

		if( this.items.length < 1 ) {
			console.warn('ImageBatcher :: No Image to preload');
			return;
		}

		this.pic = new Image();
		this.pic.onload = this.loaded.bind(this);

		this.pic.src = this.items[this.items.length - 1];
	}

	loaded () {

		if(this.verbose) console.log('%cImageBatcher :: Image loaded : ', 'color:#ffbb6a;', this.items[this.items.length - 1]);

		this.pics.push(this.pic);

		this.items.pop();

		if (this.items.length > 0 )
			this.start();
		else {
			if(this.verbose) console.log('%cImageBatcher :: Completed : ', 'color:#ffbb6a;');
			if(this.callback) this.callback( this.pics );
		}

	}

	dispose () {

		this.callback = null;

		this.items = null;
		this.pics = null;

		this.pic = null;
	}

}

export default ImageBatcher;