import React, { useEffect, useState } from 'react'
import { Box, Fade } from '@mui/material'
import { CSSTransition } from 'react-transition-group'
import SvgIcon from '@/components/SvgIcon'
import Title from '@/pages/common/ModuleTitle'
import TimeBar from '@/components/TimeBar'
import { circularRingOption, linearGradientOption } from './option'
import { socketSend } from '@/utils/websocket'
import Echarts from '@/components/Echarts'
import { keyArea as keyArealist, roadPoinList, bridgePoinList } from '@/components/Map/json'
import './style.scss'
import '../common.scss'

// 图片
import rectangle from '@/assets/image/test/rectangle.png'

export default function index({ keyAreaId, type, place }) {
  let line = ['道路', '桥梁', '建筑']
  let xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  // 显示状态
  let [visible, setVisible] = useState(true)
  // 数据
  let [data, setData] = useState({
    id: 0,
    lineChartData: [],
    time: '',
    accumulativeTotal: '',
    acreage: '',
    circularRingData: [],
    title: '',
    type: '',
  })

  // 列表
  let [list, setList] = useState([])

  useEffect(() => {
    let itemData: any = [...keyArealist].find((item) => {
      return item.id === keyAreaId
    })
    let listData = keyArealist
    // switch (type) {
    //   case 'keyArea':
    //     listData = keyArealist
    //     break
    //   case 'road':
    //     listData = roadPoinList
    //     break
    //   case 'bridge':
    //     listData = bridgePoinList
    //     break
    //   case 'danger':
    //     listData = [...keyArealist, ...roadPoinList, ...bridgePoinList].filter((item) => {
    //       return item.type === 'danger'
    //     })
    //     break
    //   case 'fluctuate':
    //     listData = [...keyArealist, ...roadPoinList, ...bridgePoinList].filter((item) => {
    //       return item.type === 'fluctuate'
    //     })
    //     break
    // }
    Object.keys(data).forEach((item) => {
      data[item] = itemData[item]
    })
    setData({ ...data })
    setList(listData)
  }, [keyAreaId])

  /* 列表项点击事件 */
  const handleItemClick = (itemData) => {
    // Object.keys(data).forEach((item) => {
    //   data[item] = itemData[item]
    // })
    // setData({ ...data })
    // onItemClick(itemData.coordinates)
    socketSend({ checkedPoint: itemData })
    setVisible(true)
  }

  /* 十二期选择器的点击事件 */
  const handleTimeBarClick = (active) => {
    console.log(active)
  }
  return (
    <>
      {place === 0 && (
        <Box className={'leftBox leftBox_keyAreas'}>
          <Box className={'left'}>
            <Box className="top">
              <Title
                title="重点沉降监测区域"
                style={{
                  marginBottom: '20px',
                }}
              ></Title>
            </Box>
            <Box className={'list'}>
              {list.map((item, index) => (
                <Box onClick={() => handleItemClick(item)} className={'item ' + (item.id === data.id ? 'active' : '')}>
                  <p className={'title'}>{item.title}</p>
                  <p className={'time'}>{item.time}</p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      <Fade in={visible && place === 2} timeout={500}>
        <Box className={'rightBox rightBox_keyAreas'}>
          <Box className="rightBox-warpper">
            <Box className="title_bar">
              <div className="title_info">
                <span className="title">{data.title}</span>
                <div
                  className={
                    'tigs ' +
                    (data.type == 'danger' ? 'tigs_red' : data.type == 'fluctuate' ? 'tigs_yellow' : 'tigs_green')
                  }
                >
                  {data.type === 'danger' ? '危险区域' : data.type === 'fluctuate' ? '波动区域' : '平稳区域'}
                </div>
              </div>
              {/* <SvgIcon
              svgName="closeX"
              svgClass="closeX"
              onClick={() => {
                setVisible(false)
              }}
            ></SvgIcon> */}
            </Box>
            <img
              src={rectangle}
              style={{
                maxHeight: '22%',
                minHeight: '100px',
              }}
            />
            <p className="mt font">监测时间：{data.time}</p>
            <p className="mt font">最大沉降幅度：{data.accumulativeTotal}</p>
            <p className="mt font">面积统计</p>
            <div className="subsidenceAreaEchart_box">
              <Echarts options={circularRingOption(data.acreage, data.circularRingData)}></Echarts>
            </div>
            <p className="font">沉降面积变化</p>
            <div className="trendSettlementEchart_box">
              <Echarts
                options={linearGradientOption({
                  list: data.lineChartData,
                  line,
                  xAxisData,
                  grid: { left: 35, top: '20%', bottom: 20, right: '3%' },
                })}
              ></Echarts>
            </div>
          </Box>
        </Box>
      </Fade>

      {place === 1 && (
        <div className="time_bar">
          <TimeBar dataIndex={1} onClick={handleTimeBarClick}></TimeBar>
        </div>
      )}
    </>
  )
}
