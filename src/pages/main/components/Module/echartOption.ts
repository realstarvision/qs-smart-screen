import * as echarts from 'echarts'


// 渐变折线图
export function linearGradientOption({
  line, xAxisData, list, grid = {
    left: 35,
    top: "15%",
    bottom: 20,
    right: "3%",
  },
  lineStyle = ['#0170D2', '#FFD141', '#00E6F9', '#F9965E'],
  color = ['1, 112, 210', '255, 209, 65', '0, 230, 249', '249, 150, 94'],
  unit = ''
}) {

  // 折线图块的内容
  function seriesItem(name, data, lineStyle, color) {
    return {
      name: name,
      data: data,
      type: 'line',
      symbol: 'none',
      itemStyle: {
        normal: {
          lineStyle: {
            color: lineStyle,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: `rgba(${color},0)`,
              },
              {
                offset: 1,
                color: `rgba(${color},0.9)`,
              },
            ]),
          },
        },
      },
    }
  }

  // 动画
  function seriesItemAnimation(datacoords, color) {
    return {
      showSymbol: false,
      // name: "苏苏小苏苏",
      type: "lines",
      polyline: true,
      smooth: false,
      coordinateSystem: "cartesian2d",
      zlevel: 1,
      effect: {
        show: true,
        smooth: true,
        period: 6,
        symbolSize: 4,
      },
      lineStyle: {
        color: '#fff',
        width: 1,
        opacity: 0,
        curveness: 0,
        cap: "round",
      },
      data: datacoords,
    }
  }

  // 配置
  let option = {
    color: lineStyle,
    dataZoom: [
      {
        type: 'slider',
        show: false,
        xAxisIndex: [0],
        left: '93%',
        startValue: 0, // 从头开始。
        endValue: 4, // 一次性展示4个。
        handleSize: 0,
        filterMode: 'empty',
        handleStyle: {
          borderCap: 'round',
          borderWidth: 0
        }
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        startValue: 0, // 从头开始。
        endValue: 4, // 一次性展示4个。
        zoomOnMouseWheel: false,  // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      position: function (point) {
        // 固定在顶部
        return [point[0] - 80, '30%'];
      },
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff',
        fontSize: 9,
        lineHeight: 100
      },
      formatter: function (params) {
        let axisValueLabel = params[0].axisValueLabel
        let data = `<span style='font-size: 13px;'>${axisValueLabel}</span><br />`
        params.map(item => {
          data += `${item.marker} ${item.seriesName} &nbsp;&nbsp;${item.value}&nbsp;${unit}<br />`
        })
        let result = `<p style='line-height: 22px;'>${data}</p>`
        return result
      }
    },
    legend: {
      type: "scroll",
      right: "3%",
      top: '3%',
      data: line,
      itemGap: 10,
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.75rem',
      },
      icon: "circle",
      // 禁止点击
      selectedMode: true
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
          fontSize: '0.75rem',
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

    // 多点动画
    // let datacoords = []
    // for (let i = 0; i < item.data.length; i++) {
    //   datacoords.push([
    //     {
    //       coord: [i, item.data[i]]
    //     },
    //     {
    //       coord: [i + 1, item.data[i + 1]]
    //     }
    //   ])
    // }

    // 单点动画
    let datacoords = [
      {
        coords: [],
      },
    ];
    for (let i = 0; i < item.data.length; i++) {
      datacoords[0].coords.push([xAxisData[i], item.data[i]]);
    }
    // option.series.push(seriesItemAnimation(datacoords, color[index]))
  })
  return option
}


