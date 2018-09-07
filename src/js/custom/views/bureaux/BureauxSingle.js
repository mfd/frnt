import Ajax from 'nsfw/net/Ajax';

import PageBase from "../../shared/PageBase";
import FadeIn from "../../shared/animations/FadeIn";

class BureauxSingle extends PageBase {

	constructor() {
		
		super("bureaux-single");

		// Bindings
		this.loadMoreExperts = ::this.loadMoreExperts;

		// Elements
		this.resultsWrap = this.view.querySelector('.row--experts');
        this.loadMoreBtn = this.view.querySelector(".load-more-btn");
		this.map = this.view.querySelector("#map-office");
        this.morphingContainer = this.view.querySelector(".morphing");

        // Params
        this.bureauID = this.view.getAttribute("data-id");
        this.responsableID = this.view.getAttribute("data-responsable");
		this.mapStyle = [{"featureType": "administrative", "elementType": "geometry", "stylers": [{"visibility": "off"} ] }, {"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#492a77"} ] }, {"featureType": "landscape.man_made", "stylers": [{"color": "#ffffff"}, {"visibility": "off"} ] }, {"featureType": "poi", "stylers": [{"visibility": "off"} ] }, {"featureType": "road", "stylers": [{"color": "#522e84"}, {"visibility": "on"} ] }, {"featureType": "road", "elementType": "labels.icon", "stylers": [{"visibility": "off"} ] }, {"featureType": "road", "elementType": "labels.text", "stylers": [{"visibility": "off"} ] }, {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}, {"visibility": "on"} ] }, {"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{"visibility": "off"} ] }, {"featureType": "road.highway", "elementType": "geometry", "stylers": [{"visibility": "on"} ] }, {"featureType": "transit", "stylers": [{"visibility": "off"} ] }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#462771"} ] }, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"} ] } ];
		this.count = 0;
        this.postType = 'experts';
        this.offset = 0;
        this.ppp = 12;

		// Fns
        if ( this.map ) this.loadGmaps();
        if ( this.loadMoreBtn ) this.loadMoreBtn.addEventListener('click', this.loadMoreExperts);
	}


    /**
     * GOOGLE MAP MANAGER
     */
	loadGmaps(){

		var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//maps.google.com/maps/api/js?key=AIzaSyAcREbtC5sVdnkqj_XPLUC0JddB2HdxFs4';
        document.body.appendChild(script);

        script.onload = ()=>{
        	this.initializeMap();    
        }
    }

    initializeMap(){
 
    	let zoom = 17;
    	let lat = parseFloat(this.map.getAttribute("data-lat"));
    	let lng = parseFloat(this.map.getAttribute("data-lng"));
    	let addr = this.map.getAttribute("data-addr");
    	let panX = -(window.w / 3.25);

    	this.map = new GMaps({
	      	el: this.map,
	      	center: { lat: lat, lng: lng },
	      	zoom: zoom,
	      	minZoom: zoom,
    		maxZoom: zoom,
			scrollwheel: false,
	    	streetViewControl: false,
	    	zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			rotateControl: false,
			fullscreenControl: false,
			scrollwheel: false,
			draggable: true,
			styles: this.mapStyle
	    });

	    this.map.addMarker({
			  lat: lat,
			  lng: lng,
			  icon: "/app/themes/rcgt/assets/images/pin.png",
			  click: function(e){
			  	window.open(addr, '_blank');
			  }
		});

		this.map.panBy(panX,0);
    }


    /**
     * EXPERTS LIST MANAGER
     */
    loadMoreExperts(){
    	event.preventDefault();

        //GTM
        var dataLayer = window.dataLayer || [];
        dataLayer.push({
          'event':'engagement',
          'eventAction':'click on cta',
          'eventLabel':'load more'
        });

    	this.offset++;

        // Set loader anim
        const mobiusSVG = MorphSVGPlugin.convertToPath("#mobius");
        let loadingTL = new TimelineMax();
        loadingTL.to("#button", .55, {morphSVG: mobiusSVG, ease: Power1.easeInOut});
        loadingTL.to(".load-more-btn", .25, {autoAlpha: 0, ease: Power1.easeInOut}, "-=0.5");
        loadingTL.to(".morphing-svg", .25, {autoAlpha: 0, ease: Power1.easeInOut}, "-=0.25");
        loadingTL.to(".mobius-svg", .75, {rotation: 360, repeat: -1, ease: Power1.easeInOut}, "-=0.5");

        //POST params
        const urlParameters = {
            action: "more_experts_ajax",
            postType: this.postType,
            bureau: this.bureauID,
            responsable: this.responsableID,
            ppp: this.ppp,
            offset:(this.offset * this.ppp)
        };

        // Serialize query parameters
        let params = Object.keys(urlParameters).map( (param) => {
            return encodeURIComponent(param) + '=' + encodeURIComponent(urlParameters[param]);
        }).join('&');

        Ajax.load('//' + window.location.hostname + '/wp/wp-admin/admin-ajax.php', 
            (dataReceived) => {
                let response = JSON.parse(dataReceived.response);
                
                this.offset++;

                // Reset loader
                loadingTL.reverse();

                // Insert results
                this.resultsWrap.innerHTML += response.html;

                // Add new anim rows
                this.setAnimRows(this.resultsWrap.querySelectorAll('.anim--fade:not(.faded)'));

                let total = response.total;
                this.count = total;
                if(this.count == this.resultsWrap.querySelectorAll('.expert').length) this.morphingContainer.style.display = "none";

            }, 
            'POST',params
        );
    }


    /**
     * SET ANIM ROWS
     */
    setAnimRows(fadeIn, removeOld = false) {
        if(removeOld) {
            // Remove old fades row
            for(let i = this.fadeIn.length - 1; i >= 0; i--) {
                if(this.fadeIn[i].isAjaxRow) {
                    this.fadeIn[i].dispose();
                    this.fadeIn.splice(i, 1);
                }
            }
        }

        // Fade new rows result
        for(let i = 0; i < fadeIn.length; i++){
            let direction = "up";
            let delay = 0;
            if (fadeIn[i].getAttribute('data-anim-direction')) direction = fadeIn[i].getAttribute('data-anim-direction');
            if (fadeIn[i].getAttribute('data-anim-delay')) delay = parseFloat(fadeIn[i].getAttribute('data-anim-delay'));
            this.fadeIn.push(new FadeIn('fade-ajax-' + this.fadeIn.length, fadeIn[i], direction, delay));
        }
    }
}

export default BureauxSingle;



// WEBPACK FOOTER //
// ../src/js/custom/views/bureaux/BureauxSingle.js