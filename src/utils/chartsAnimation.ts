// 图表动画
export default function chartsAnimation(ref, timerName, length = 6, endValue = 4, startValue = 0, timeout = 3500) {
  // 定时器
  if (timerName) {
    clearInterval(timerName)
  }
  let timer = setInterval(function () {
    // 每次向后滚动一个，最后一个从头开始。
    let option = ref.myChart.getModel().option
    let obj
    let obj2
    if (option.dataZoom[0].endValue == length) {
      obj = {
        startValue: startValue,
        endValue: endValue,
      }
    } else {
      obj = {
        startValue: option.dataZoom[0].startValue + 1,
        endValue: option.dataZoom[0].endValue + 1,
      }
    }
    if (option.dataZoom[2]) {
      if (option.dataZoom[2].endValue == length) {
        obj2 = {
          startValue: startValue,
          endValue: endValue,
        }
      } else {
        obj2 = {
          startValue: option.dataZoom[2].startValue + 1,
          endValue: option.dataZoom[2].endValue + 1,
        }
      }
    }
    ref.setOption({
      dataZoom: [obj, obj2],
    })
  }, timeout)
  return timer
}