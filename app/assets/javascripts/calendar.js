// トップページのカレンダーの月を変えて表示する。
$(function() {
  // 週の初めの日から終わりの日まで（日曜始まり）を配列に格納
  function range(from, to) {
    var daysOfWeek = [];

    while (from.getDate() != to.getDate() + 1) {
      var pushedDay = new Date(from);
      daysOfWeek.push(pushedDay);
      from.setDate(from.getDate() + 1);
    }
    return daysOfWeek;
  }

  // その日がその月に所属しているか調べる
  function checkMonth(daysOfWeek, month, tbody) {
    var numberMonth = Number(month);
    var rowOfAWeek = $('<tr></tr>');
    for (var dayCount = 0; dayCount <= 6; dayCount++) {
      var day = daysOfWeek[dayCount];
      if (day.getMonth() + 1 == numberMonth) {
        rowOfAWeek.append('<th>' + String(day).slice(8, 10) + '</th>');
      } else {
        rowOfAWeek.append('<th>  </th>');
      }
    }
    tbody.append(rowOfAWeek[0])
  }

  // カレンダーのHTMLを組み立てる
  function buildCalendar(currentMonthIdeasWithOtherInfo, captionMonth) {
    // jsでカレンダー組み立てようね。
    // 現在表示されているカレンダーを消す
    var calendarArea = $('.content__index-sub-menu__calendar-area');
    var today = currentMonthIdeasWithOtherInfo[1];
    var regToday = today.match(/(\d\d\d\d)-(\d\d)/);
    var selectedYear = regToday[1];
    var selectedMonth = regToday[2];

    var currentMonthIdeas = currentMonthIdeasWithOtherInfo[0];
    var month = currentMonthIdeasWithOtherInfo[2];
    $('.content__index-sub-menu__calendar-area__calendar').remove();
    $('#back_month').remove();
    $('#forward_month').remove();

    // 表示したい月のカレンダーを表示する。
    var tableWithDayOfTheWeek = calendarArea.prepend('<table class="content__index-sub-menu__calendar-area__calendar"><div class="content__index-sub-menu__calendar-area__calendar__yajirushi" id="back_month"><a><img src="assets/yajirushi_left"></a></div><caption id="caption" data-caption-month=' + today + '>' + selectedYear + '年' + selectedMonth + '月' + '</caption><div class="content__index-sub-menu__calendar-area__calendar__yajirushi" id="forward_month"><a><img src="assets/yajirushi_right"></a></div><tr><th id="sunday">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th id="suturday">土</th></tr></table>');

    // 日付の実装
    // 5週分繰り返す
    var tbody = document.getElementsByTagName('tbody')[0];
    for (var weekCount = 0; weekCount < 6; weekCount++) {
      var preD = new Date(currentMonthIdeasWithOtherInfo[3]);
      var d = new Date(preD.setDate(preD.getDate() + 7 * weekCount));
      // その週の最後の日付を取得したい！！！！
      var last = new Date(d.setDate(d.getDate() + 6))
      d = new Date(d.setDate(d.getDate() - 6))

      // その日がその月に所属しているかどうかを調べる
      checkMonth(range(d, last), month, tbody);
    }
}



  // 次の月を見るためのパーツがクリックされたら、次の月のカレンダーを表示
  $(document).on('click', '#forward_month', function(e) {
    e.preventDefault();
    var captionMonth = $('#caption').attr('data-caption-month');
    var monthSelect = 'forward';

    $.ajax({
      type: 'GET',
      url: '/ideas.json',
      data: {
        captionMonth: captionMonth,
        monthSelect: monthSelect
      }
    })
    .done(function(currentMonthIdeasWithOtherInfo) {
      buildCalendar(currentMonthIdeasWithOtherInfo, captionMonth)
    })
    .fail(function() {
      alert('カレンダーの表示に失敗しました。ページを更新してもう一度試してください。')
    })
    return false;
  })
  // 前の月を見るためのパーツがクリックされたら、次の月のカレンダーを表示
  $(document).on('click', '#back_month', function(e) {
    e.preventDefault();
    var captionMonth = $('#caption').attr('data-caption-month');
    var monthSelect = 'back';

    $.ajax({
      type: 'GET',
      url: '/ideas.json',
      data: {
        captionMonth: captionMonth,
        monthSelect: monthSelect
      }
    })
    .done(function(currentMonthIdeasWithOtherInfo) {
      buildCalendar(currentMonthIdeasWithOtherInfo, captionMonth)
    })
    .fail(function() {
      alert('カレンダーの表示に失敗しました。ページを更新してもう一度試してください。')
    })
    return false;
  })
})
