import React, { useEffect, useRef } from 'react'
import { Box, Grid } from '@mui/material'
import Title from '@/pages/common/ModuleTitle'
import HexagonModule from '../../HexagonModule'
import Switch from '@/components/Switch'
import Echarts from '@/components/Echarts'
import SvgIcon from '@/components/SvgIcon'
import { socketSend } from '@/utils/websocket'
import { useSelector, useDispatch } from 'react-redux'
import { setSwitch } from '@/store/module/switch'
import { triangleOption, circularRingOption, circularRingWaterloggingOption, lineOrdinary } from '../echartOption'

// 图片
import weather_data from '@/assets/image/test/weather_data.png'
import doughnut_chart_style from '@/assets/image/png/doughnut_chart_style.png'
import danger from '@/assets/image/png/hexagon/danger.png'
import steady from '@/assets/image/png/hexagon/steady.png'
import fluctuate from '@/assets/image/png/hexagon/fluctuate.png'
import dangerChecked from '@/assets/image/png/hexagon/danger_checked.png'
import steadyChecked from '@/assets/image/png/hexagon/steady_checked.png'
import fluctuateChecked from '@/assets/image/png/hexagon/fluctuate_checked.png'

let hexagonList = [
  {
    type: 'fluctuate',
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
    type: 'danger',
    label: '离线',
    img: danger,
    checkImg: dangerChecked,
    value: '10',
  },
]

let xLabel = ['新建社区', '乔司社区', 'aa社区', 'bb社区', 'cc社区', 'dd社区']
let yData = [14.1, 19.6, 11.3, 12.5, 10.6, 18.6]

/* 图表数据 */
export let dangerList = [
  {
    name: '新建社区',
    data: [15, 20, 4, 23, 15, 10, 5],
  },
  {
    name: '乔司社区',
    data: [17, 3, 22, 7, 9, 6, 15],
  },
  {
    name: 'aa社区',
    data: [5, 6, 17, 20, 9, 26, 3],
  },
  {
    name: 'bb社区',
    data: [3, 9, 55, 23, 2, 5, 8],
  },
  {
    name: 'cc社区',
    data: [1, 5, 5, 20, 9, 30, 6],
  },
  {
    name: 'dd社区',
    data: [78, 5, 12, 50, 5, 7, 2],
  },
]

export let dangerLine = ['新建社区', '乔司社区', 'aa社区', 'bb社区', 'cc社区', 'dd社区']
export let xAxisDataDanger = ['2022/1', '2022/3', '2022/4', '2022/5', '2022/7', '2022/9', '2022/11       ']

// 气象数据
let meteorologicalData = [
  {
    icon: 'weather',
    label: '天气',
    data: '大雨',
  },
  {
    icon: 'temperature',
    label: '温度',
    data: '27℃',
  },
  {
    icon: 'wind',
    label: '风力风向',
    data: '西北风 4级',
  },
  {
    icon: 'humidness',
    label: '湿度',
    data: '51%',
  },
  {
    icon: 'precipitation',
    label: '降水量',
    data: '200mm',
  },
  {
    icon: 'atmospheric_pressure',
    label: '气压',
    data: '100hpa',
  },
]

// 定时器
let waterAreaTimer = null

