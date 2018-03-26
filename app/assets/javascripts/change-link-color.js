// ユーザー設定で今いるページへのリンクの色を変える。
$(document).ready(function() {
  var current_url = location.href;

  // アカウント設定ページならばユーザーが現在アクセスしてるページを意識させるためにそのページへのリンクを強調
  if ( /users\/edit/.test(current_url)) {
    var object = $('.acount-setting');
    object.addClass('text-emphasize');
    object.removeClass('non-deco');
  }
});
