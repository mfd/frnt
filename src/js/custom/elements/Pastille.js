/**
 * Pastille
 */

class Pastille {

    constructor (id, view) {

        // Bindings
        this.pastilleHover = ::this.pastilleHover;
        this.pastilleHoverOut = ::this.pastilleHoverOut;
        this.id = id;
        this.view = view;

        // Els
        this.circles = this.view.querySelectorAll('.circle_bg');
        this.losanges = this.view.querySelectorAll('.losange_bg');

        // Listeners
        this.view.addEventListener('mouseenter',this.pastilleHover); 
    }

    // Pastille hover morph
    pastilleHover(){

        for ( let i = 0; i < this.circles.length; i++ ){
            TweenMax.to( this.circles[i], .5, {morphSVG:this.losanges[i]} );
        }

        this.view.removeEventListener('mouseenter',this.pastilleHover); 
        this.view.addEventListener('mouseleave',this.pastilleHoverOut); 
    }

    // Pastille hover out morph back
    pastilleHoverOut(){

        for ( let i = 0; i < this.circles.length; i++ ){
            TweenMax.to( this.circles[i], .5, {morphSVG:this.circles[i]} );
        }

        this.view.addEventListener('mouseenter',this.pastilleHover); 
        this.view.removeEventListener('mouseleave',this.pastilleHoverOut); 
    }

}

export default Pastille;


// WEBPACK FOOTER //
// ../src/js/custom/elements/Pastille.js