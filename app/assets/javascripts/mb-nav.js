$(function() {
    $(".toggle-area").on("click", function(e) {
        e.preventDefault();
        var $header = $("#top-head")
        $header.toggleClass("open");
    });
});
