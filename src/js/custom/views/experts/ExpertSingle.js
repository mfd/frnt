import PageBase from "../../shared/PageBase";

class ExpertSingle extends PageBase {

	constructor() {
		
		super("expert-single");

		// Bindings
		this.revealInfos = ::this.revealInfos;

		// Els
		this.expertInfos = this.view.querySelector('.banner-header .expert .expert__infos');

	}

	display() {

		super.display();
		TweenMax.delayedCall(0.4, this.revealInfos);
	}

	revealInfos() {

		this.expertInfos.classList.add('reveal');
	}
}

export default ExpertSingle;


// WEBPACK FOOTER //
// ../src/js/custom/views/experts/ExpertSingle.js