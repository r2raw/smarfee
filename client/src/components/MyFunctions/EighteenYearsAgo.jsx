var eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const formattedDate = formatDate(eighteenYearsAgo);
var calendarMax = formatDate(eighteenYearsAgo);
var calendarTodayMax = formatDate(new Date());
function formatDate(date) {
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1); 
  var day = padZero(date.getDate());
  return year + "-" + month + "-" + day;
}

function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

export default formatDate;

export {calendarMax, calendarTodayMax, formattedDate};