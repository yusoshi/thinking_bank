$(function() {
  // ideaがsubmitされたら非同期通信を行う
  $('#new_idea').on('submit', function(e) {
    e.preventDefault();

    // 非同期でアイデアを表示する。
    function insertIdea(idea) {
      var memosArea = $('.content__main__memos-area');

      // 時間取得
      var ideaTime1 = idea.created_at.replace(/-/g, '/');
      var ideaTime2 = ideaTime1.replace('T', ' ');

    // フォーム内の改行を反映できるようにせよ。
      var ideaTime3 = ideaTime2.replace(/\:\d\d.\d\d\d.\d\d.\d\d$/, ' ');

      // bodyの改行を有効にする。
      // できてません。
      var tempBody = idea.body;
      var body = tempBody.replace(/\\r\\n/g, "<br>");

      memosArea.prepend('<li class="content__main__memos-area__memo-area"><div class="content__main__memos-area__memo-area__title-area"><div class="content__main__memos-area__memo-area__title-area__square square"></div><h3 class="content__main__memos-area__memo-area__title-area__title">' + idea.title +'</h3></div><div class="content__main__memos-area__memo-area__date-area"><span>作成日 ' + ideaTime3 + '</span><span>最終更新日 ' + ideaTime3 + '</span></div><div class="content__main__memos-area__memo-area__body-area"><p class="content__main__memos-area__memo-area__body-area__body">' + body + '</p></div><div class="content__main__memos-area__memo-area__edit-and-delete"><a href=""><img src="/assets/icon-for-memo-area/edit.png" alt="Edit"></a><a href=""><img src="/assets/icon-for-memo-area/delete.png" alt="Delete"></a></div></li>')
    }

    var formData = new FormData($('form#new_idea').get(0));

    $.ajax({
      type: 'POST',
      url: '/ideas.json',
      data: formData,
      processData: false,
      contentType: false
    })
    // アイデアの保存に成功した場合
    .done(function(idea) {
      insertIdea(idea);
      $('.content__main__writing-area__title-area__title').val('');
      $('.content__main__writing-area__body-area__body').val('');
    })
    .fail(function() {
      alert('送信に失敗しました。')
    })
    return false;
  });
});
