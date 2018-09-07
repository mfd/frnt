import PageBase from "../../shared/PageBase";

class Abonnement extends PageBase {
	constructor() {
		super("abonnement");

		// Bindings
		this.toggleAllSelects = ::this.toggleAllSelects;
		this.uncheckAllSelects = ::this.uncheckAllSelects;
		this.uncheckUnsubscribeButton = ::this.uncheckUnsubscribeButton;
		// Elements
		this.selectAllCheckbox = this.view.querySelector(".selectall-checkbox input[type='checkbox']");
		this.choiceCheckboxes = this.view.querySelectorAll(".choice_publications input[type='checkbox']");
		this.newsletterUnsubscribe = this.view.querySelector(".newsletter-unsubscribe input[type='checkbox']");
		// Events		
		this.newsletterUnsubscribe.addEventListener("change", this.uncheckAllSelects);
		this.selectAllCheckbox.addEventListener("change", this.toggleAllSelects);

		for (var i = this.choiceCheckboxes.length - 1; i >= 0; i--) {
			this.choiceCheckboxes[i].addEventListener("change", this.uncheckUnsubscribeButton);
		}
	}


	/**
	 * TOGGLE ALL SELECTS
	 */
	toggleAllSelects(event) {
		if (event.target.checked && this.newsletterUnsubscribe.checked)
			this.newsletterUnsubscribe.click()
		
		for(let i = 0; i < this.choiceCheckboxes.length; i++) {
			this.choiceCheckboxes[i].checked = event.target.checked;
		}
	}

	/**
	 * TOGGLE ALL SELECTS Inverted
	 */
	uncheckAllSelects(event) {
		if (!event.target.checked)
			return;
		for(let i = 0; i < this.choiceCheckboxes.length; i++) {
			this.choiceCheckboxes[i].checked = false;
		}
	}

	/**
	 *  UNCHECK UNSUBSCRIBE BUTTON
	 */
	uncheckUnsubscribeButton(event) {
		if (event.target.checked && this.newsletterUnsubscribe.checked)
			this.newsletterUnsubscribe.click();
	}
}

export default Abonnement;


// WEBPACK FOOTER //
// ../src/js/custom/views/abonnement/Abonnement.js