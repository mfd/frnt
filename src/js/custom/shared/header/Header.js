import SmoothScrollManager from "nsfw/managers/SmoothScrollManager";
import ResizeManager from "nsfw/managers/ResizeManager";

import EventsManager from "nsfw/events/EventsManager";
import Events from "nsfw/events/Events";

import MenuLink from "./MenuLink";
import Select from "./Select";

class Header {
	constructor() {
		
		// Bindings
		this.scroll = ::this.scroll;
		this.resize = ::this.resize;
		this.toggleMenu = ::this.toggleMenu;
		this.toggleFooterSubmenu = ::this.toggleFooterSubmenu;

		// Elements
		this.view = document.querySelector("header");
		this.menuBtn = this.view.querySelector(".header__menu-btn");
		this.menuBtnItems = this.menuBtn.querySelectorAll("span");
		this.primaryNav = this.view.querySelector(".header__nav--primary");
		this.primaryLinks = this.view.querySelectorAll(".header__nav--primary > ul > li");
		this.footerLinks = this.view.querySelectorAll(".mobile-nav--footer > li");
		this.utilityNav = this.view.querySelectorAll(".mobile-nav--utility");
		this.filterGeolocMobile = this.view.querySelector(".mobile-nav--search-filter");
		this.socialLinks = this.view.querySelectorAll(".mobile-nav--socials li");

		// Dropdown for geoloc (if mobile, move in mobile menu)
		this.filterGeoloc = this.view.querySelector(".search-filter--geoloc");
        const filterGeoloc = new Select('filter-select-header', this.filterGeoloc);
        if(window.w < 980) {
        	this.filterGeolocMobile.appendChild(this.filterGeoloc);
        }

		if(window.isDesktop) {
			// Menu links hover animation border
			this.menuLinks = [];
			for (var i = 0; i < this.primaryLinks.length; i++) {
				this.menuLinks[i] = new MenuLink(this.primaryLinks[i]);
			}
		}

		// Params
		this.id = "header";
		this.headerIsSticky = false;
		this.triggerOffset = 20;
		this.menuIsOpened = false;
		this.submenuDefaultHeight = 53;
		this.oldScrollTop = 0;
		this.oldWidth = window.w;

		// Managers
		SmoothScrollManager.bind(this.id, this.scroll);
		ResizeManager.bind(this.id, this.resize);

		// Events
		if(window.w < 980) {
			this.menuBtn.addEventListener("click", this.toggleMenu);
			for (let i = 0; i < this.footerLinks.length; i++) {
				this.footerLinks[i].addEventListener("click", this.toggleFooterSubmenu);
			}
		}

		// Fix for spread operator in IE11
		if(window.isIE) {
			this.primaryLinks = Array.prototype.slice.call(this.primaryLinks);
			this.footerLinks = Array.prototype.slice.call(this.footerLinks);
			this.socialLinks = Array.prototype.slice.call(this.socialLinks);
		}

		// Timeline menu mobile
		this.tl = new TimelineMax({
						paused: true,
						onComplete: () => {
							// Fix for IOS overflow
							if(window.isSafari && window.isMobile) {
								document.documentElement.classList.add("overflow-hidden");
								document.body.style.height = "100%";
							}
						},
						onReverseComplete: () => {
							// Fix for IOS overflow
							if(window.isSafari && window.isMobile) {
								document.documentElement.classList.remove("overflow-hidden");
								document.body.style.height = "auto";
							}
						}
					})
					.to(this.primaryNav, 0.5, {css: {transform: "scale(1)"}, ease: Power2.EaseInOut})
					.staggerTo([...this.primaryLinks, ...this.footerLinks, this.utilityNav, this.filterGeolocMobile, ...this.socialLinks], 0.3, {css: {autoAlpha: 1, transform: "translateX(0)"}, ease: Power2.EaseInOut}, 0.03, "-=0.2");
	
		// Timeline menu btn mobile
		this.btnTL = new TimelineMax({paused: true})
						.to(this.menuBtnItems[0], 0.25, {css: {transform: 'translateY(10px)'}, ease: Power2.EaseInOut}, 0)
						.to(this.menuBtnItems[2], 0.25, {css: {transform: 'translateY(-10px)'}, ease: Power2.EaseInOut}, 0)
						.to(this.menuBtn, 0.4, {rotation: 270, ease: Power2.EaseInOut}, 0.2)
						.to(this.menuBtnItems[0], 0.25, {css: {transform: 'translateY(10px) rotate(-45deg)'}, ease: Power2.EaseInOut}, 0.35)
						.to(this.menuBtnItems[1], 0.05, {autoAlpha: 0, ease: Power2.EaseInOut}, 0.35)
						.to(this.menuBtnItems[2], 0.25, {css: {transform: 'translateY(-10px) rotate(45deg)'}, ease: Power2.EaseInOut}, 0.35);
	}


