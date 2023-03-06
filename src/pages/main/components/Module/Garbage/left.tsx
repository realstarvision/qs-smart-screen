import React, { useEffect, useRef } from 'react'
import { Box, Grid } from '@mui/material'
import Title from '@/pages/common/ModuleTitle'
import HexagonModule from '../../HexagonModule'
import Switch from '@/components/Switch'
import Echarts from '@/components/Echarts'
import { doubleLinearOption, linearGradientOption } from '../echartOption'
// 图片
import weather_data from '@/assets/image/test/weather_data.png'
import doughnut_chart_style from '@/assets/image/png/doughnut_chart_style.png'
import danger from '@/assets/image/png/hexagon/danger.png'
import steady from '@/assets/image/png/hexagon/steady.png'
import fluctuate from '@/assets/image/png/hexagon/fluctuate.png'
import dangerChecked from '@/assets/image/png/hexagon/danger_checked.png'
import steadyChecked from '@/assets/image/png/hexagon/steady_checked.png'
import fluctuateChecked from '@/assets/image/png/hexagon/fluctuate_checked.png'
import garbage_statistics_loop_outer from '@/assets/image/png/garbage_statistics_loop_outer.png'
import garbage_statistics_loop_inner from '@/assets/image/png/garbage_statistics_loop_inner.png'

let hexagonList = [
  {
    type: 'danger',
    label: '告警',
    img: fluctuate,
    checkImg: fluctuateChecked,
    value: '18',
  },
  {
    type: 'steady',
    label: '正常',
    img: steady,
    checkImg: steadyChecked,
    value: '472',
  },
  {
    type: 'fluctuate',
    label: '离线',
    img: danger,
    checkImg: dangerChecked,
    value: '10',
  },
]

let xLabel = ['新建社区', '乔司社区', 'aa社区', 'bb社区', 'cc社区', 'dd社区']
let yData = [14.1, 19.6, 11.3, 12.5, 10.6, 18.6]

let list = [
  {
    name: '生活垃圾',
    data: [10, 60, 50, 70, 79, 26, 55, 35, 65, 3, 11, 47],
  },
  {
    name: '厨余垃圾',
    data: [7, 33, 9, 70, 79, 26, 60, 35, 22, 3, 63, 77],
  },
  {
    name: '可回收垃圾',
    data: [50, 66, 9, 20, 79, 26, 53, 35, 72, 3, 63, 44],
  },
]

let line = ['生活垃圾', '厨余垃圾', '可回收垃圾']
let xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

// 垃圾统计数据
let garbageStatisticalData = [
  {
    monthlyCount: 125,
    quarterCount: 351,
    typeName: '厨余垃圾',
  },
  {
    monthlyCount: 125,
    quarterCount: 351,
    typeName: '可回收物',
  },
  {
    monthlyCount: 125,
    quarterCount: 351,
    typeName: '有害垃圾',
  },
  {
    monthlyCount: 125,
    quarterCount: 351,
    typeName: '其他垃圾',
  },
]

// 定时器
let garbageSortingTimer = null

export default function index() {
  const garbageSortingRef = useRef(null)

  // 初始化
  useEffect(() => {
    setTimeout(() => {
      garbageSortingTimer = ChartTimer()
    }, 0)

    return function () {
      clearInterval(garbageSortingTimer)
      garbageSortingTimer = null
    }
  }, [])
  /* 开关事件 */
  const handleSwitch = (e, type) => {
    // if (type === 'waterAcreage') {
    //   dispatch(
    //     setSwitch({
    //       waterAcreage: e.target.checked,
    //       wellLid: switchData.wellLid,
    //     })
    //   )
    // } else {
    //   dispatch(
    //     setSwitch({
    //       waterAcreage: switchData.waterAcreage,
    //       wellLid: e.target.checked,
    //     })
    //   )
    // }
  }
  /* 查看详情按钮 */
  const handleCheckDetails = () => {
    // onCheckDetails('waterlogging')
  }

  // 定时器滚动事件
  function ChartTimer() {
    // 定时器
    return setInterval(function () {
      // 每次向后滚动一个，最后一个从头开始。
      let option = garbageSortingRef.current.myChart.getModel().option
      let obj
      if (option.dataZoom[0].endValue == 11) {
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
      garbageSortingRef.current.setOption({
        dataZoom: [obj],
      })
    }, 3500)
  }

  // 图表鼠标移入移出事件
  const handleMouse = (type) => {
    if (type === 'enter') {
      if (garbageSortingTimer) {
        clearInterval(garbageSortingTimer)
        garbageSortingTimer = null
      }
    } else if (type === 'leave') {
      garbageSortingTimer = ChartTimer()
    }
  }
  return (
    <Box className="garbage_sorting">
      <Grid container spacing={6} className="top">
        <Grid xs={6} item className="garbage_sorting_chart">
          <Title title="垃圾分类" size="normal"></Title>
          {/* <p className="unit">单位：kg</p> */}
          <Echarts
            ref={garbageSortingRef}
            onMouseEnter={() => handleMouse('enter')}
            onMouseLeave={() => handleMouse('leave')}
            options={linearGradientOption({
              list,
              line,
              xAxisData,
              grid: { left: 35, top: '20%', bottom: 20, right: '3%' },
              unit: 'kg',
            })}
          ></Echarts>
        </Grid>
        <Grid xs={6} item className="garbage_statistical_chart">
          <Title
            title="垃圾统计"
            style={{
              marginBottom: '15px',
            }}
            size="normal"
          ></Title>
          <div className="garbage_statistical">
            {garbageStatisticalData.map((item) => (
              <StatisticalModule
                quarterCount={item.quarterCount}
                monthlyCount={item.monthlyCount}
                typeName={item.typeName}
              ></StatisticalModule>
            ))}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={6} className="garbage_disposal">
        <Grid xs={12} item className="garbage_disposal-wrapper">
          <Title title="垃圾处理趋势" size="large"></Title>
          <Echarts options={doubleLinearOption({ unit: 'kg' })}></Echarts>
        </Grid>
      </Grid>
    </Box>
  )
}

// 统计模块
function StatisticalModule({ monthlyCount, quarterCount, typeName }) {
  // 模块内容
  let moduleList = [
    {
      label: '季处理量',
      count: quarterCount,
    },
    {
      label: '月处理量',
      count: monthlyCount,
    },
  ]
  return (
    <div className="statistical_module">
      <div className="count">
        {moduleList.map((item) => {
          return (
            <div>
              <p className="label">{item.label}</p>
              <p className="number">{item.count}</p>
              <img className="loop_outer" src={garbage_statistics_loop_outer} />
              <img className="loop_inner" src={garbage_statistics_loop_inner} />
            </div>
          )
        })}
      </div>
      <p className="type">{typeName}</p>
    </div>
  )
}
