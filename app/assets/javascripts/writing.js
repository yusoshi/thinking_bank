/*  ヘッダーの書き込みボタンがクリックされたら
    書き込みスペースをDOMで追加する*/
$(function() {
  $('.writing').on('click', function(e) {
    e.preventDefault();
    if ($('div').hasClass('content__main__writing-area')) {
      $('.content__main__writing-area').remove();
    } else {
      var contentMain = $('.content__main');
      var writingArea1 = contentMain.prepend(
        '<div class="content__main__writing-area"><div class="content__main__writing-area__title-area"><div class="content__main__writing-area__title-area__square square"></div><div class="content__main__writing-area__title-area__title"></div></div><div class="content__main__writing-area__memo-area"></div></div>');
      }
    });

});
