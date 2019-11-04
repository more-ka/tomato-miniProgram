const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatMouth(data){
  let monthString = data.toString().substring(0,2)
  let dayString = data.toString().substring(2,4)
  if(monthString[0]==='0'){ monthString = monthString[1]}
  if(dayString[0]==='0'){ dayString = dayString[1]}
  return monthString+'月'+dayString+'日'
}
function subTime(time){
  return time.substring(11,16)
}
module.exports = {
  subTime: subTime,
  formatTime: formatTime,
  formatMouth: formatMouth
}
