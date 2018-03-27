// 非同期でideaを編集する。
$(function() {

  // funtion切り出し場
  // 編集終了時（保存orキャンセル）にideaのHTMLを出力する
  function buildHTML(idea, selectedMemoArea) {
      // 時間取得
      var ideaTime1 = idea.created_at.replace(/-/g, '/');
      var ideaTime2 = ideaTime1.replace('T', ' ');

    // フォーム内の改行を反映できるようにせよ。
      var ideaTime3 = ideaTime2.replace(/\:\d\d.\d\d\d.\d\d.\d\d$/, ' ');

      // bodyの改行を有効にする。
      // できてません。
      var tempBody = idea.body;
      var body = tempBody.replace(/\\r\\n/g, "<br>");

      selectedMemoArea.prepend('<div class="content__main__memos-area__memo-area__title-area__square square"></div><h3 class="content__main__memos-area__memo-area__title-area__title">' + idea.title +'</h3></div><div class="content__main__memos-area__memo-area__date-area"><span>作成日 ' + ideaTime3 + '</span><span>最終更新日 ' + ideaTime3 + '</span></div><div class="content__main__memos-area__memo-area__body-area"><p class="content__main__memos-area__memo-area__body-area__body">' + body + '</p></div><div class="content__main__memos-area__memo-area__edit-and-delete"><a href="" class="content__main__memos-area__memo-area__edit-and-delete__edit"><img src="/assets/icon-for-memo-area/edit.png" alt="Edit"></a><a href=""><img src="/assets/icon-for-memo-area/delete.png" alt="Delete"></a></div>');
      selectedMemoArea.find('form').remove();
    }






  // イベント系
  // 編集ボタンが押された、DOMで編集用フォーム作成する
  $(document).on('click', '.content__main__memos-area__memo-area__edit-and-delete__edit img', function(e) {
    e.preventDefault();

    var memoArea = $(this).parent().parent().parent();
    var title = memoArea.find('h3').text();
    var preBody = memoArea.find('p').text();
    var body = preBody.replace(/ /g, '');

    memoArea.prepend('<form class="content__main__memos-area__memo-area__form-area" id="edit_idea"><div class="content__main__memos-area__memo-area__form-area__title-area"><div class="content__main__memos-area__memo-area__form-area__title-area__square square"></div><input class="content__main__memos-area__memo-area__form-area__title-area__title form-decoration idea-title" value=' + title + ' style="text" name="idea[title]" id="idea-title"></input></div><div class="content__main__memos-area__memo-area__form-area__body-area"><textarea class="content__main__memos-area__memo-area__form-area__body-area__body form-decoration idea-body" name="idea[body]" id="idea_body">' + body + '</textarea></div><div class="content__main__memos-area__memo-area__form-area__btn-area idea-btn-area"><input class="content__main__memos-area__memo-area__form-area__btn-area__btn btn btn-main full-width-btn idea-btn" type="submit" data-disable-with="保存中..." value="保存"><img src="assets/x-btn.png" class="content__main__memos-area__memo-area__form-area__btn-area__x-btn x-btn"></div></div></form>');
    memoArea.children('div').remove();
    memoArea.children('h3').remove();
  })

  // 編集時にxボタンが押された時、アイデアの内容を再び表示する
  $(document).on('click', '.content__main__memos-area__memo-area__form-area__btn-area__x-btn', function(e) {
    e.preventDefault();
    var selectedMemoArea = $(this).parent().parent().parent();
    var id = selectedMemoArea.data('id');

    $.ajax({
      type: 'GET',
      url: '/ideas.json',
      data: {id: id,
             flag: "edit-cancel"}
    })
    .done(function(idea) {
      buildHTML(idea, selectedMemoArea);
    })
    .fail(function() {
      alert('送信に失敗しました。');
    })
  })
  // 編集時、保存ボタンが押されたら非同期で保存・表示
  $(document).on('click', '.content__main__memos-area__memo-area__form-area__btn-area__btn', function(e)
   {
    e.preventDefault();

    var selectedMemoArea = $(this).parent().parent().parent();
    var id = selectedMemoArea.data('id');

    var formData = new FormData($('form#edit_idea').get(0));

    $.ajax({
      type: 'PATCH',
      url: '/ideas/' + id + '.json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(newIdea) {
      buildHTML(newIdea, selectedMemoArea);
    })
    .fail(function() {
      alert('保存できませんでした。');
    })
  })
})
