$('.btn-swal').click((e) => {
  e.preventDefault();
  swal({
    title: 'Date picker',
    html: '<div id="datepicker"></div>',
    showConfirmButton: false,
    onOpen: function() {
      $('#datepicker').datepicker({
        onSelect: swal.clickConfirm
      });
    },
    preConfirm: function() {
      return Promise.resolve($('#datepicker').datepicker('getDate'));
    }
  }).then(function(result) {
    swal({
      type: 'success',
      html: 'You entered: <strong>' + result + '</strong>'
    });
  });
});