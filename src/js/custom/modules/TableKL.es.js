class KL {
  constructor() {
    this.init()
  }
  init() {
    let el = $('[data-module="zayaKL"]')[0];
    if ($(el).hasClass('splitted')) return

    this.view = el;
    this.table = $(el).find('.table-KL');
    this.tableTemplate = this.table.clone()[0];
    this.fullHead = false

    this.splitTable()

    this.updateTables()
    this.initScroll()
    this.crossHover()

    $('.btn-show-requisites').on('click', this.showRekv.bind(this));

    window.addEventListener('scroll', this.updateTables.bind(this))
    if ($('.zayaKL__qsearch').length) {
      $(el).find('.fixedTable-prefix table .zayaKL__qsearch')
        .on('input keyup keypress', this.quickSearch.bind(this));
        // .on('keyup', (e) => {
        //   console.log($(this).val());
        // });
    }
    setTimeout(function() {
      $(document).trigger('CopetetiveTableRefresh');
    }, 2000)


    console.log('Zaya KL list ☑️', this.view);
  }

  splitTable () {
    let el = this.table;
    $(el).clone()
      .prependTo(".zayaKL")
      .wrap('<div class="fixedTable-prefix"></header>');
    $(el).clone()
      .appendTo(".zayaKL")
      .wrap('<header class="fixedTable-header"><div class="fixedTable-headerWrap"></div></header>');
    $(el).clone()
      .appendTo(".zayaKL")
      .wrap('<aside class="fixedTable-sidebar"><div class="fixedTable-sidebarWrap"></div></aside>');
    $(el).clone()
      .appendTo(".zayaKL")
      .wrap('<div class="fixedTable-body"><div class="fixedTable-bodyWrap"></div></div>');
    $(el).remove()
    $(this.view).addClass('splitted')
    return this.view
  }

  updateTables() {
    console.log(window.innerWidth);
    let el = this.view;
    let $body = $(el).find('.fixedTable-body');
    let $header = $(el).find('.fixedTable-header table');
    let $sidebar = $(el).find('.fixedTable-sidebar table');
    console.log(-$($body).scrollTop())
    return $($body).scroll(() => {
      $($sidebar).css('margin-top', -$($body).scrollTop());
      return $($header).css('margin-left', -$($body).scrollLeft());
    });
  }

  initScroll() {
    this.ps = new PerfectScrollbar('.fixedTable-body', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 10,
    });
  }

  crossHover() {
    let self = this;
    let el = this.view;
    $(this.view).find(".fixedTable-body table tr").each(function(idx){
      $(this).hover(function(el){
        $(this).addClass('hover');
        $(self.view).find(`.fixedTable-sidebar table tr:eq(${idx})`).addClass('hover')
      }, function(){
        $(this).removeClass('hover');
        $(self.view).find(`.fixedTable-sidebar table tr:eq(${idx})`).removeClass('hover')
      });
    });
    $(this.view).find(".fixedTable-sidebar table tr").each(function(idx){
      $(this).hover(function(el){
        $(this).addClass('hover');
        $(self.view).find(`.fixedTable-body table tr:eq(${idx})`).addClass('hover')
      }, function(){
        $(this).removeClass('hover');
        $(self.view).find(`.fixedTable-body table tr:eq(${idx})`).removeClass('hover')
      });
    });

    $('td').hover(function() {
     $(this).parents('table').find('col:eq('+$(this).index()+')').toggleClass('hover');
    });
  }

  quickSearch(e) {
    let tr, td, i;
    const code = event.which;
    const $target = $(event.target);
    const value = $target[0].value;
    //debugger

    let input = this.qsearch
    let filter = value.toUpperCase();

    let tableSidebar = this.view.querySelectorAll('.fixedTable-sidebar table tbody')[0].getElementsByTagName("tr")
    let tableBody = this.view.querySelectorAll('.fixedTable-body table tbody')[0].getElementsByTagName("tr")


    //tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    function showhide(tr) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    showhide(tableSidebar)
    showhide(tableBody)
  }

  showRekv(e) {
    //console.info(e, e.target, e.currentTarget);
    this.fullHead = !this.fullHead ? true : false;
    if (this.fullHead) {
      $(this.view).addClass('fullHead')
      $(e.currentTarget).text('Скрыть реквизиты')
    } else {
      $(this.view).removeClass('fullHead')
      $(e.currentTarget).text('Показать реквизиты')
    }
    e.preventDefault();
  }
  initChat() {
  }
  destroy() {

  }

}
const el = $('[data-module="zayaKL"]')[0];
if (el) window.instanceKL = new KL();


// const el = Array.from(document.querySelectorAll('[data-module="zayaKL"]'))
// if (el) el.forEach(el => {

// })


