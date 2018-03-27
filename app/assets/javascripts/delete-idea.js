// 非同期でideaを削除する。
$(function() {
  $(document).on('click', '.content__main__memos-area__memo-area__edit-and-delete__delete', function(e) {
    e.preventDefault();

    // DOMで、ideaをリアルタイムで削除
    function removeIdea(idea) {
    $('.content__main__memos-area__memo-area[data-id=' + idea.id +']').remove();
    }

    var selectedMemoArea = $(this).parent().parent();
    var id = selectedMemoArea.data('id');

    if (confirm('このアイデアを削除します。よろしいですか？')) {
      $.ajax({
        type: 'DELETE',
        url: '/ideas/' + id + '.json'
      })
      .done(function(idea) {
        removeIdea(idea);
      })
      .fail(function() {
        alert('削除に失敗しました。');
      })
    } else {
    }
      ;

  })
})
