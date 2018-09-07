import EventsManager from 'nsfw/events/EventsManager';
import Events from 'nsfw/events/Events';
import Ajax from 'nsfw/net/Ajax';

import PageBase from "../../shared/PageBase";
import FadeIn from "../../shared/animations/FadeIn";

class Savoirs extends PageBase {
	constructor() {
		
		super("savoirs");

		// Bindings
		this.loadMoreArticles = ::this.loadMoreArticles;
		this.searchUpdated = ::this.searchUpdated;
        this.searchClick = ::this.searchClick;

		// Elements
		this.loadMoreBtn = this.view.querySelector(".load-more-btn");
        this.results = this.view.querySelector('.row--results');
        this.resultsNone = this.results.querySelector('.row--results__none');
        this.resultCount = this.results.querySelector('.title-icon p small');
        this.resultsWrap = this.view.querySelector('#results');
        this.morphingContainer = this.view.querySelector(".morphing");

        //Search field
        this.submit = this.view.querySelector('.search-filter__submit');
        this.searchForm = this.view.querySelector('.search-filter__searchform');

        // Params
        this.count = 0;
        this.postType = 'insights-article';
        this.offset = 0;
        this.ppp = 12;

		// Events
        if(this.submit) this.submit.addEventListener('click',this.searchClick);
		this.loadMoreBtn.addEventListener('click', this.loadMoreArticles);
        EventsManager.on(Events.Filter.UPDATE, this.searchUpdated);
        EventsManager.on(Events.Filter.SEARCH, this.searchUpdated);
	}


	/**
	 * LOAD MORE ARTICLES
	 */
	loadMoreArticles(event) {
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

        //Get filters state
        var dataFilters = [];
        for(let i = 0; i < this.filterSelects.length; i++) {
            dataFilters[i] = {
                "data": this.filterSelects[i].selectedData,
                "tax": this.filterSelects[i].filterType
            }
        }
        dataFilters = JSON.stringify(dataFilters);

        //POST params
        const urlParameters = {
            action: "more_post_ajax",
            postType: this.postType,
            recherche: this.searchForm.recherche.value,
            filters: dataFilters,
            ppp: this.ppp,
            offset: (this.offset * this.ppp)
        };

        // Serialize query parameters
        let params = Object.keys(urlParameters).map( (param) => {
            return encodeURIComponent(param) + '=' + encodeURIComponent(urlParameters[param]);
        }).join('&');

        Ajax.load('//' + window.location.hostname + '/wp/wp-admin/admin-ajax.php', 
            (dataReceived) => {
                let response = JSON.parse(dataReceived.response);

                // Reset loader
                loadingTL.reverse();

                // Insert results
                this.resultsWrap.innerHTML += response.html;

                // Add new anim rows
                this.setAnimRows(this.resultsWrap.querySelectorAll('.anim--fade:not(.faded)'));
                
                let total = response.total;
                this.count = total;
                if(this.count == this.resultsWrap.querySelectorAll('.block-thumb, .block-info').length || this.count == 0)
                    this.morphingContainer.style.display = "none";

            }, 
            'POST',params
        );
	}

    /**
     * SEARCH CLICK
    **/
    searchClick(event){
        event.preventDefault();

        EventsManager.emit(Events.Filter.SEARCH);
    }

	/**
	 * SEARCH UPDATED
	 */
	searchUpdated() {
        //Reset offset
        this.offset = 0;

        // Set loader
        let loadingHtml = "";
        loadingHtml += `
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-6 col-lg-5 center">
                        <img class="loader" src="//${window.location.hostname}/app/themes/rcgt/assets/images/loader.gif" alt="">
                    </div>
                </div>
            </div>    
        `;
        this.resultsWrap.innerHTML = loadingHtml;
        this.results.style.display = "none";

        //Get filters state
        var dataFilters = [];
        var urlFilters = {};
        var gtmSearch = {};
        for(let i = 0; i < this.filterSelects.length; i++) {
            let data = this.filterSelects[i].selectedData;
            let tax = this.filterSelects[i].filterType;
            dataFilters[i] = {
                "data": data,
                "tax": tax
            }

            if(tax == 'content-types-insights'){
                gtmSearch['contentType'] = this.filterSelects[i].selectedLabel.toLowerCase();
            }else if(tax == 'themes'){
                gtmSearch['theme'] = this.filterSelects[i].selectedLabel.toLowerCase();
            }else{
                gtmSearch['tax'] = this.filterSelects[i].selectedLabel.toLowerCase();
            }
            if(data != 'all') urlFilters[tax] = data;
        }
        dataFilters = JSON.stringify(dataFilters);

        //GTM
        var dataLayer = window.dataLayer || [];
        dataLayer.push({
          'event':'engagement',
          'eventAction':'find insight',
          'eventLabel':this.searchForm.recherche.value,
          'search':gtmSearch
        });

        // Set url bar state
        if(this.searchForm.recherche.value != '') urlFilters['recherche'] = this.searchForm.recherche.value;
        let urlparams = Object.keys(urlFilters).map( (param) => {
            return encodeURIComponent(param) + '=' + encodeURIComponent(urlFilters[param]);
        }).join('&');
        window.history.replaceState({}, '', '?' + urlparams);

        //POST params
        const urlParameters = {
            action: "more_post_ajax",
            postType: this.postType,
            recherche: this.searchForm.recherche.value,
            filters: dataFilters,
            ppp: this.ppp,
            offset: (this.offset * this.ppp)
        };

        // Serialize query parameters
        let params = Object.keys(urlParameters).map( (param) => {
            return encodeURIComponent(param) + '=' + encodeURIComponent(urlParameters[param]);
        }).join('&');

		// Load Posts
        Ajax.load(
            '//' + window.location.hostname + '/wp/wp-admin/admin-ajax.php', 
            (dataReceived) => {

                let response = JSON.parse(dataReceived.response);

                // Insert results
                this.resultsWrap.innerHTML = response.html;

                // remove old anim rows + add new ones
                this.setAnimRows(this.resultsWrap.querySelectorAll('.anim--fade'), true);

                let total = response.total;
                this.count = total;
                if(this.count == this.resultsWrap.querySelectorAll('.block-thumb, .block-info').length){
                    this.morphingContainer.style.display = "none";
                }else if(this.morphingContainer.style.display == "none"){
                    this.morphingContainer.style.display = "block";
                }

                let selectedLabels = '';
                for(let i = 0; i < this.filterSelects.length; i++) {
                    if(this.filterSelects[i].selectedData == 'all') continue;
                    if(selectedLabels != '') selectedLabels += ' & ';
                    selectedLabels += this.filterSelects[i].selectedLabel;
                }

                if(selectedLabels == "" && this.searchForm.recherche.value == "") {
                    this.results.style.display = "none";
                } else {
                    if ( this.count == 0 ){
                        this.resultsNone.style.display = "block";
                    } else {
                        this.resultsNone.style.display = "none";
                    }
                    this.resultCount.innerHTML = "( " + this.count + " )";

                    // Fade results count
                    this.results.style.opacity = 0;
                    this.results.style.transform = this.results.style.webkitTransform = "translateX(30px)";
                    this.results.style.display = "block";
                    setTimeout( () => {
                        this.results.style.transform = this.results.style.webkitTransform = "translateX(0px)";
                        this.results.style.opacity = 1;
                    }, 150 );
                }
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

export default Savoirs;



// WEBPACK FOOTER //
// ../src/js/custom/views/savoirs/Savoirs.js