// 双折线图
export function doubleLinearOption({ unit = "" }) {

  // 颜色
  let color = ['1, 112, 210', '255, 209, 65', '0, 230, 249', '249, 150, 94']
  let lineStyle = ['#0170D2', '#FFD141', '#00E6F9', '#F9965E']

  // 折线图块的内容
  function Item(name, data, lineStyle, color, axisIndex) {
    return {
      name: name,
      data: data,
      type: 'line',
      symbol: 'none',
      showSymbol: false,
      xAxisIndex: axisIndex,
      yAxisIndex: axisIndex,
      itemStyle: {
        normal: {
          lineStyle: {
            color: lineStyle,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: `rgba(${color},0)`,
              },
              {
                offset: 1,
                color: `rgba(${color},0.9)`,
              },
            ]),
          },
        },
      },
    }
  }

  // 配置
  let option = {
    color: ['#0170D2', '#FFD141', '#00E6F9', '#F9965E'],
    title: [
      {
        text: '日处理趋势',
        left: '75%',
        top: '90%',
        textStyle: {
          color: '#ddd',
          fontSize: '0.8rem',
        },
      }, {
        text: '周处理趋势',
        left: '25%',
        top: '90%',
        textStyle: {
          color: '#ddd',
          fontSize: '0.8rem',
        },
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: false,
        xAxisIndex: [0],
        left: '93%',
        startValue: 3, // 从头开始。
        endValue: 0, // 一次性展示4个。
        handleSize: 0,
        filterMode: 'empty',
        handleStyle: {
          borderCap: 'round',
          borderWidth: 0
        }
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        startValue: 3, // 从头开始。
        endValue: 0, // 一次性展示4个。
        zoomOnMouseWheel: false,  // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
      },
      {
        type: 'slider',
        show: false,
        xAxisIndex: [1],
        left: '93%',
        startValue: 3, // 从头开始。
        endValue: 0, // 一次性展示4个。
        handleSize: 0,
        filterMode: 'empty',
        handleStyle: {
          borderCap: 'round',
          borderWidth: 0
        }
      },
      {
        type: 'inside',
        xAxisIndex: [1],
        startValue: 3, // 从头开始。
        endValue: 0, // 一次性展示4个。
        zoomOnMouseWheel: false,  // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
      }
    ],
    legend: [
      {
        type: "scroll",
        right: "2%",
        top: 10,
        data: ['生活垃圾', '厨余垃圾', '可回收垃圾'],
        itemGap: 10,
        itemWidth: 6,
        itemHeight: 6,
        textStyle: {
          color: "#C3C7C7",
          fontSize: '0.75rem',
        },
        icon: "circle"
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      position: 'bottom',
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff',
        fontSize: 9
      },
      formatter: function (params) {
        let axisValueLabel = params[0].axisValueLabel
        let data = `<span style='font-size: 13px;'>${axisValueLabel}</span><br />`
        params.map(item => {
          data += `${item.marker} ${item.seriesName} &nbsp;&nbsp;${item.value}&nbsp;${unit}<br />`
        })
        let result = `<p style='line-height: 22px;'>${data}</p>`
        return result
      }
    },
    grid: [{
      show: false,
      left: "2%",
      top: "15%",
      containLabel: true,
      width: "45%",
      height: '70%',
    }, {
      show: false,
      left: "55%",
      top: "15%",
      containLabel: true,
      width: "44%",
      height: '70%',
    }],
    xAxis: [{
      gridIndex: 0,
      type: 'category',
      data: ['9/01', '9/02', '9/03', '9/04', '9/05', '9/06', '9/07      '],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#fff", // x轴颜色
          fontSize: '0.75rem',
        },
      },
    }, {
      gridIndex: 1,
      type: 'category',
      data: ['2019', '2020', '2021', '2022      '],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#fff", // x轴颜色
          fontSize: '0.75rem',
        },
      },
    }],
    yAxis: [
      {
        gridIndex: 0,
        type: 'value',
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
      }, {
        gridIndex: 1,
        type: 'value',
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
      }
    ],
    series: []
  }

  let list = [
    {
      name: '生活垃圾',
      data: [10, 20, 30, 40, 30, 20, 35],
    },
    {
      name: '厨余垃圾',
      data: [11, 16, 28, 35, 22, 9, 26],
    },
    {
      name: '可回收垃圾',
      data: [33, 14, 16, 25, 27, 19, 34],
    }
  ]

  let list1 = [
    {
      name: '生活垃圾',
      data: [55, 2, 30, 40, 60, 20],
    },
    {
      name: '厨余垃圾',
      data: [13, 19, 23, 30, 18, 80],
    },
    {
      name: '可回收垃圾',
      data: [11, 56, 74, 36, 55, 15],
    }
  ]
  // 添加内容
  list.forEach((item, index) => {
    option.series.push(Item(item.name, item.data, lineStyle[index], color[index], 0))
  })
  list1.forEach((item, index) => {
    option.series.push(Item(item.name, item.data, lineStyle[index], color[index], 1))
  })

  return option
}

