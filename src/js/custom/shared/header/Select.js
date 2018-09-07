import Events from 'nsfw/events/Events';
import EventsManager from 'nsfw/events/EventsManager';
import Ajax from 'nsfw/net/Ajax';

/**
 * Select
 */
class Select {

    constructor (id, view, isMobile) {

        // Bindings
        this.selectClick = ::this.selectClick;
        this.selectLinkClick = ::this.selectLinkClick;


        // Els
        this.id = id;
        this.searchFilter = view;
        this.view = view.querySelector(".search-filter__wrapfilter");

        this.selector = this.view.querySelector('span');
        this.selectorLinks = this.view.querySelectorAll('a');
            
        // Init scrollbar if not bureaux page
        this.listWrap = this.view.querySelector('.search-filter__list');
        Scrollbar.init(this.listWrap, {speed:.9, alwaysShowTracks:true});


        /**
         * EVENTS
         */

        this.selector.addEventListener('click', this.selectClick);

        // Filter Select Items
        for ( let i = 0; i < this.selectorLinks.length; i++ ){
            this.selectorLinks[i].addEventListener("click", this.selectLinkClick);
        }
    }

    // Select open
    selectClick(){

        if ( this.view.classList.contains('search-filter__wrapfilter--active') ){

            this.view.classList.remove('search-filter__wrapfilter--active');

            if(window.w < 980) {
                TweenMax.to(this.listWrap, 0.4, {css: {maxHeight: "0px"}, ease: Power2.EaseOut});
            }

        } else {
            // Open current filter
            this.view.classList.add('search-filter__wrapfilter--active');

            // Go to top of menu on opened
            if(window.w < 980) {
                TweenMax.to(this.listWrap, 0.4, {css: {maxHeight: "315px"}, ease: Power2.EaseOut, onComplete: () => {
                    document.querySelector("header .header__nav--primary").scrollTop = this.view.getBoundingClientRect().top;
                }});
            }
        }
    }


    selectLinkClick(event){
        event.preventDefault();

        this.selectedData = event.target.getAttribute("data-id");
        this.selectedLabel = event.target.innerHTML;
        this.selector.innerHTML = this.selectedLabel;


        this.view.classList.remove('search-filter__wrapfilter--active');
        
        this.ajaxRegionCookie()


    }

    ajaxRegionCookie() {
        //POST params
        const urlParameters = {
            action: "set_region_cookie",
            region: this.selector.innerHTML,            
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
                if (response == 1) {
                    window.location.reload();
                }
            },
            'POST',params
        );
    }



    /**
     * RESIZE
     */
    resize(){
    }
}

export default Select;


// WEBPACK FOOTER //
// ../src/js/custom/shared/header/Select.js