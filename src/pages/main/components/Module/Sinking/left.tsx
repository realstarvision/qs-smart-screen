import React, { useEffect, useRef, useState } from 'react'
import { Grid, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
// 组件
import Echarts from '@/components/Echarts'
import Title from '@/pages/common/ModuleTitle'
import HexagonModule from '../../HexagonModule'
// 数据
import { setDangerLevel } from '@/store/module/dangerLevel'
import { socketSend } from '@/utils/websocket'
import './style.scss'
import { linearGradientOption, circularRingOption } from '../echartOption'
import { list, line, xAxisData, dangerList, dangerLine, xAxisDataDanger, dangerLevelHexagonList } from './json'
// 图片
import doughnut_chart_style from '@/assets/image/png/doughnut_chart_style.png'

// 定时器
let historyDataTimer = null
let areaChangeTimer = null

export default function index({ mapTabActive }) {
  const dispatch = useDispatch()
  let dangerLevel = useSelector((state: { dangerLevel }) => state.dangerLevel.value)
  // 图表的ref
  const subsidenceAreaEchartRef = useRef(null)
  const historyDataEchartRef = useRef(null)
  const dangerLevelEchartRef = useRef(null)
  // 六边形打开状态
  let [open, setOpen] = useState({ ...dangerLevel })
  // 沉降面积数据
  let [subsidenceArea, setSubsidenceArea] = useState([
    { value: 5, name: '上升' },
    { value: 5, name: '下降' },
  ])

  // 初始化
  useEffect(() => {
    if (historyDataEchartRef.current) {
      setTimeout(() => {
        historyDataTimer = eventProcessingChart()
      }, 0)
    }
  }, [historyDataEchartRef.current])

  useEffect(() => {
    if (dangerLevelEchartRef.current) {
      setTimeout(() => {
        areaChangeTimer = areaChangeChart()
      }, 0)
    }
  }, [dangerLevelEchartRef.current])

  useEffect(() => {
    return function () {
      clearInterval(historyDataTimer)
      clearInterval(areaChangeTimer)
      historyDataTimer = null
      areaChangeTimer = null
    }
  }, [])

  useEffect(() => {
    /* 重置危险等级 */
    // if (mapTabActive !== 0) {
    Object.keys(open).forEach((item) => {
      open[item] = false
    })
    setOpen({ ...open })
    // dispatch(setDangerLevel({ ...open }))
    socketSend({ dangerLevel: { ...open } })
    // }
    // 改变图表数据
    if (mapTabActive === 0) {
      setSubsidenceArea([
        { value: 5, name: '上升' },
        { value: 5, name: '下降' },
      ])
      dangerLevelHexagonList.forEach((item) => {
        item.value = '5.00'
      })
    } else if (mapTabActive === 1) {
      setSubsidenceArea([
        { value: 1, name: '上升' },
        { value: 3, name: '下降' },
      ])
      dangerLevelHexagonList.forEach((item) => {
        item.value = '4.00'
      })
    } else if (mapTabActive === 2) {
      setSubsidenceArea([
        { value: 8, name: '上升' },
        { value: 6, name: '下降' },
      ])
      dangerLevelHexagonList.forEach((item) => {
        item.value = '3.00'
      })
    } else if (mapTabActive === 3) {
      setSubsidenceArea([
        { value: 7, name: '上升' },
        { value: 2, name: '下降' },
      ])
      dangerLevelHexagonList.forEach((item) => {
        item.value = '2.00'
      })
    }

    // 图表变化
    // chartsChange()
  }, [mapTabActive])

  useEffect(() => {
    // 图表变化
    // chartsChange()
  }, [subsidenceAreaEchartRef.current])

  // 沉降面积圆环和历史数据折线图的变化
  function chartsChange() {
    // 切换计算面积
    setTimeout(() => {
      if (mapTabActive == 0 || mapTabActive == 3) {
        subsidenceAreaEchartRef.current.setOption({
          title: {
            text: '16.8',
          },
        })
      } else {
        subsidenceAreaEchartRef.current.setOption({
          title: {
            text: '5',
          },
        })
      }
      // 控制图标legend选中
      subsidenceAreaEchartRef.current.setOption({
        legend: {
          selected: {
            ['道路']: mapTabActive == 2 ? false : true,
            ['桥梁']: mapTabActive == 1 ? false : true,
            ['其它']: mapTabActive == 1 || mapTabActive == 2 ? false : true,
          },
        },
      })
      historyDataEchartRef.current.setOption({
        legend: {
          selected: {
            ['道路']: mapTabActive == 2 ? false : true,
            ['桥梁']: mapTabActive == 1 ? false : true,
            ['其它']: mapTabActive == 1 || mapTabActive == 2 ? false : true,
          },
        },
      })
    })
  }

  /* 监听六边形点击状态变化 */
  useEffect(() => {
    // 没有选中的情况
    let isAll = Object.keys(open).findIndex((item) => {
      if (open[item]) {
        return item
      }
    })
    // 设置
    dangerLevelEchartRef.current.setOption({
      legend: {
        selected: {
          ['平稳']: open.steady || isAll === -1 ? true : false,
          ['有波动']: open.fluctuate || isAll === -1 ? true : false,
          ['危险']: open.danger || isAll === -1 ? true : false,
        },
      },
    })
  }, [open])

  /* 六边形单击事件 */
  const handleOpen = (item, type) => {
    // if (mapTabActive === 0) {
    open[type] = !open[type]
    // dispatch(setDangerLevel({ ...open }))
    socketSend({ dangerLevel: { ...open } })
    setOpen({ ...open })
    // }
  }

  // 定时器滚动事件
  function eventProcessingChart() {
    // 定时器
    console.log(historyDataEchartRef.current.myChart)
    if (historyDataTimer) {
      clearInterval(historyDataTimer)
    }
    let timer = setInterval(function () {
      // 每次向后滚动一个，最后一个从头开始。
      let option = historyDataEchartRef.current.myChart.getModel().option
      let obj
      if (option.dataZoom[0].endValue == 6) {
        obj = {
          startValue: 0,
          endValue: 4,
        }
      } else {
        obj = {
          startValue: option.dataZoom[0].startValue + 1,
          endValue: option.dataZoom[0].endValue + 1,
        }
      }
      historyDataEchartRef.current.setOption({
        dataZoom: [obj],
      })
    }, 3500)
    return timer
  }
  function areaChangeChart() {
    // 定时器
    if (areaChangeTimer) {
      clearInterval(areaChangeTimer)
    }
    let timer = setInterval(function () {
      // 每次向后滚动一个，最后一个从头开始。
      let option = dangerLevelEchartRef.current.myChart.getModel().option
      let obj
      if (option.dataZoom[0].endValue == 6) {
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
      dangerLevelEchartRef.current.setOption({
        dataZoom: [obj],
      })
    }, 3500)
    return timer
  }

  // 历史统计图表鼠标移入移出事件
  const handleHistoryDataMouse = (type) => {
    if (type === 'enter') {
      if (historyDataTimer) {
        clearInterval(historyDataTimer)
        historyDataTimer = null
      }
    } else if (type === 'leave') {
      historyDataTimer = eventProcessingChart()
    }
  }

  // 面积变化图表鼠标移入移出事件
  const handleAreaChangeMouse = (type) => {
    if (type === 'enter') {
      if (areaChangeTimer) {
        clearInterval(areaChangeTimer)
        areaChangeTimer = null
      }
    } else if (type === 'leave') {
      areaChangeTimer = areaChangeChart()
    }
  }

  return (
    <div className="sinking	">
      <Grid container spacing={6} className="subsidence_risk_prediction">
        <Grid xs={6} item className="subsidence_area">
          <Title title="沉降面积" size="normal" />
          <div className="chart-box">
            <img src={doughnut_chart_style} className="doughnut_chart " />
            <Echarts options={circularRingOption(subsidenceArea)} ref={subsidenceAreaEchartRef}></Echarts>
          </div>
        </Grid>
        <Grid xs={6} item className="threat_level">
          <Title title="历史数据" size="normal" />
          <Echarts
            ref={historyDataEchartRef}
            onMouseEnter={() => handleHistoryDataMouse('enter')}
            onMouseLeave={() => handleHistoryDataMouse('leave')}
            options={linearGradientOption({
              list,
              line,
              xAxisData,
              grid: { left: 35, top: '20%', bottom: 30, right: '3%' },
              unit: 'km²',
            })}
          ></Echarts>
          {/* <p className="unit">单位：km²</p> */}
        </Grid>
      </Grid>
      <Grid container spacing={6} className="middle">
        <Grid
          xs={6}
          item
          className="left"
          style={{
            paddingTop: 0,
          }}
        >
          <Title title="危险等级" size="normal" />
          <HexagonModule list={dangerLevelHexagonList} onOpen={handleOpen} open={open}></HexagonModule>
          <p className="unit">单位：km²</p>
          <DangerLevelLegend></DangerLevelLegend>
        </Grid>

        <Grid
          xs={6}
          item
          className="threat_level"
          style={{
            paddingTop: 0,
          }}
        >
          <Title title="面积变化" size="normal" />
          <Echarts
            ref={dangerLevelEchartRef}
            onMouseEnter={() => handleAreaChangeMouse('enter')}
            onMouseLeave={() => handleAreaChangeMouse('leave')}
            options={linearGradientOption({
              list: dangerList,
              line: dangerLine,
              xAxisData: xAxisDataDanger,
              grid: { left: 35, top: '20%', bottom: 30, right: '3%' },
              lineStyle: ['#05D201', '#D28B01', '#D20101'],
              color: ['5,210,1', '210, 139, 1', '210,1,1'],
              unit: 'km²',
            })}
          ></Echarts>
        </Grid>
      </Grid>
      {/* <Grid xs={4}>
          <Box className="cumulative_settlement_volume">
            <Box className="map_tabs">
              {mapTabs.map((tab, index) => (
                <Box className="tab" onClick={() => handleMapTabClick(index)}>
                  <img src={mapTabActive === index ? tab.activeName : tab.name} className={'bg'}></img>
                  <span
                    style={{
                      color: mapTabActive === index ? '#eee' : '#7DA9D0',
                    }}
                  >
                    {tab.label}
                  </span>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid> */}
    </div>
  )
}

function DangerLevelLegend() {
  let legendList = [
    {
      color: '#0EA507',
      label: '5mm以下',
    },
    {
      color: '#946E22',
      label: '5mm～20mm',
    },
    {
      color: '#A02626',
      label: '20mm以上',
    },
  ]

  return (
    <Box className="legend">
      {legendList.map((item) => {
        return (
          <span
            style={
              {
                '--bgColor': item.color,
              } as any
            }
          >
            {item.label}
          </span>
        )
      })}
    </Box>
  )
}
