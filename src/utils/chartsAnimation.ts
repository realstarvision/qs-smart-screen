// 定时器滚动事件
export function eventProcessingChart(chartRef, end, timeout = 3500) {
  // 定时器
  return setInterval(function () {
    // 每次向后滚动一个，最后一个从头开始。
    let option = chartRef.myChart.getModel().option
    let obj
    if (option.dataZoom[0].endValue == end) {
      obj = {
        endValue: 4,
        startValue: 0,
      }
    } else {
      obj = {
        endValue: option.dataZoom[0].endValue + 1,
        startValue: option.dataZoom[0].startValue + 1,
      }
    }
    chartRef.setOption({
      dataZoom: [obj],
    })
  }, timeout)
}