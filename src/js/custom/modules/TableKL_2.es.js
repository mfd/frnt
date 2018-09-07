let demo;
let fixedTable;

fixedTable = el => {
  let $body;
  let $header;
  let $sidebar;
  $body = $(el).find('.fixedTable-body');
  $sidebar = $(el).find('.fixedTable-sidebar table');
  $header = $(el).find('.fixedTable-header table');

  return $($body).scroll(() => {
    $($sidebar).css('margin-top', -$($body).scrollTop());
    return $($header).css('margin-left', -$($body).scrollLeft());
  });
};

demo = new fixedTable($('#demo'));