export default function index() {
  const dispatch = useDispatch()
  let switchData = useSelector((state: { Switch }) => state.Switch.value)
  const waterAreaRef = useRef(null)
  // 初始化
  useEffect(() => {
    setTimeout(() => {
      waterAreaTimer = eventProcessingChart()
    }, 0)

    return function () {
      clearInterval(waterAreaTimer)
      waterAreaTimer = null
    }
  }, [])

  /* 开关事件 */
  const handleSwitch = (e, type) => {
    if (type === 'waterAcreage') {
      socketSend({
        switchData: {
          waterAcreage: e.target.checked,
          wellLid: switchData.wellLid,
        },
      })
    } else {
      socketSend({
        switchData: {
          waterAcreage: switchData.waterAcreage,
          wellLid: e.target.checked,
        },
      })
    }
  }

  // 定时器滚动事件
  function eventProcessingChart() {
    // 定时器
    if (waterAreaTimer) {
      clearInterval(waterAreaTimer)
    }
    return setInterval(function () {
      // 每次向后滚动一个，最后一个从头开始。
      let option = waterAreaRef.current.myChart.getModel().option
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
      waterAreaRef.current.setOption({
        dataZoom: [obj],
      })
    }, 3500)
  }

  // 事件处理统计图表鼠标移入移出事件
  const handleMouse = (type) => {
    if (type === 'enter') {
      if (waterAreaTimer) {
        clearInterval(waterAreaTimer)
        waterAreaTimer = null
      }
    } else if (type === 'leave') {
      waterAreaTimer = eventProcessingChart()
    }
  }
  /* 查看详情按钮 */
  const handleCheckDetails = () => {
    // onCheckDetails('waterlogging')
  }
  return (
    <Box className="waterlogging">
      <Grid container spacing={6} className="waterlogging-grid">
        <Grid xs={6} item>
          <Title title="气象数据" size="normal"></Title>
          <Grid container className="meteorological">
            {meteorologicalData.map((data) => (
              <Grid item xs={6}>
                <WeatherModule data={data}></WeatherModule>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={6} item>
          <Box className="water_acreage">
            {/* <div className="month">
          <SvgIcon svgName="arrows" svgClass="leftArrows"></SvgIcon>
          <span>12月</span>
          <SvgIcon svgName="arrows" svgClass="rightArrows"></SvgIcon>
        </div> */}
            <Title title="水体面积监测" size="normal"></Title>
            {/* options={triangleOption(xLabel, yData)} */}
            <Echarts
              ref={waterAreaRef}
              onMouseEnter={() => handleMouse('enter')}
              onMouseLeave={() => handleMouse('leave')}
              options={lineOrdinary({
                list: dangerList,
                line: dangerLine,
                xAxisData: xAxisDataDanger,
                grid: { left: 35, top: '20%', bottom: 30, right: '3%' },
              })}
            ></Echarts>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={6} className="bottom">
        <Grid
          xs={6}
          item
          className="device_monitoring"
          style={{
            paddingTop: 0,
          }}
        >
          <Title title="设备监测" size="normal"></Title>
          <HexagonModule list={hexagonList}></HexagonModule>
          <div className="switch">
            <span>水井设备分布</span>
            <Switch checked={switchData.wellLid} onChange={(e) => handleSwitch(e, 'wellLid')}></Switch>
          </div>
          <span className="device_count">设备总数：500</span>
        </Grid>

        <Grid
          xs={6}
          item
          style={{
            paddingTop: 0,
          }}
        >
          <Box className="well_lid">
            {/* <img src={waterlogging_area} /> */}
            <Title size="normal" style={{ marginBottom: '10px' }} title="易涝地区监测"></Title>

            <div className="echart">
              <img src={doughnut_chart_style} className="doughnut_chart " />
              <Echarts options={circularRingWaterloggingOption('277')}></Echarts>
            </div>

            <div className="switch">
              <span>易涝点分布</span>
              <Switch checked={switchData.waterAcreage} onChange={(e) => handleSwitch(e, 'waterAcreage')}></Switch>
            </div>
            <div className="check" onClick={handleCheckDetails}>
              查看内涝分析详情 &gt;&gt;&gt;
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* <Grid container spacing={6} className="waterlogging-grid">
        <Grid xs={4} item>
          <Title title="气象数据" size="small"></Title>
          <Grid
            container
            sx={{
              padding: '0 23px',
            }}
          >
            {meteorologicalData.map((data) => (
              <Grid item xs={6}>
                <WeatherModule data={data}></WeatherModule>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={8} item>
          <Box className="water_acreage">
            <Title style={{ marginBottom: '10px' }} title="水体面积监测"></Title>
            <Echarts options={triangleOption(xLabel, yData)}></Echarts>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid xs={4} item className="device_monitoring">
          <Title
            title="设备监测"
            size={'small'}
            style={{
              marginBottom: '60px',
            }}
          ></Title>
          <HexagonModule list={hexagonList}></HexagonModule>
          <div className="switch">
            <span>水井设备分布</span>
            <Switch checked={false} onChange={(e) => handleSwitch(e, 'wellLid')}></Switch>
          </div>
          <span className="device_count">设备总数：500</span>
        </Grid>
        <Grid xs={8} item>
          <Box className="well_lid">
            <Title style={{ marginBottom: '40px' }} title="易涝地区监测"></Title>

            <div className="echart">
              <img src={doughnut_chart_style} className="doughnut_chart " />
              <Echarts options={circularRingWaterloggingOption('277')}></Echarts>
            </div>

            <div className="switch">
              <span>易涝点分布</span>
              <Switch checked={true} onChange={(e) => handleSwitch(e, 'waterAcreage')}></Switch>
            </div>
            <div className="check" onClick={handleCheckDetails}>
              查看内涝分析详情 &gt;&gt;&gt;
            </div>
          </Box>
        </Grid>
      </Grid> */}
    </Box>
  )
}

function WeatherModule({ data }) {
  return (
    <div className="weather_module">
      <SvgIcon svgName={data.icon} svgClass="icon"></SvgIcon>
      <div className="right">
        <p className="label">{data.label}</p>
        <p className="data">{data.data}</p>
      </div>
    </div>
  )
}
