$(function() {
    $(".toggle-area").on("click", function(e) {
        e.preventDefault();
        var $header = $("#top-head");
        if ($('div').hasClass('second-header')) {
          $header.toggleClass("idea-index-open");
        } else {
          $header.toggleClass("open");
        }
    });
});
