//import './modules/contrMap';
//import './modules/deliMap';
//import RoadmapSticky__module from './modules/sticky';

//import './modules/listUsers';
//import StickyElement from "./modules/sticky";
//import './modules/SearchFilterInput';

//import Dropdown from './elements/Dropdown';

//import './modules/TableList.es';

//import './modules/Deadline.es';
import './modules/TableKL.es'

class Main {
  constructor() {
    document.addEventListener('DOMContentLoaded', ::this.init);
    //window.addEventListener('load', ::this.loaded); // Full page is loaded
  }
  init() {
    console.log('🐽 HI! FROM LOCAL! 🐽')

    // DROPDOWN
    if ($('.js-dropdown').length) {
      this.view = document;

      const dropdowns = this.view.querySelectorAll('.js-dropdown');
      this.dropdowns = [];
      for (let i = 0; i < dropdowns.length; i++) {
        let $el = dropdowns[i];
        this.dropdowns[i] = new Dropdown('dropdown-' + i, $el);
      }
    }

  }
  loaded() {
    document.querySelector('body').classList.add('isLoaded');
  }
}

new Main();