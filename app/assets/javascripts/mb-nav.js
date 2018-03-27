// トグルオープン
$(function() {
    $(".toggle-area").on("click", function(e) {
        e.preventDefault();
        var header = $("#top-head");
        var secondHeader = $("#second-head");
        if ($('div').hasClass('second-header')) {
          if (secondHeader.hasClass('open-latest-memos')) {
            secondHeader.toggleClass('open-latest-memos');
            header.toggleClass("idea-index-open");
          } else if (secondHeader.hasClass('open-calendar')) {
            secondHeader.toggleClass('open-calendar');
            header.toggleClass("idea-index-open");
          } else {
            header.toggleClass("idea-index-open");
          }
        } else {
          header.toggleClass("open");
        }
    });
});