	/**
	 * DISPLAY
	 */
	display() {
		TweenMax.to(this.view.children, 0.8, {css: {transform: "translateY(0)"}, ease: Back.easeOut.config(1.3)});

		TweenMax.set(this.view, {css: {backgroundColor: "#fff"}, delay: 0.35});
	}


	/**
	 * SCROLL
	 */
	scroll() {
		if(this.menuIsOpened) return;

		if(window.w >= 980) {
			if(window.currentScrollTop >= this.triggerOffset && !this.headerIsSticky) {
				this.headerIsSticky = true;
				this.view.classList.add("header--sticky");
			}
			else if(window.currentScrollTop < this.triggerOffset && this.headerIsSticky) {
				this.headerIsSticky = false;
				this.view.classList.remove("header--sticky");
			}
		}
		else {
			if(window.currentScrollTop > 80) {
				if(window.currentScrollTop > this.oldScrollTop && !this.headerIsSticky) {
					this.headerIsSticky = true;

					this.view.classList.add("header--sticky");

					EventsManager.emit(Events.Header.TOGGLE, false);
				}
				else if(window.currentScrollTop <= this.oldScrollTop && this.headerIsSticky) {
					this.headerIsSticky = false;
					
					this.view.classList.remove("header--sticky");

					EventsManager.emit(Events.Header.TOGGLE, true);
				}

				this.oldScrollTop = window.currentScrollTop;
			}
		}
	}


	/**
	 * TOGGLE MENU
	 */
	toggleMenu(hideNav) {
		if(this.menuIsOpened) {
			if(hideNav) this.tl.reverse();
			this.btnTL.reverse();

			this.view.classList.remove("menu--opened");
			document.body.classList.remove("overflow-hidden");

			this.menuIsOpened = false;
		}
		else {
			this.tl.restart();
			this.btnTL.restart();

			this.view.classList.add("menu--opened");
			document.body.classList.add("overflow-hidden");

			this.menuIsOpened = true;
		}
	}


	/**
	 * TOGGLE FOOTER SUBMENU
	 */
	toggleFooterSubmenu(event) {
		if(event.target.classList.contains("submenu--opened")) {
			TweenMax.to(event.target, 0.5, {css: {maxHeight: `${this.submenuDefaultHeight}px`}, ease: Power2.EaseInOut});
			event.target.classList.remove("submenu--opened");
		}
		else {
			if(event.target.querySelector("ul")) {
				for (let i = 0; i < this.footerLinks.length; i++) {
					TweenMax.to(this.footerLinks[i], 0.5, {css: {maxHeight: '53px'}, ease: Power2.EaseInOut});
					this.footerLinks[i].classList.remove("submenu--opened");
				}

				const height = event.target.querySelector("ul").offsetHeight;
				TweenMax.to(event.target, 0.5, {css: {maxHeight: `${this.submenuDefaultHeight + height + 15}px`}, ease: Power2.EaseInOut});
				
				event.target.classList.add("submenu--opened");
			}
		}		
	}


	/**
	 * RESIZE
	 */
	resize() {
		if(window.w >= 980 && this.oldWidth < 980) {
			TweenMax.set([this.primaryNav, ...this.primaryLinks, ...this.footerLinks, this.utilityNav, ...this.socialLinks], {clearProps:"all"});
			TweenMax.set(this.view.children, {y: 0});

			this.menuBtn.removeEventListener("click", this.toggleMenu);
			for (let i = 0; i < this.footerLinks.length; i++) {
				this.footerLinks[i].removeEventListener("click", this.toggleFooterSubmenu);
			}
			
			window.headerHidden = false;

			if(this.menuIsOpened) {
				this.toggleMenu(false);
			}
        
			// Move dropdown geoloc in header top bar
        	this.view.querySelector(".header__secondary").insertBefore(this.filterGeoloc, this.view.querySelector(".header__nav--secondary"));

		}
		else if(window.w < 980 && this.oldWidth >= 980) {
			this.menuBtn.addEventListener("click", this.toggleMenu);
			for (let i = 0; i < this.footerLinks.length; i++) {
				this.footerLinks[i].addEventListener("click", this.toggleFooterSubmenu);
			}

			// Move dropdown geoloc in mobile menu
        	this.filterGeolocMobile.appendChild(this.filterGeoloc);
		}
		
		this.oldWidth = window.w;
	}
}

export default Header;


// WEBPACK FOOTER //
// ../src/js/custom/shared/header/Header.js