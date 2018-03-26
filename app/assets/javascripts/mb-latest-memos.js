// モバイルで最近のideaを表示する。
$(function() {
    $(".second-header__icon-area__latest-memos-area a").on("click", function(e) {
        e.preventDefault();
        var $header = $("#second-head");
          $header.toggleClass("open");
    });
});
