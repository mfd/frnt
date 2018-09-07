/**
 * Expert Bar
 */

class ExpertBar {

    constructor (id, view) {

        // Els
        this.id = id;
        this.view = view;
        this.viewParent = this.view.parentElement;
        this.expert = this.view.previousElementSibling;
        this.isMobile = false;

        // Bindings
        this.expertShow = ::this.expertShow;
        this.expertHide = ::this.expertHide;
        this.wrapper = document.querySelector(".scroll-wrapper");

        // Listeners
        this.view.addEventListener('click',this.expertShow); 

        // Take expert bar + expert content out of scroll
        if ( window.w <= 768 ) {
            this.isMobile = true;
            this.wrapper.insertBefore(this.expert, this.wrapper.firstChild);
            this.wrapper.insertBefore(this.view, this.wrapper.firstChild);
        }
    }

    // Expert show
    expertShow() {

        document.body.style.overflow = "hidden";

        this.view.classList.add('active');
        this.expert.classList.add('active'); 

        this.view.removeEventListener('click',this.expertShow); 
        this.view.addEventListener('click',this.expertHide); 
    }

    // Expert hide
    expertHide() {

        document.body.style.overflow = "visible";

        this.view.classList.remove('active');
        this.expert.classList.remove('active');

        this.view.removeEventListener('click',this.expertHide); 
        this.view.addEventListener('click',this.expertShow); 
    }

    // Insert after
    insertAfter(newNode, referenceNode) {

        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    resize() {

        if ( window.w <= 768 && !this.isMobile ) {
            this.isMobile = true;
            this.wrapper.insertBefore(this.view, this.wrapper.firstChild);
            this.wrapper.insertBefore(this.expert, this.wrapper.firstChild);

        } else if ( window.w > 768 && this.isMobile ) {
            this.isMobile = false;
            this.insertAfter(this.view, this.viewParent.lastChild);
            this.insertAfter(this.expert, this.viewParent.lastChild);
        }
    }
}

export default ExpertBar;


// WEBPACK FOOTER //
// ../src/js/custom/elements/ExpertBar.js