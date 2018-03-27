// モバイルでカレンダーを表示する。
$(function() {
    $(".second-header__icon-area__calendar-area a").on("click", function(e) {
        e.preventDefault();
        var header = $("#second-head");
        if (header.hasClass('open-latest-memos')) {
          header.toggleClass("open-latest-memos");
          header.toggleClass("open-calendar");
        } else {
          header.toggleClass("open-calendar");
        }
    });
});
