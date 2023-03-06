import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { Box } from '@mui/material'
import * as echarts from 'echarts'

const Echart = ({ options, styleName, onMouseEnter, onMouseLeave }: any, ref) => {
  // const { options, class } = props
  const style = styleName || { width: '100%', height: '100%' }
  const chartRef: any = useRef<HTMLDivElement>(null)
  const [myChart, setMyChart] = useState<any>(null)

  useImperativeHandle(ref, () => ({
    setOption,
    myChart,
  }))

  const resizeEcharts = () => {
    myChart.resize()
  }

  // 初始化加载
  useEffect(() => {
    setMyChart(echarts.init(chartRef.current))
  }, [])

  // 设置Options
  function setOption(option) {
    if (option && myChart) {
      myChart.setOption(option)
    }
  }

  // 改变时修改
  useEffect(() => {
    if (myChart) {
      window.addEventListener('resize', resizeEcharts)
      return () => {
        window.removeEventListener('resize', resizeEcharts)
        myChart.dispose()
        setMyChart(null)
      }
    }
  }, [myChart])

  //鼠标移动
  const handleMouse = (state) => {
    if (state === 'enter') {
      onMouseEnter()
    } else if (state === 'leave') {
      onMouseLeave()
    }
  }
  useEffect(() => {
    if (myChart) {
      myChart.clear()
      myChart.setOption(options)
    }
  }, [myChart, JSON.stringify(options)])

  return (
    <Box
      ref={chartRef}
      style={style}
      onMouseEnter={() => handleMouse('enter')}
      onMouseLeave={() => handleMouse('leave')}
    />
  )
}

export default forwardRef(Echart)
