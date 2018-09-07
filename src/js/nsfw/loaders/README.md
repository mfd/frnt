# IMAGE BATCHER

Loads a batch of `Image` urls.

```
import ImageBatcher from 'loaders/ImageBatcher';


class SampleClass {
	
	constructor() {

		const batcher = new ImageBatcher( ::this.onImagesReady );
		batcher.add('/image/pic.jpg');
		batcher.add('/image/pic2.jpg');
		batcher.add('/image/pic3.jpg');
		batcher.start();
	
	}

	onImagesReady( images ) {

		console.log( images ) // array of <img/> with url

	}
}
```