// 沉降圆环
export function circularRingOption(data = [], subtext = "面积(km²)", color = ['#0170D2', '#FFD141', '#00E6F9', '#F9965E'], right = '3%') {
  let title = 0
  if (data.length > 0) {
    // data.forEach(item => {
    //   title += item.value
    // })
    for (let i = 0; i < data.length; i++) {
      title += data[i].value
    }
  }

  return {

    color: color,
    title: {
      text: title,
      subtext: subtext,
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#4987FF',
        fontSize: '1.5rem',
      },
      subtextStyle: {
        color: '#ffffff',
        fontSize: '1rem',
      },
      textVerticalAlign: 'middle',
      itemGap: 1
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      position: 'bottom',
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff',
        fontSize: 10
      }
    },
    legend: {
      type: "scroll",
      right: right,
      top: 0,
      // data: ['道路', '桥梁', '其它'],
      data: ['上升', '下降'],
      itemGap: 10,
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.75rem',
      },
      icon: "circle",
      // 禁止点击
      selectedMode: true
    },
    series: [
      {
        type: 'pie',
        radius: ['38%', '48%'],
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
        //   { value: 5, name: '道路' },
        //   { value: 5, name: '桥梁' },
        //   { value: 6.8, name: '其它' },
        // ]
        data: data
      }
    ]
  }
}

// 内涝圆环
export function circularRingWaterloggingOption(title) {
  let label = ['高风险', '中风险', '低风险']
  return {
    color: ['#dd2121', '#ffbc0c', '#27dd23'],
    title: {
      text: title,
      subtext: "易涝点总数",
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#4987FF',
        fontSize: '1rem',
      },
      subtextStyle: {
        color: '#ffffff',
        fontSize: '0.8rem',
      },
      textVerticalAlign: 'middle',
      itemGap: 1
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      position: 'bottom',
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff',
        fontSize: 10
      }
    },
    legend: {
      type: "scroll",
      // right: right,
      top: -5,
      data: label,
      itemGap: 10,
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.75rem',
      },
      icon: "circle",
      // 禁止点击
      selectedMode: true
    },
    series: [
      {
        type: 'pie',
        radius: ['38%', '48%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        // top: 70,
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
        data: [
          { value: 5, name: label[0] },
          { value: 5, name: label[1] },
          { value: 6.8, name: label[2] },
        ]
      }
    ]
  }
}

