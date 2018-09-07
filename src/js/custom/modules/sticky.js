
class StickyElement {
  constructor(el, offset) {
    let opt = {
      el: el,
      dom: {
      },
      classes: {
        isFixed: '--isFixed',
        isLoaded: 'isLoaded'
      },
      offset: offset || 100
    };
    this.opt = opt;
    this.view = this.opt.el;

    this.el = this.opt.el;
    this.position = el.offsetTop;
    //this._onScroll();
    //window.addEventListener('scroll', this._onScroll.bind(this));

    this.events();
    this.sticky();
    window.addEventListener('scroll', this.sticky.bind(this));


    // window.addEventListener('scroll', (e) => {
    //     sy = window.pageYOffset || document.documentElement.scrollTop;
    //     console.log(sy);
    // })


    document.addEventListener('keyup', (e)=> {
      console.log(e.key);
    });

  }

  // _onScroll(event) {
  //   console.log(scroll)
  //   if (this.aboveScroll()) {
  //     this.setFixed();
  //     console.log('setFixed');
  //   } else {
  //     this.setStatic();
  //     console.log('setStatic');
  //   }
  // }
  // aboveScroll() {
  //   return this.position < window.scrollY;
  // }
  // setFixed() {
  //   this.el.classList.add(this.opt.classes.isFixed);
  //   // not needed if added with CSS Class
  //   this.el.style.position = 'fixed';
  //   this.el.style.top = '10px';
  // }
  // setStatic() {
  //   this.el.classList.remove(this.opt.classes.isFixed);
  //   // not needed if added with CSS Class
  //   this.el.style.position = 'static';
  //   this.el.style.top = 'auto';
  // }


  sticky() {
    console.log('start sticky')
    const opt = this.opt;
    const offset = this.opt.offset;
    const el = this.view;

    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    if (top > offset) {
      el.classList.add(opt.classes.isFixed);
      console.log('set',opt.classes.isFixed)
    } else {
      el.classList.remove(opt.classes.isFixed);
      console.log('unset',opt.classes.isFixed)
    }
  }
  events() {

  }
}

export default StickyElement;


// WEBPACK FOOTER //
// ../src/js/custom/elements/StickyElement.js