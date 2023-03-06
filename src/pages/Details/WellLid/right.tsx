import React, { useEffect, useState } from 'react'
import { Box, Fade, Grid, FormLabel, MenuItem } from '@mui/material'
import Input from '@/components/Input'
import MyMenuItem from '@/components/MenuItem'
import { keyArea } from '@/components/Map/json'
import SvgIcon from '@/components/SvgIcon'
import Title from '@/pages/common/ModuleTitle'
// 图片
import well_lid_title from '@/assets/image/well_lid/well_lid_title.png'
import time_bar from '@/assets/image/keyAreas/time_bar.png'
import Echarts from '@/components/Echarts'
import rectangle from '@/assets/image/map/rectangle.png'
import back_btn from '@/assets/image/button/button_background.png'
// 数据
import { wellLid1, wellLid2 } from '@/components/Map/json'
import './style.scss'
import '../common.scss'

export default function index({ onBack, wellLidId, onItemClick }) {
  let deviceType = ['全部', '污水井', '雨水井']
  let deviceState = ['全部', '在线', '漫水预警', '离线']

  // 显示状态
  let [visible, setVisible] = useState(true)
  // 列表
  const [list, setList] = useState([...wellLid1, ...wellLid2])
  // 数据
  let [data, setData] = useState({
    id: 0,
    title: '',
    coordinates: [],
    text: '',
    icon: '',
    state: 0,
    place: '',
    joinTime: '',
    alarmTime: '',
  })
  // 参数
  const [formParams, setFormParams] = useState({
    text: '全部',
    state: 0,
  })

  useEffect(() => {
    let itemData: any = [...wellLid1, ...wellLid2].find((item) => {
      return item.id === wellLidId
    })
    Object.keys(data).forEach((item) => {
      console.log(item)
      data[item] = itemData[item]
    })
    setData({ ...data })
  }, [wellLidId])

  /* 返回按钮 */
  const handleBack = () => {
    onBack()
  }

  /* 列表项点击事件 */
  const handleItemClick = (itemData) => {
    // keyArea.forEach(ele => {
    //   ele.icon = ele.defaultIcon
    // })
    // item.icon = item.activeIcon
    Object.keys(data).forEach((item) => {
      data[item] = itemData[item]
    })
    setData({ ...data })
    onItemClick(itemData.coordinates)
    setVisible(true)
  }

  /* 下拉框选择 */
  const handleInputChange = (e, type) => {
    formParams[type] = e.target.value
    setFormParams({ ...formParams })
    let newList = []
    if (formParams.text !== '全部') {
      newList = [...wellLid1, ...wellLid2].filter((item) => {
        if (item.text === formParams.text) {
          return item
        }
      })
    } else {
      newList = [...wellLid1, ...wellLid2]
    }
    if (formParams.state !== 0) {
      newList = newList.filter((item) => {
        if (item.state === formParams.state) {
          return item
        }
      })
    }
    setList([...newList])
  }
  return (
    <>
      <Fade in={visible}>
        <Box className={'rightBox rightBox_wellLid'}>
          <Box className="title_bar">
            <div className="title_info">
              <span className="title">{data.title}</span>
              <p
                className={'tigs ' + (data.state === 1 ? 'tigs_green' : data.state === 2 ? 'tigs_yellow' : 'tigs_red')}
              >
                {data.state === 1 ? '在线' : data.state === 2 ? '漫水预警' : '离线'}
              </p>
            </div>
            <SvgIcon
              svgName="closeX"
              svgClass="closeX"
              onClick={() => {
                setVisible(false)
              }}
            ></SvgIcon>
          </Box>
          {/* <img
            src={rectangle}
            style={{
              width: '70%',
              marginTop: '30px',
            }}
          /> */}
          <p className="mt font">入网时间：{data.joinTime}</p>
          <p className="mt font">设备类型：{data.text}</p>
          <p className="mt font">投放地址：{data.place}</p>
          <p
            className="mt font"
            style={{
              display: 'flex',
            }}
          >
            <span>经纬度：</span>
            <div>
              {data.coordinates.length > 0 ? data.coordinates[0] : ''}
              <br />
              {data.coordinates.length > 0 ? data.coordinates[1] : ''}
            </div>
          </p>
          {(data.state === 2 || data.state === 3) && (
            <p
              className="mt font"
              style={{
                color: data.state === 3 ? '#DD2121' : '#FFD141 ',
              }}
            >
              {data.state === 3 ? '最后通信时间' : '告警时间 '} ：{data.alarmTime}
            </p>
          )}
        </Box>
      </Fade>

      {/* <img src={time_bar} className="time_bar" /> */}
      {/* <img src={back_btn} className="back_btn" onClick={handleBack} /> */}
    </>
  )
}
