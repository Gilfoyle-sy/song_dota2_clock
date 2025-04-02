
export const secondsToMMSS = (value) => {
  // 将秒数转换为分钟和秒钟
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)

  // 返回格式化的字符串
  return minutes + ":" + (seconds < 10 ? '0' + seconds : seconds)
}

export const MMSSToSeconds = (value) => {
  // value = parseInt(value)
  // 将分钟和秒钟转换为秒数
  let [minutes, seconds] = [value.slice(0, -2), value.slice(-2)]
  if (!minutes) minutes = 0
  return parseInt(minutes) * 60 + parseInt(seconds)
}
