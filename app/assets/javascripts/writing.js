$(function() {
  // ideaがsubmitされたら非同期通信を行う
  $('#new_idea').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData($('form#new_idea').get(0));

    $.ajax({
      type: 'POST',
      url: '/ideas.json',
      data: formData,
      processData: false,
      contentType: false
    })
    // アイデアの保存に成功した場合
    .done(function(data) {
      alert(data);
    })
    .fail(function() {
      alert('送信に失敗しました。')
    })
  });
});
