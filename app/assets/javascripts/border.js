// トップページ以外のモバイルヘッダーにborder-bottomをつける
$(document).ready(function() {

  if ( $('div').hasClass('second-header') ) {
  } else {
    var object = $('#top-head');
    object.addClass('border-bottom');
  }
});
