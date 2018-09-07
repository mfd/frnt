import Events from 'nsfw/events/Events';
import EventsManager from 'nsfw/events/EventsManager';
import Ajax from 'nsfw/net/Ajax';

/**
 * FilterSelect
 */
class FilterSelect {

    constructor (id, view, pageID, searchFilterOfficesHeight) {

        // Bindings
        this.selectClick = ::this.selectClick;
        this.selectLinkClick = ::this.selectLinkClick;
        this.selectBureauClick = ::this.selectBureauClick;
        this.closeSelect = ::this.closeSelect; 
        this.animateScroll = ::this.animateScroll;


        // Els
        this.id = id;
        this.pageID = pageID;
        this.view = view;

        this.selector = this.view.querySelector('span'); 
        this.filterWrapper = this.view.querySelector('div[data-tax]');
        this.searchFilter = document.querySelector('.search-filter'); // Filters parent
        this.wrapFilters = this.searchFilter.querySelectorAll('.search-filter__wrapfilter');


        //REFACTO filters
        this.selectedLabel = '';
        this.selectedData = 'all';
        if(this.filterWrapper){
            this.selectedData = this.filterWrapper.getAttribute("data-initvalue");
            if(this.selectedData != 'all') this.selectedLabel = this.selector.innerHTML;
            this.filterType = this.filterWrapper.getAttribute("data-tax");
        }

        // Setup for bureaux
        if (pageID == "bureaux"){
            this.selectorLinks = this.view.querySelectorAll('li a');

            // Data offices height
            this.searchFilterOfficesHeight = searchFilterOfficesHeight;

            // Open filter if is current geoloc
            if(this.view.classList.contains("is-active")) {
                const parent = this.view.parentElement;
                parent.insertBefore(this.view, parent.firstChild);

                this.selectClick();
            }

        } else {
            this.selectorLinks = this.view.querySelectorAll('a[data-search]');
            
            // Init scrollbar if not bureaux page
            const listWrap = this.view.querySelector('.search-filter__list');
            Scrollbar.init(listWrap, {speed:.9, alwaysShowTracks:true});
        }


        /**
         * EVENTS
         */

        this.selector.addEventListener('click', this.selectClick);

        // Filter Select Items
        for ( let i = 0; i < this.selectorLinks.length; i++ ){
            if ( this.pageID == "bureaux" ){
                this.selectorLinks[i].addEventListener("click", this.selectBureauClick);
            } else {
                this.selectorLinks[i].addEventListener("click", this.selectLinkClick);
            }
        }

        EventsManager.on(Events.Filter.CLOSE, this.closeSelect);
        EventsManager.on(Events.Filter.SEARCH, this.animateScroll);
        EventsManager.on(Events.Filter.UPDATE, this.animateScroll);
    }

    // Select open
    selectClick(){

        if ( this.view.classList.contains('search-filter__wrapfilter--active') ){

            this.view.classList.remove('search-filter__wrapfilter--active');

            // If offices
            if ( this.pageID == "bureaux" ){

                // reset wrapper height
                this.searchFilter.style.height = this.searchFilterOfficesHeight + "px";

                // reset next siblings transform
                let officeSiblings = this.getNextSiblings(this.view);
                if ( officeSiblings.length > 0 ){
                    for ( let i = 0; i < officeSiblings.length; i++ ){
                        officeSiblings[i].style.transform = officeSiblings[i].style.webkitTransform = "translateY(0px)";
                    }
                }
            }

        } else {

            // Close all filters
            EventsManager.emit(Events.Filter.CLOSE);

            // Open current filter
            this.view.classList.add('search-filter__wrapfilter--active');

            // If offices
            if ( this.pageID == "bureaux" ){

                // Reset all filters style
                for ( let i = 0; i < this.wrapFilters.length; i++ ){
                    this.wrapFilters[i].style.transform = this.wrapFilters[i].style.webkitTransform = "translateY(0px)";
                }

                this.animateOfficesHeight();
            }
        }
    }


    selectLinkClick(event){
        event.preventDefault();

        this.selectedData = event.target.getAttribute("data-search");
        this.selectedLabel = event.target.innerHTML;
        this.selector.innerHTML = this.selectedLabel;

        // Event filter update
        EventsManager.emit(Events.Filter.UPDATE);

        this.view.classList.remove('search-filter__wrapfilter--active');
    }


    selectBureauClick(event){
        let location = event.currentTarget.querySelector('div.small-title').innerHTML.toLowerCase();

        var dataLayer = window.dataLayer || [];
        dataLayer.push({
          'event':'engagement',
          'eventAction':'click on office location',
          'eventLabel': location
        });
    }


    closeSelect() {
        if ( this.view.classList.contains('search-filter__wrapfilter--active') ){
            this.view.classList.remove('search-filter__wrapfilter--active');
        }
    }


    getNextSiblings(elem, filter) {
        let sibs = [];
        while (elem = elem.nextSibling) {
            if (elem.nodeType === 3) continue; // text node
            if (!filter || filter(elem)) sibs.push(elem);
        }
        return sibs;
    } 


    animateScroll(){

        this.header = document.querySelector('header');
        this.scrollValue = window.currentScrollTop;
        this.value = this.searchFilter.offsetTop + (this.header.clientHeight / 2) - 20;

        if ( window.currentScrollTop != this.value ) {

            // On tween la valeur du scrollBar pour un effet "auto-scroll"
            // vers le second bloc ("value" étant son offset-top)
            TweenMax.to(this, 1.2, {
                scrollValue: this.value,
                onUpdate:() => {
                    window.scrollBar.stop();
                    window.scrollBar.setPosition(0, this.scrollValue);
                },
                ease:Power4.easeInOut
            });
        }
    }


    /**
     * ANIMATE OFFICES HEIGHT
     */
    animateOfficesHeight() {
        // animate wrapper height
        const blockOffsetHeight = this.view.querySelector('.search-filter__list--offices').offsetHeight - this.view.querySelector('.search-filter__searchbar').offsetHeight;
        this.searchFilter.style.height = (this.searchFilterOfficesHeight + blockOffsetHeight) + "px";     

        // animate next sibling transform
        let officeSiblings = this.getNextSiblings(this.view);
        for ( let i = 0; i < officeSiblings.length; i++ ){
            officeSiblings[i].style.transform = officeSiblings[i].style.webkitTransform = "translateY("+blockOffsetHeight+"px)";
        }
    }


    /**
     * RESIZE
     */
    resize(){

        // Offices resize
        if (this.pageID == "bureaux" && this.view.classList.contains('search-filter__wrapfilter--active')){
            this.animateOfficesHeight();
        }
    }
}

export default FilterSelect;


// WEBPACK FOOTER //
// ../src/js/custom/elements/FilterSelect.js