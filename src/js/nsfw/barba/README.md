# BARBA CONTROLLER


Please check (barba.js project)[http://barbajs.org] and the docs.

* All your pages/views must extends `BarbaPageBase`.
* The `loader` must have `display` and `hide` methods.
* Customs `callbacks` can be added `before` and `after` transitions.


### `Main` sample
```
import BarbaController from 'barba/BarbaController';

class Main {
	
	constructor() {

		document.addEventListener('DOMContentLoaded', ::this.init);
	}

	init() {

		BarbaController.init();

		// create pages
		const page1 = new Page1();
		const page2 = new Page2();
		const page3 = new Page3();

		// register
		BarbaController.register( page1 );
		BarbaController.register( page2 );
		BarbaController.register( page3 );

		// add loader
		const loader = new SampleLoader(); // loader must have dislay/hide methods !
		BarbaController.addLoader( loader );

		// start
		BarbaController.start();
	}
}

```

### `Page` sample
```
import BarbaPageBase from 'barba/BarbaPageBase';

class Page1 extends BarbaPageBase {
	
	constructor() {

		super('page1-id');

	}

	// called just before a display transition
	onEnter() {
	
		super.onEnter();

		// this.view (DOM) is available

	}

	// display transition
	display( container ) {

	}

	// called after display transition is done
	onEnterCompleted () {

	}

	// called just before a hide transition
	onLeave() {

	}

	// hide transition
	hide( container, promise ) {

		super.hide( container, promise ); //

	}

	// called after hide transition is done
	onLeaveCompleted() {

	}

}
```