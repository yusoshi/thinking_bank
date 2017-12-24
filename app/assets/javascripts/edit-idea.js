$(function() {
  $('.content__main__memos-area__memo-area__edit-and-delete__edit').on('click', function(e) {
    e.preventDefault();

    var id = $('.content__main__memos-area__memo-area').data('id');
    var selectedIdea = $('.content__main__memos-area__memo-area[data-id=' + id + ']');
    console.log(selectedIdea.children());
  })
})
