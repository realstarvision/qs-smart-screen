import echarts from 'echarts'

// 圆环
export function circularRingOption(title, data) {
  return {
    color: ['#0170D2', '#FFD141', '#00E6F9', '#F9965E'],
    title: {
      text: title,
      subtext: '总面积(km²)',
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#4987FF',
        fontSize: '1.2rem',
      },
      subtextStyle: {
        color: '#ffffff',
        fontSize: '0.75rem',
      },
      textVerticalAlign: 'middle',
      itemGap: 2
    },

    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      type: "scroll",
      right: "3%",
      top: -5,
      data: ['道路', '桥梁', '建筑'],
      itemGap: 10,
      itemWidth: 5,
      itemHeight: 5,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.75rem',
      },
      icon: "circle"
    },
    series: [
      {
        type: 'pie',
        radius: ['57%', '77%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        // data: [
        //   { value: 1, name: '道路' },
        //   { value: 1, name: '桥梁' },
        //   { value: 1, name: '建筑' },
        // ]
        data: data
      }
    ]
  }
}



// 渐变折线图
export function linearGradientOption({
  line, xAxisData, list, grid = {
    left: 35,
    top: "15%",
    bottom: 20,
    right: "3%",
  },
  lineStyle = ['#0170D2', '#FFD141', '#00E6F9', '#F9965E'],
  color = ['1, 112, 210', '255, 209, 65', '0, 230, 249', '249, 150, 94']
}) {

  // 颜色
  // let color = ['1, 112, 210', '255, 209, 65', '0, 230, 249', '249, 150, 94']
  // let lineStyle = ['#0170D2', '#FFD141', '#00E6F9', '#F9965E']

  // 折线图块的内容
  function seriesItem(name, data, lineStyle, color) {
    return {
      name: name,
      data: data,
      type: 'line',
      symbol: 'none',
      showSymbol: false,
      itemStyle: {
        // normal: {
        //   lineStyle: {
        //     color: lineStyle,

        //   },
        //   areaStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        //       {
        //         offset: 0,
        //         color: `rgba(${color},0)`,
        //       },
        //       {
        //         offset: 1,
        //         color: `rgba(${color},0.9)`,
        //       },
        //     ]),
        //   },
        // },
      },
      lineStyle: {
        width: 1,
      }
    }
  }

  // 配置
  let option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff'
      }
    },
    color: lineStyle,
    legend: {
      type: "scroll",
      right: "3%",
      top: 0,
      data: line,
      itemGap: 10,
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.75rem',
      },
      icon: "circle"
    },
    toolbar: {

    },
    grid: grid,
    xAxis: {
      type: 'category',
      data: xAxisData || [],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#fff", // x轴颜色
          fontSize: '0.8rem',
        },
      },
    },
    yAxis: {
      type: 'value',
      position: "left",
      nameTextStyle: {
        color: "#00FFFF",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#535353',
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: '0.8rem',
      }
    },
    series: []
  }

  // 添加内容
  list.forEach((item, index) => {
    option.series.push(seriesItem(item.name, item.data, lineStyle[index], color[index]))
  })

  return option
}