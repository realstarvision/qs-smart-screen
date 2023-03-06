import echarts from 'echarts'

// 圆环
export function circularRingOption() {

  let title = '145'
  let data = [
    { value: 66, name: '很好(0.3~0.6mm)' },
    { value: 36, name: '较好(0.6~0.9mm)' },
    { value: 20, name: '一般(0.9~1.2mm)' },
    { value: 15, name: '较差(1.2~1.5mm)' },
    { value: 8, name: '很差(1.5~1.8mm)' },
  ]


  return {
    color: ['#86DF6C', '#F9965E', '#00E6F9', '#FFD141', '#4182FF'],
    title: {
      text: title,
      // textAlign: 'center',
      subtext: '总面积(km²)',
      // left: '68%',
      left: 'center',
      top: '30%',
      textStyle: {
        color: '#4987FF',
        fontSize: '1.5rem',

      },
      subtextStyle: {
        color: '#ffffff',
        fontSize: '0.9rem',
      },
      // textVerticalAlign: 'middle',

      itemGap: 2
    },
    grid: {
      top: 0
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
      bottom: 0,
      data: ['很好(0.3~0.6mm)', '较好(0.6~0.9mm)', '一般(0.9~1.2mm)', '较差(1.2~1.5mm)', '很差(1.5~1.8mm)'],
      itemGap: 10,
      formatter: function (name) {
        return name + ' ' + '  '
      },
      itemWidth: 5,
      itemHeight: 5,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '1rem',
      },
      icon: "circle"
    },
    series: [
      {
        type: 'pie',
        radius: ['46%', '62%'],
        avoidLabelOverlap: false,
        center: ['50%', '40%'],
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


// 地物圆环
export function surfaceCircularRingOption() {
  return {
    // ['建筑', '道路', '林地', '草地', '裸地', '耕地', '水体'],
    color: ['#e0c364', '#f63307', '#7bef4d', '#1f51c7', '#dec313', '#83ac22', '#4492ce'],
    title: {
      text: '235',
      subtext: '总面积(km²)',
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#4987FF',
        fontSize: '1.3rem',
      },
      subtextStyle: {
        color: '#ffffff',
        fontSize: '1rem',
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
      data: ['建筑', '道路', '林地', '草地', '裸地', '耕地', '水体'],
      itemGap: 5,
      formatter: function (name) {
        return name
      },
      itemWidth: 5,
      itemHeight: 5,
      textStyle: {
        color: "#C3C7C7",
        fontSize: '0.9rem',
      },
      icon: "circle"
    },
    series: [
      {
        type: 'pie',
        radius: ['46%', '62%'],
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
        data: [
          { value: 50, name: '建筑' },
          { value: 10, name: '道路' },
          { value: 55, name: '林地' },
          { value: 30, name: '草地' },
          { value: 20, name: '裸地' },
          { value: 40, name: '耕地' },
          { value: 30, name: '水体' },
        ]
      }
    ]
  }
}

