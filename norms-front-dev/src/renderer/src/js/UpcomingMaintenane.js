import moment from "moment"


function initMonthContainer(opt) {
  let currentYear = moment().year()
  let currentMonth = moment().month()
  let __currendDate = $('.currendDate').text()
  if (opt == 1) {
    let thisDate = moment(moment(__currendDate).format('YYYY-MM')).clone().add(1, 'months');
    thisDate = moment(thisDate).format('YYYY-MM')
    currentYear = moment(thisDate).year()
    currentMonth = moment(thisDate).month()
  } else if (opt == -1) {
    let thisDate = moment(moment(__currendDate).format('YYYY-MM')).clone().subtract(1, 'months')
    thisDate = moment(thisDate).format('YYYY-MM')
    currentYear = moment(thisDate).year()
    currentMonth = moment(thisDate).month()
  }

  let dataList = [
    {
      "startTime": "2024-05-06",
      "endTime": "2024-05-06",
      "color": "#96AA3B",
      "reason": "18:30 Take the bus."
    },
    {
      "startTime": "2024-05-10",
      "endTime": "2024-05-10",
      "color": "#DD9C34",
      "reason": "18:30 Take the bus."
    },
    {
      "startTime": "2024-05-12",
      "endTime": "2024-05-14",
      "color": "#C94085",
      "reason": "Please feel free to fast forward to that area."
    },
    {
      "startTime": "2024-05-16",
      "endTime": "2024-05-18",
      "color": "#57A939",
      "reason": "Please feel free to fast forward to that area."
    },
    {
      "startTime": "2024-05-21",
      "endTime": "2024-05-24",
      "color": "#9A2DAD",
      "reason": "Please feel free to fast forward to that area."
    },
    {
      "startTime": "2024-05-27",
      "endTime": "2024-05-27",
      "color": "#35ABC6",
      "reason": "18:30 Take the bus."
    }
  ]
  $('.monthTaskInfo').empty()
  const generateWeekTitle = function () {
    return `
            <tr class="week-title">
              <td id="sun-color">Sun</td>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
            </tr>
        `
  }
  const generateWeekHtml = function (date) {
    let tempDate = moment(date)
    let tempDate2 = moment(date)
    let dateNo = tempDate.date();
    return `
            <tr class="week-day" data-date="${dateNo + 6},${dateNo},${dateNo + 1},${dateNo + 2},${dateNo + 3},${dateNo + 4},${dateNo + 5}">
              <td id="sun-color" ${getCurrentTdAttr(tempDate2)}>${generateDayHtml(tempDate, 0)}</td>  
              <td ${getCurrentTdAttr(tempDate2.add(1, 'd'))}>${generateDayHtml(tempDate.add(1, 'd'), 1)}</td>
              <td ${getCurrentTdAttr(tempDate2.add(1, 'd'))}>${generateDayHtml(tempDate.add(1, 'd'), 2)}</td>
              <td ${getCurrentTdAttr(tempDate2.add(1, 'd'))}>${generateDayHtml(tempDate.add(1, 'd'), 3)}</td>
              <td ${getCurrentTdAttr(tempDate2.add(1, 'd'))}>${generateDayHtml(tempDate.add(1, 'd'), 4)}</td>
              <td ${getCurrentTdAttr(tempDate2.add(1, 'd'))}>${generateDayHtml(tempDate.add(1, 'd'), 5)}</td>
              <td ${getCurrentTdAttr(tempDate2.add(1, 'd'))}>${generateDayHtml(tempDate.add(1, 'd'), 6)}</td>
            </tr>
        `
  }

  const getDateLength = function (endDate, startDate) {
    let tempDate1 = moment(startDate).format('YYYY-MM-DD')
    let tempDate2 = moment(endDate).format('YYYY-MM-DD')
    return moment(tempDate2).diff(moment(tempDate1), 'd')
  }

  function reloadTdHeight(dateLastTaskMarginTop, date) {
    let tdTaskStep = dateLastTaskMarginTop / 35;
    if (tdTaskStep >= 2) {
      setTimeout(() => {
        $('.week-day').each(function () {
          if ($(this).data('date')?.split(',').includes(date.date() + '')) {
            let newHeight = 50 * (tdTaskStep + 1);
            if ($(this).find('td').height() < newHeight) {
              $(this).find('td').height(newHeight)
            }
          }
        })
      }, 100)
    }
  }

  const getCalendarHtml = function (date) {
    let html = ``;
    let dateLastTaskMarginTop = 0;
    for (let item of dataList) {
      if (moment(item.startTime).isSame(date, 'd')) {
        let dateLength = moment(moment(item.endTime).format('YYYY-MM-DD')).diff(moment(item.startTime).format('YYYY-MM-DD'), 'day')
        let taskDivWidth = $('#sun-color').width();
        if (item.hasVirtualTask) {
          dateLength = getDateLength(moment(item.startTime).endOf('isoWeek'), item.startTime)
        }
        if (dateLength != 0) {
          taskDivWidth = $('#sun-color').width() * (dateLength + 1)
          taskDivWidth = taskDivWidth - 6
        } else {
          taskDivWidth = taskDivWidth - 13
        }


        html += ` <div class="calendar-div"><div class="calendar-upcoming-info calendar-upcoming-event-info px-2"
                    style="width: ${taskDivWidth}px;border: solid 1px ${item.color};
                    position: absolute;
                    line-height: 2rem;
                    background-color: ${item.color};
                    color: white;
                ">${item.reason}</div></div> `
      }
    }
    
    reloadTdHeight(dateLastTaskMarginTop, date);
    return html;
  }

  const generateDayHtml = function (date, index) {
    let html = getCalendarHtml(date);
    let resultHtml = `<div>
            <label class="date ${moment().isSame(date, 'd') ? ' active ' : ' '}">${date.date()}</label>
            <img class="multiterm-img" src="src/images/multiterm.svg" alt=""/>
            `;
    resultHtml += `${html}</div>`
    return resultHtml;
  }
  const getCurrentTdAttr = function (tdDate) {
    let tdDateTask = false;
    for (let item of dataList) {
      if (tdDate.isSameOrAfter(moment(item.startTime), 'd')
        && tdDate.isSameOrBefore(moment(item.endTime), 'd')) {
        tdDateTask = true;
        break;
      }
    }

    if (tdDate.month() != currentMonth) {
      return ` class=" invalid-date-td " `;
    }

    let isPreDay = tdDate.isBefore(moment(), 'day');
    if (isPreDay) {
      return ` class=" invalid-date-td " `;
    } else if (tdDateTask) {
      return '';
    } else {
      return `  `;
    }
  }

  const initDateHtml = function (currentYear, currentMonth) {
    $('.monthTaskInfo').empty().append(generateWeekTitle());
    $('.currendDate').text(moment({ year: currentYear, month: currentMonth }).format('YYYY-MM'))

    const getAllWeeks = function () {
      let startDate = moment({ year: currentYear, month: currentMonth }).format('YYYY-MM')
      let firstDayOfMonth = moment(startDate).startOf('month');
      if (firstDayOfMonth.day() !== 0) {
        firstDayOfMonth.add(7 - firstDayOfMonth.day(), 'days');
      }
      let sundays = [];
      let currentDay = firstDayOfMonth.clone();
      while (currentDay.isSameOrBefore(moment(startDate).endOf('month'), 'month')) {
        sundays.push(currentDay.format('YYYY-MM-DD'));
        currentDay.add(7, 'days');
      }

      return sundays;
    }
    let weekList = getAllWeeks();
    for (let week of weekList) {
      $('.monthTaskInfo').append(generateWeekHtml(week))
    }
  }
  initDateHtml(currentYear, currentMonth)
}

export default initMonthContainer