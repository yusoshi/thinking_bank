// 今いるページへのリンクの色を変える。
$(document).ready(function() {
  function emphasize(object) {
    object.addClass('text-emphasize');
    object.removeClass('non-deco');
  }

  var current_url = location.href;

  // アカウント設定ページならばユーザーが現在アクセスしてるページを意識させるためにそのページへのリンクを強調
  if ( /users\/edit/.test(current_url)) {
    var object = $('#account-setting');
    emphasize(object);
  }

  if ( /whats\/thinking_bank/.test(current_url)) {
    var object = $('#whats_thinking_bank');
    emphasize(object);
  }

  if ( /whats\/help/.test(current_url)) {
    var object = $('#help');
    emphasize(object);
  }
});
