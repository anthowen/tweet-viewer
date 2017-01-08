export default (dateString) => {
  const date = new Date(dateString);
  const displayTime = getDisplayTime(date.getTime());
  const dayWord = getDayWord(date.getDay());
  const month = date.getMonth() + 1;
  const monthDay = date.getDate();
  return `${dayWord} ${month}/${monthDay} ${displayTime}`;
}

function getDisplayTime(dateMS) {
  var time = new Date(dateMS);
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  var meridiem;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  if (hours >= 12) {
    meridiem = 'pm';
    if (hours > 12) hours -= 12;
  } else {
    meridiem = 'am';
    if (hours === 0) hours = 12;
  }
  return hours + ':' + minutes + meridiem; // + ':' + seconds + ' ';
}

function getDayWord(dayNum) {
  switch(dayNum) {
    case 0:
      return 'Sun';
      break;
    case 1:
      return 'Mon';
      break;
    case 2:
      return 'Tue';
      break;
    case 3:
      return 'Wed';
      break;
    case 4:
      return 'Thu';
      break;
    case 5:
      return 'Fri';
      break;
    case 6:
      return 'Sat';
      break;
  }
}