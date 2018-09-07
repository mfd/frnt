//import SmoothScrollManager from 'nsfw/managers/SmoothScrollManager';
import ResizeManager from 'nsfw/managers/ResizeManager';
import RafManager from 'nsfw/managers/RafManager';
import DeviceInfo from 'nsfw/utils/DeviceInfo';

import PageBase from "./shared/PageBase";
import Header from "./shared/header/Header";
import Loading from "./shared/Loading";


class Main {

    constructor () {
        document.addEventListener('DOMContentLoaded', ::this.init);

        window.addEventListener('load', ::this.loaded); // Full page is loaded
    }

    init () {
    	DeviceInfo.check();
        ResizeManager.start();
        //SmoothScrollManager.start(); //custom
        RafManager.start();
        this.custom();
        // Fix for safari loading before init
        // if(this.loadedCancelled) {
        //     this.loaded();
        // }
    }

    // Page is loaded, display current page on loading animation completed
    loaded() {
        if(this.header) {
            const loading = new Loading(this.page, this.header);
        }
        else {
            this.loadedCancelled = true;
        }
    }

    custom() {


    }

}

new Main();


// WEBPACK FOOTER //
// ../src/js/custom/Main.js