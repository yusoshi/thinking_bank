// モバイルでカレンダーを表示する。
$(function() {
    $(".second-header__icon-area__calendar-area a").on("click", function(e) {
        e.preventDefault();
        var header = $("#second-head");
        var topHead = $('#top-head');

        if (topHead.hasClass('idea-index-open')) {
          topHead.toggleClass('idea-index-open');
        }

        if (header.hasClass('open-latest-memos')) {
          header.toggleClass("open-latest-memos");
          header.toggleClass("open-calendar");
        } else {
          header.toggleClass("open-calendar");
        }
    });
});
