/**
 * GoogleAnalyticsTracking
 * Add class '.ga-event' to the link you want to track
 * Add data attribute "data-page", "data-category", "data-action", "data-value"
 * @param  UA    {String} - Google Analytics UA
 * @param  Debug {Bool} - Run Analytics in debug mode
 * @param  PageviewOnInit {Bool} - Send page view on init
*/

class GoogleAnalyticsTracking {
	constructor(UA,debug = false, pageviewOnInit = false) {
		// Binding
		this.initAnalytics = ::this.initAnalytics;
		this.setTracking = ::this.setTracking;

		// Vars
		this.debug = debug ? '_debug' : '';
		
		// Init GA
		window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
		ga('create', UA, 'auto');
		
		// Lazyload Script
		if(!window.isGATrackingLoaded){
			var script = document.createElement('script');
			script.type = 'text/javascript';
	        script.src = `https://www.google-analytics.com/analytics${this.debug}.js`;
	        document.body.appendChild(script);
	        script.onload = ()=>{
	        	window.isGATrackingLoaded = true;
	        	this.initAnalytics();
	        	if(pageviewOnInit){
	        		this.sendPageview();
	        	}
	        }
        }
	}

	initAnalytics(){
        this.trackingElements = document.querySelectorAll('.ga-event');
        
        for (let i = 0; i < this.trackingElements.length; i++) {
    		this.trackingElements[i].addEventListener('click',this.setTracking);
        }
	}

	sendPageview(){
		ga('send', 'pageview');
	}

	sendTracking(event, page = "", category = "", action = "", value = ""){
		ga('send', event, page, category, action, value);
	}

	setTracking(e){
		const page = e.currentTarget.getAttribute('data-page');
    	const category = e.currentTarget.getAttribute('data-category');
    	const action = e.currentTarget.getAttribute('data-action');
    	const value = e.currentTarget.getAttribute('data-value');
		this.sendTracking('event',page, category, action, value);
	}

	destroy(){
		for (var i = 0; i < this.trackingElements.length; i++) {
			this.trackingElements[i].removeEventListener('click',this.setTracking);
		}
	}
}

export default GoogleAnalyticsTracking;