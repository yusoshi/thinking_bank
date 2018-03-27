// モバイルで最近のideaを表示する。
$(function() {
    $(".second-header__icon-area__latest-memos-area a").on("click", function(e) {
        e.preventDefault();
        var header = $("#second-head");
        if  (header.hasClass("open-calendar")) {
          header.toggleClass("open-calendar")
          header.toggleClass("open-latest-memos");
        } else {
          header.toggleClass("open-latest-memos");
        }
    });
});
