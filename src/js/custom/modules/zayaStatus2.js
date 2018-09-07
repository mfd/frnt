class roadmapFilter {
  constructor (el) {
    let opt = {
      el: el,
      dom: {
        searchInput: '[class*="__search-input"]',
        searchToggleBtn: '[class*="__search-btn"]',
        suggestions: '[class*="__list"]',
        item:      '[class*="__item',
        itemTitle: '[class*="__item-title"]',
        itemCount: '[class*="__item-count"]',
        itemLink: '[class*="__link"]',
        scrollBlock: '[class*="__scroll"]',
        scrollBlockWrapClass: 'b-roadmapGroup__scroll-wrap',
        scrollBlockWrapSelector: '.b-roadmapGroup__scroll-wrap'
      },
      classes: {
        isOpen: 'isOpen',
        isLoaded: 'isLoaded'
      },
      size: {
        height: '',
        count: 7
      }
    };
    // Elements
    this.opt = opt;
    this.view = this.opt.el;
    this.searchInput = this.view.querySelector(opt.dom.searchInput);
    this.searchToggleBtn = this.view.querySelector(opt.dom.searchToggleBtn);
    this.suggestions = this.view.querySelectorAll(opt.dom.suggestions);

    this.dataItems = this.getData();
    this.isOpen = false;

    this.render();
    this.events();

    //bindings
    //this.toggleSearchPanel = ::this.toggleSearchPanel;
    //this.toggleSearchPanel = this.toggleSearchPanel.bind(this);
  }

  getData() {
    let elem = this.view;
    let opt = this.opt;
    const aUsers = Array.from(elem.querySelectorAll(opt.dom.itemTitle)).map(f => f.textContent);
    const aCount = Array.from(elem.querySelectorAll(opt.dom.itemCount)).map(f => f.textContent);
    const aID = Array.from(elem.querySelectorAll(opt.dom.itemLink)).map(f => f.dataset.id?f.dataset.id:'66');
    const users = aUsers.map((item, index) => {
      return {
          name: item,
          count: aCount[index],
          id: aID[index]
        }
      });
    return users
  }

  toggleSearchPanel(e) {
    let parent = e.target.parentElement
    let isOpen = parent.classList.contains(this.opt.classes.isOpen);

    parent.classList.toggle(this.opt.classes.isOpen);

    if (isOpen) {
      //console.log('close search')
      this.displayMatches('');
      this.searchInput.value = '';
    }
  }

  scrollBlock() {
    let el = this.view;
    let opt = this.opt;
    // var _wrap = $(".b-zayaUsers-group--scroll");
    // var _height = $(".b-zayaUsers__item").innerHeight()*10;
    let _scrollBlock = el.querySelector(opt.dom.scrollBlock);
    let _height = el.querySelector(opt.dom.item).clientHeight * 5;

    //_scrollBlock.wrapInner( "<div class='b-zayaUsers-group--scroll-wrap'></div>");
    _scrollBlock.innerHTML = `<div class='${opt.dom.scrollBlockWrapClass}'>${_scrollBlock.innerHTML}</div>`;
    //$(".b-zayaUsers-group--scroll-wrap").css({ height: _height});
    el.querySelector(opt.dom.scrollBlockWrapSelector).style.height = `${_height}px`;
    //_scrollBlock.style.border = "3px solid #f5f5f5";

    _scrollBlock.scrollTop = 0;
    this.ps = new PerfectScrollbar(
      _scrollBlock, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 10,
        suppressScrollX: true,
        useBothWheelAxes: true
      });
    return this.ps
  }
  findMatches(wordToMatch, users) {
    return users.filter(user => {
      const regex = new RegExp(wordToMatch, 'gi');
      return user.name.match(regex)
    });
  }

  displayMatches(val) {
    //var val = e.key;
    const matchArray = this.findMatches(val, this.dataItems);
    //console.log(matchArray);
    const html = matchArray.map(item => {
      const regex = new RegExp(val, 'gi');
      const uName = item.name.replace(regex, val);
      const uCount = item.count;
      return `
        <li class="b-zayaUsers__item userLink" id="userLink__${item.id}">
          <a href="#" class="b-zayaUsers__link" onclick="deliveryAssignedUserChanged(${item.id}); return false;">
            <i class="b-zayaUsers__item-icon zmdi zmdi-account-box"></i>
            <span class="b-zayaUsers__item-title">${uName}</span>
            <span class="b-zayaUsers__item-count badge">${item.count}</span>
          </a>
        </li>
      `;
    }).join('');
    //this.suggestions.innerHTML = html;
    this.view.querySelector('ul').innerHTML = html;
    this.ps.update();
  }

  events() {
    var that = this;
    let $dom = this.opt.dom;

    let $searchToggleBtn = that.view.querySelector($dom.searchToggleBtn);
    $searchToggleBtn.addEventListener('click', that.toggleSearchPanel.bind(this));

    let $searchInput = that.view.querySelector($dom.searchInput);

    $searchInput.addEventListener('keyup', ()=> {
      let val = $searchInput.value;
      that.displayMatches(val);
    });

    $searchInput.addEventListener('change', ()=> {
      let val = $searchInput.value;
      that.displayMatches(val);
      console.log('change',this.view,val);
    });

    $searchInput.addEventListener('blur', ()=> {
      setTimeout(function () {
        console.log('blur');
      }
      , 1000);

    });


    document.addEventListener('keyup', (e)=> {
      //console.log(e.key);
    });

  }

  render() {
    this.scrollBlock();
    this.view.classList.add(this.opt.classes.isLoaded);
  }


}

export default roadmapFilter;










