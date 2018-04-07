// トップページのカレンダーの月を変えて表示する。
$(function() {
  // 週の初めの日から終わりの日まで（日曜始まり）を配列に格納
  function range(from, to) {
    var daysOfWeek = [];
    new Date(to.setDate(to.getDate() + 1));

    while (from < to) {
      var pushedDay = new Date(from);
      daysOfWeek.push(pushedDay);
      from.setDate(from.getDate() + 1);
    }
    return daysOfWeek;
  }

  // ideaが所属しているページ数を表す変数indexを割り出す
  function define_num_of_page(id, allIdeas) {
    for (var number = 1; number <= allIdeas.length; number++) {
      if (id == allIdeas[number - 1].id) {
        return number;
      }
    }
  }

  // その日がその月に所属しているか調べる＆アイデアへのリンク
  function checkMonth(daysOfWeek, month, currentMonthIdeas, flag, currentMonthIdeasWithOtherInfo) {
    var numberMonth = Number(month);
    var rowOfAWeek = $('<tr></tr>');
    var per = currentMonthIdeasWithOtherInfo[5];
    for (var dayCount = 0; dayCount <= 6; dayCount++) {
      var day = daysOfWeek[dayCount];
      var index = 0;
      var id = 0;
      if (day.getMonth() + 1 == numberMonth) {
        // アイデアが存在する日付があればリンクを設定する
        var countOfIdeas = currentMonthIdeas.length;

        for (var ideaCount = 0; ideaCount < countOfIdeas; ideaCount++) {
          var idea = currentMonthIdeas[ideaCount];
          // ideaのupdated_atとカレンダーの日付があっていれば、flagを1に設定し、ループを抜ける
          if (idea.updated_at.slice(8, 10) == String(day).slice(8, 10)) {
            index = define_num_of_page(idea.id, currentMonthIdeasWithOtherInfo[4]);
            id = idea.id;
            flag = 1;
            break;
          }
        }
          if (flag == 1) {
            rowOfAWeek.append('<th>' + '<a href="/?page=' + Math.ceil(index / per) + '#' + id + '">' + String(day).slice(8, 10) + '</a>' + '</th>');
            flag = 0;
          } else {
            rowOfAWeek.append('<th>' + String(day).slice(8, 10) + '</th>');
          }
      } else {
        rowOfAWeek.append('<th>  </th>');
      }
    }

    var cloneRowOfAweek = rowOfAWeek.clone(true)
    $('.second-header__calendar-area__calendar tbody').append(cloneRowOfAweek[0]);
    $('.content__index-sub-menu__calendar-area__calendar tbody').append(rowOfAWeek[0]);
  }

  // カレンダーのHTMLを組み立てる
  function buildCalendar(currentMonthIdeasWithOtherInfo, captionMonth) {

    // jsでカレンダー組み立てようね。
    // 現在表示されているカレンダーを消す
    var calendarAreaDesktop = $('.content__index-sub-menu__calendar-area');
    var calendarAreaMobile = $('.second-header__calendar-area');
    var today = currentMonthIdeasWithOtherInfo[1];
    var regToday = today.match(/(\d\d\d\d)-(\d\d)/);
    var selectedYear = regToday[1];
    var selectedMonth = regToday[2];

    var currentMonthIdeas = currentMonthIdeasWithOtherInfo[0];
    var month = currentMonthIdeasWithOtherInfo[2];

    // desktop版カレンダーのremove
    $('.content__index-sub-menu__calendar-area__calendar').remove();
    $('.content__index-sub-menu__calendar-area__calendar__yajirushi').remove();
    $('.content__index-sub-menu__calendar-area__calendar__yajirushi').remove();

    // mobile版カレンダーのremove
    $('.second-header__calendar-area__calendar').remove();
    $('.second-header__calendar-area__calendar__yajirushi').remove();
    $('.second-header__calendar-area__calendar__yajirushi').remove();


        // 表示したい月のカレンダーを表示する。
    calendarAreaDesktop.prepend('<table class="content__index-sub-menu__calendar-area__calendar"><div class="content__index-sub-menu__calendar-area__calendar__yajirushi back_month"><a><img src="assets/yajirushi_left"></a></div><caption class="caption" data-caption-month=' + today + '>' + selectedYear + '年' + selectedMonth + '月' + '</caption><div class="content__index-sub-menu__calendar-area__calendar__yajirushi forward_month"><a><img src="assets/yajirushi_right"></a></div><tr><th id="sunday">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th id="suturday">土</th></tr></table>');

    calendarAreaMobile.prepend('<table class="second-header__calendar-area__calendar"><div class="second-header__calendar-area__calendar__yajirushi back_month"><a><img src="assets/yajirushi_left_white"></a></div><caption class="caption" data-caption-month=' + today + '>' + selectedYear + '年' + selectedMonth + '月' + '</caption><div class="second-header__calendar-area__calendar__yajirushi forward_month"><a><img src="assets/yajirushi_right_white"></a></div><tr><th id="sunday">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th id="suturday">土</th></tr></table>');

    // 日付の実装
    // 5週分繰り返す
    for (var weekCount = 0; weekCount < 6; weekCount++) {
      var flag = 0;
      var preD = new Date(currentMonthIdeasWithOtherInfo[3]);
      var d = new Date(preD.setDate(preD.getDate() + 7 * weekCount));
      // その週の最後の日付を取得したい！！！！
      var last = new Date(d.setDate(d.getDate() + 6));
      d = new Date(d.setDate(d.getDate() - 6));

      // その日がその月に所属しているかどうかを調べる＆アイデアへのリンク
      checkMonth(range(d, last), month, currentMonthIdeas, flag, currentMonthIdeasWithOtherInfo);
    }
  }

  function ajax(captionMonth, monthSelect) {
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
  }


  // 次の月を見るためのパーツがクリックされたら、次の月のカレンダーを表示
  $(document).on('click', '.forward_month', function(e) {
    e.preventDefault();
    var captionMonth = $('.caption').attr('data-caption-month');
    var monthSelect = 'forward';
    // }

    ajax(captionMonth, monthSelect);
    return false;
  })
  // 前の月を見るためのパーツがクリックされたら、次の月のカレンダーを表示
  $(document).on('click', '.back_month', function(e) {
    e.preventDefault();
    var captionMonth = $('.caption').attr('data-caption-month');
    var monthSelect = 'back';

    ajax(captionMonth, monthSelect);
    return false;
  })
})