// 双柱状图
export function doubleBarOption() {
  return {
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
        color: '#fff',
        fontSize: 10
      },
    },
    grid: {
      left: "3%",
      right: "10%",
      bottom: "5%",
      top: "32%",
      //	padding:'0 0 10 0',
      containLabel: true,
    },
    legend: {
      //图例组件，颜色和名字
      right: "0%",
      top: "26%",
      itemGap: 20,
      itemWidth: 6,
      itemHeight: 6,
      icon: "circle",
      data: [
        {
          name: "待处理事件",
          //icon:'image://../wwwroot/js/url2.png', //路径
          itemStyle: {
            color: 'rgba(255, 188, 12, 1)'
          },
          textStyle: {
            fontSize: '0.75rem',
          },
        },
        {
          name: "已处理事件",
          itemStyle: {
            color: 'rgba(1, 112, 210, 1)'
          },
          textStyle: {
            fontSize: '0.75rem',
          },
        },
      ],
      textStyle: {
        color: "#a8aab0",
        fontStyle: "normal",
        fontFamily: "微软雅黑",
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: "value",
        boundaryGap: true,//坐标轴两边留白
        axisLabel: {
          show: false,
          //坐标轴刻度标签的相关设置。
          //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#078ceb",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: '0.40rem',
          },
          rotate: 50,
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLine: {
          //坐标轴轴线相关设置
          lineStyle: {
            color: "#fff",
            opacity: 0.2,
          },
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: false,
        },
      },
    ],
    yAxis: [
      {
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
        type: "category",
        splitNumber: 5,
        axisLabel: {

          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: '0.65rem',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ["#fff"],
            opacity: 0.06,
          },
        },
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: false,
        yAxisIndex: [0],
        left: '93%',
        // start: 100, //数据窗口范围的起始百分比
        // end: 64,
        startValue: 0, // 从头开始。
        endValue: 4, // 一次性展示4个。
        handleSize: 0,
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        start: 100,
        end: 64,
        zoomOnMouseWheel: false,  // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
      }
    ],
    series: [
      {
        name: "待处理事件",
        type: "bar",
        data: [5752, 4365, 1865, 2333, 1244, 3864, 1068, 8955, 1424, 3684, 1454, 5752],
        barWidth: 6,
        barGap: 1, //柱间距离
        label: {//图形上的文本标签
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: '0.75rem',
            },
          },
        },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "rgba(255, 188, 12, 0)",
              },
              {
                offset: 1,
                color: "rgba(255, 188, 12, 1)",
              },
            ]),
            barBorderRadius: 50,
            borderWidth: 0,
          },
        },
      },
      {
        name: "已处理事件",
        type: "bar",
        data: [7654, 4135, 4844, 3565, 1234, 3864, 7822, 1563, 7232, 5684, 1235, 5792],
        barWidth: 6,
        // barGap: 3, //柱间距离
        label: {//图形上的文本标签
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: '0.75rem',
            },
          },
        },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "rgba(1, 112, 210, 0)",
              },
              {
                offset: 1,
                color: "rgba(1, 112, 210, 1)",
              },
            ]),
            barBorderRadius: 50,
            borderWidth: 0,
          },
        },
      },
    ],
  };
}


// 柱状三角形
export function triangleOption(xLabel, data, title = '分区区域内涝水体面积（km²）') {

  return {
    // backgroundColor: "#011a33",
    // title: {
    //   text: '分区区域内涝水体面积（km²）',
    //   // subtext: subtext,
    //   left: 'center',
    //   top: '20',
    //   textStyle: {
    //     color: '#4987FF',
    //     fontSize: '1.5rem',
    //   },
    //   subtextStyle: {
    //     color: '#ffffff',
    //     fontSize: '1rem',
    //   },
    //   textVerticalAlign: 'middle',
    //   itemGap: 1
    // },
    legend: {
      data: [title],
      top: "8%",
      textStyle: {
        color: "#eeeeee",
        fontSize: '0.8rem',
      },
      icon: 'rect',
      itemWidth: 20,
      // itemHeight: 14,
      formatter: function (name) {
        return '  ' + name
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      formatter: function (params) {
        let param = params[0]
        let html = param.marker + param.name + `<span style="display: inline-block;margin-left: 15px;">${param.value} km² </span>`
        return html
      }
    },
    grid: {
      top: '25%',
      bottom: '15%',
      x: '7%',
      x2: '2%',
      y2: '5%',
    },
    xAxis: [
      {
        type: "category",
        data: xLabel,
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 0.3,
          },
        },
        axisLabel: {
          margin: 10,
          color: "#fff",
          interval: 0, //横轴信息全部显示
          textStyle: {
            fontSize: '0.75rem',
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLabel: {
          formatter: "{value}",
          color: "#fff",
          textStyle: {
            fontSize: '0.75rem',
          },
        },
        axisLine: {
          lineStyle: {
            color: "#535353",
            width: 0.5,
          },
        },
        splitLine: {
          lineStyle: {
            color: "#535353",
            width: 0.5,
          },
        },
        axisTick: {
          show: false,
        },
        // max: 100,
      },
    ],
    series: [
      {
        name: title,
        type: "pictorialBar",
        barCategoryGap: "0%",
        symbol: "path://M0,10 L10,10 L5,0 L0,10 z",
        data: data,
        barWidth: "50px",
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(62, 153, 234, 1)", //  0%  处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(1, 102, 194, 0)", //  100%  处的颜色
                },
              ],
              global: false, //  缺省为  false
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: '0.75rem',
              }
            }
          },
        },
      },
    ],
  };

}


