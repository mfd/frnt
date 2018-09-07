




//toggle
var toggleSearchPanel = function(e) {
  this.parentElement.classList.toggle('is-open');
  let isOpen = this.parentElement.classList.contains('is-open');
  if (isOpen) {
    console.log('open')
  }
  console.log('toggle');
}
const toggleSearch = document.querySelectorAll('.b-zayaUsers__search-btn');
toggleSearch.forEach(panel => panel.addEventListener('click', toggleSearchPanel));
//toggleSearch.forEach(panel => panel.addEventListener('transitionend', toggleActive));


// scroll

var scrollBar = function() {
  var $wrap = $(".b-zayaUsers-group--scroll");
  var $height = $(".b-zayaUsers__item").innerHeight()*10;
  $wrap.wrapInner( "<div class='b-zayaUsers-group--scroll-wrap'></div>");
  $(".b-zayaUsers-group--scroll-wrap").css({ height: $height});
  $wrap.scrollTop(0);
  const ps = new PerfectScrollbar('.b-zayaUsers-group--scroll', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 10,
    suppressScrollX: true,
    useBothWheelAxes: true
  });
}

scrollBar();


// render


// const aUsers = Array.from(el.querySelectorAll('[class*="-title"]')).map(f => f.textContent);

const elem = document.querySelector('.b-zayaUsers');
const aUsers = Array.from(elem.querySelectorAll('.b-zayaUsers__item-title')).map(f => f.textContent);
const aCount = Array.from(elem.querySelectorAll('.b-zayaUsers__item-count')).map(f => f.textContent);
const aID = Array.from(elem.querySelectorAll('.b-zayaUsers__link')).map(f => f.dataset.id?f.dataset.id:'6969');

const users = aUsers.map((item, index) => {
  return {
      name:item,
      count:aCount[index],
      id:aID[index]
    }
  });

//console.log(JSON.stringify(users));
console.log(users);

// method
function findMatches(wordToMatch, users) {
  return users.filter(user => {
    const regex = new RegExp(wordToMatch, 'gi');
    return user.name.match(regex)
  });
}


// method
function displayMatches() {
  const matchArray = findMatches(this.value, users);
  console.log(matchArray);
  const html = matchArray.map(item => {
    const regex = new RegExp(this.value, 'gi');
    const uName = item.name.replace(regex, this.value);
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
  suggestions.innerHTML = html;
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.b-zayaUsers');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);



const zLink = document.querySelectorAll('.b-zayaUsers__link');


zLink.forEach(link => link.addEventListener('click', (e) => {
    const el = e.target;
    const index = el.dataset.index;
    if (e.target.tagName !== 'A') return;
    console.log(`e=>${e.target.dataset.id}`);

    //e.stopPropagation(); // stop bubbling!
  }));


