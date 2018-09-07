import PageBase from "../../shared/PageBase";

class Bureaux extends PageBase {

	constructor() {
		
		super("bureaux");

		// Get offices total height
		const searchFilter = this.view.querySelector('.search-filter');
		this.searchFilterOfficesHeight = searchFilter.offsetHeight;
	}
}

export default Bureaux;



// WEBPACK FOOTER //
// ../src/js/custom/views/bureaux/Bureaux.js