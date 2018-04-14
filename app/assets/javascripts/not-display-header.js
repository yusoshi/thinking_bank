// サインイン、アップ、パスワードを忘れたページでヘッダーを非表示にする。
$(function() {

  function addNotDisplayHeaderClass($object) {
    $object.addClass('not-display-header');
  }

  var current_url = location.href;

  if (/users\/sign_in/.test(current_url)) {
    var $object = $('.header-wrapper__header');
    addNotDisplayHeaderClass($object);
    } else if (/users\/sign_up/.test(current_url)) {
      var $object = $('.header-wrapper__header');
      addNotDisplayHeaderClass($object);
    } else if (/users\/password\/new/.test(current_url)) {
      var $object = $('.header-wrapper__header');
      addNotDisplayHeaderClass($object);
  }
})
