// モバイルで最近のideaを表示する。
$(function() {
    $(".second-header__icon-area__latest-memos-area a").on("click", function(e) {
        e.preventDefault();
        var header = $("#second-head");
        var topHead = $('#top-head');

        if (topHead.hasClass('idea-index-open')) {
          topHead.toggleClass('idea-index-open');
        }
        
        if  (header.hasClass("open-calendar")) {
          header.toggleClass("open-calendar")
          header.toggleClass("open-latest-memos");
        } else {
          header.toggleClass("open-latest-memos");
        }
    });
});
