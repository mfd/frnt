# EVENTS MANAGER


Events listener/emiter not based on DOM elements.


* When displayed, the `View` will tell to the `Controller` throught an `Event`.
* Be sure to add first you custom in the `Events` class.
* You can remove a listener by using the `off` method. 
* You can also listen an event just once by using the `once` method.


### `View` class
```
import Events from 'events/Events';
import EventsManager from 'events/EventsManager';


class SampleView {
	
	constructor() {

		this.view = document.querySelector('.smaple-view');
		this.id = 'sample-view-id';
	
	}

	display() {

		EventsManager.emit( Events.View.DISPLAY, this.id ); // be sure to add your custom in the class Events

	}
}
```

### `Controller` class
```
import Events from 'events/Events';
import EventsManager from 'events/EventsManager';

class SampleController {
	
	constructor() {

		EventsManager.on( Events.View.DISPLAY, ::this.handleNewView );
	}

	handleNewView( data ) {

		console.log( data ); // 'sample-view-id'
	}

}
```

### `Events` class 
```
/**
 * E V E N T S
 */

const Events = {

	// sample events
	Video : {
		PAUSE	: "video_paused_paused",
		END		: "video_paused_ended"
	},

	View : {
		DISPLAY : "display_new_view"
	}

};

export default Events;
```