//  普通折线图
export function lineOrdinary({ line, xAxisData, list, grid = {
  left: 35,
  top: "15%",
  bottom: 20,
  right: "3%",
},
  // lineStyle = ['#0170D2', '#FFD141', '#00E6F9', '#F9965E'],
  // color = ['1, 112, 210', '255, 209, 65', '0, 230, 249', '249, 150, 94'],
  unit = '' }) {
  // 折线图块的内容
  function seriesItem(name, data) {
    return {
      name: name,
      data: data,
      type: 'line',
      symbol: 'none'
    }
  }

  // 
  function seriesItemAnimation(datacoords) {
    return {
      showSymbol: false,
      // name: "苏苏小苏苏",
      type: "lines",
      polyline: true,
      smooth: false,
      coordinateSystem: "cartesian2d",
      zlevel: 1,
      effect: {
        show: true,
        smooth: true,
        period: 6,
        symbolSize: 4,
      },
      lineStyle: {
        color: '#fff',
        width: 1,
        opacity: 0,
        curveness: 0,
        cap: "round",
      },
      data: datacoords,
    }
  }

  // 配置
  let option = {
    // color: lineStyle,
    dataZoom: [
      {
        type: 'slider',
        show: false,
        xAxisIndex: [0],
        left: '93%',
        // start: 100, //数据窗口范围的起始百分比
        // end: 64,
        startValue: 0, // 从头开始。
        endValue: 4, // 一次性展示4个。
        handleSize: 0,
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 100,
        end: 64,
        zoomOnMouseWheel: false,  // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0,0.8)',
      borderColor: 'rgba(0, 0, 0,0.8)',
      borderWidth: 0,
      position: function (point) {
        // 固定在顶部
        return [point[0] - 80, '30%'];
      },
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      textStyle: {
        color: '#fff',
        fontSize: 9,
        lineHeight: 100
      },
      formatter: function (params) {
        let axisValueLabel = params[0].axisValueLabel
        let data = `<span style='font-size: 13px;'>${axisValueLabel}</span><br />`
        params.map(item => {
          data += `${item.marker} ${item.seriesName} &nbsp;&nbsp;${item.value}&nbsp;${unit}<br />`
        })
        let result = `<p style='line-height: 22px;'>${data}</p>`
        return result
      }
    },
    legend: {
      type: "scroll",
      right: "3%",
      top: '3%',
      data: line,
      itemGap: 10,
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.75rem',
      },
      icon: "circle",
      // 禁止点击
      selectedMode: true
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
          fontSize: '0.75rem',
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
    option.series.push(seriesItem(item.name, item.data))

    // 多点动画
    // let datacoords = []
    // for (let i = 0; i < item.data.length; i++) {
    //   datacoords.push([
    //     {
    //       coord: [i, item.data[i]]
    //     },
    //     {
    //       coord: [i + 1, item.data[i + 1]]
    //     }
    //   ])
    // }

    // 单点动画
    let datacoords = [
      {
        coords: [],
      },
    ];
    for (let i = 0; i < item.data.length; i++) {
      datacoords[0].coords.push([xAxisData[i], item.data[i]]);
    }
    option.series.push(seriesItemAnimation(datacoords))
  })
  return option
}