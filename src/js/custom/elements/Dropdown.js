export default class Dropdown {
  constructor($name, $toggle, hover = false) {
    this.$toggle = $toggle.querySelector('.js-toggle');
    const id = this.$toggle.getAttribute('aria-controls');
    if (!id) return;
    this.hover = hover;
    this.expanded = this.$toggle.getAttribute('aria-expanded') === 'true' || false;
    this.$target = document.getElementById(id);
    this.init();

  }

  init() {
    if (this.hover) {
      this.$toggle.addEventListener('mouseenter', this.toggle.bind(this));
      document.addEventListener('mousemove', this.outsideMove.bind(this));
    } else {
      this.$toggle.addEventListener('click', this.toggle.bind(this));
      //click
      document.addEventListener('click', this.outsideClick.bind(this));
      let _self = this;

    }
  }
  toggle(e) {
    if (this.expanded) {
      //this.$target.hidden = true;
      this.$toggle.setAttribute('aria-expanded', 'false');

      $(this.$target).removeClass('isVisible');

    } else {
      //this.$target.hidden = false;
      this.$toggle.setAttribute('aria-expanded', 'true');
      $(this.$target).addClass('isVisible');


      //click
      $(this.$target).find('a').on('click', e => {
        this.toggle();
      });

    }

    this.expanded = !this.expanded;
  }
  outsideMove() {
    if (
      this.expanded &&
      !isSameOrDescendant(this.$toggle, e.target) &&
      !isSameOrDescendant(this.$target, e.target)
    ) {
      this.toggle();
    }
  }
  outsideClick(e) {
    //console.info(e, e.target, e.currentTarget);
			// console.log($(this.$target).find(a.target).length);
	//console.log(e.target, !e.target.closest('.isActive'));
    if (
      this.expanded &&
        !isSameOrDescendant(this.$toggle, e.target) &&
        !isSameOrDescendant(this.$target, e.target)
    ) {
      this.toggle();
    }
    e.preventDefault();
  }
  destroy() {
    if (this.hover) {
      this.$toggle.removeEventListener('mouseenter', this.toggle);
      document.removeEventListener('mousemove', this.outsideMove);
    } else {
      this.$toggle.removeEventListener('click', this.toggle);
      //click
      window.removeEventListener('click', this.outsideClick);
    }
    this.$toggle = null;
    this.hover = null;
    this.expanded = null;
    this.$target = null;
  }

}

function isSameOrDescendant(parent, child) {
  if (parent === child) return true; // same
  if (child.closest('.xxxx')) return false;
  console.log(child);
  //console.log()
  var node = child.parentNode;
  //console.log('node',node,'parent', parent);

  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
