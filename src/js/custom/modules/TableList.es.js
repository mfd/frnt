class TableList {
  constructor(el) {
    this.view = el;
    this.opt = {
      }
    this.switched = false
    this.tmpDiv = null
    this.table = el
    this.lastKnownScrollPosition = 0
    this.fixedPos = $(el).offset().top

    this.init()
  }
  init() {

    $(this.table).wrap( "<div class='table-wrapper'></div>");

    this.renderTableHead();
    $('#ps-content').on('scroll', this.fixedTableHead.bind(this));

    this.updateTables()
    window.addEventListener('resize', this.updateTables.bind(this));



    console.log('TableList 📋', this.view);
  }
  renderTableHead() {
    let el = this.table;
    $(el).clone()
      .prependTo(".table-wrapper")
      .wrap('<div class="table-fixedHead"></div>');
    $(el).parent().find('.table-fixedHead').css({"height":$(el).find('thead').height()+15});
  }
  fixedTableHead(e) {
      //console.log($(e.currentTarget).scrollTop());
      //lastKnownScrollPosition = window.pageYOffset
      let ticking = false;
      let startScrollPosition = 0;
      let lastKnownScrollPosition = $(e.currentTarget).scrollTop();
      let el = this.table;
      let fixedPos = this.fixedPos;
      if (!ticking && lastKnownScrollPosition > fixedPos) {
        window.requestAnimationFrame(() => {
          //console.log({lastKnownScrollPosition},{fixedPos});
          $(el).parent().find('.table-fixedHead').addClass('isActive')
          ticking = false
        })
      } else {
          $(el).parent().find('.table-fixedHead').removeClass('isActive')
      }
      ticking = true

  }
  updateTables() {
    let el = this.view;
    let win = 767;
    console.log(window.innerWidth, {win});
    if ((window.innerWidth < win) && !this.switched) {
      this.switched = true
      this.scrollTable(this.table)

      return true
    } else if (this.switched && (window.innerWidth > win)) {
      this.switched = false
      //this.scrollTable(this.table)
    }
    $(el).parent().find('.table-fixedHead')
      .width($(el).width()+1)
      .css({"left":$(el).offset().left});
  }
  scrollTable(el) {
    //$(el).wrap( "<div class='table-wrapper'></div>");
    //$(".table-wrapper").css({ width: window.innerWidth});
    //$(el).addClass('scrollable').scrollTop(0);
    const ps = new PerfectScrollbar('.table-wrapper', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 10,
      suppressScrollY: true,
      useBothWheelAxes: true
    });
  }
}

const el = Array.from(document.querySelectorAll('[data-module="TableList"]'))
if (el) el.forEach(el => { new TableList(el) })


