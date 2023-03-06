import React, { useEffect, useState } from 'react'
import { Box, Fade, Grid, FormLabel, MenuItem } from '@mui/material'
import Input from '@/components/Input'
import MyMenuItem from '@/components/MenuItem'
import { keyArea } from '@/components/Map/json'
import SvgIcon from '@/components/SvgIcon'
import Title from '@/pages/common/ModuleTitle'
import { socketSend } from '@/utils/websocket'
// 图片
import well_lid_title from '@/assets/image/well_lid/well_lid_title.png'
import time_bar from '@/assets/image/keyAreas/time_bar.png'
import Echarts from '@/components/Echarts'
import rectangle from '@/assets/image/map/rectangle.png'
import back_btn from '@/assets/image/button/button_background.png'
// 数据
import { wellLid } from '@/components/Map/json'
import './style.scss'
import '../common.scss'

export default function index({ wellLidId, place }) {
  let deviceType = ['全部', '污水井', '雨水井']
  let deviceState = ['全部', '在线', '漫水预警', '离线']

  // 显示状态
  let [visible, setVisible] = useState(true)
  // 列表
  const [list, setList] = useState([...wellLid])
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
    let itemData: any = [...wellLid].find((item) => {
      return item.id === wellLidId
    })
    Object.keys(data).forEach((item) => {
      console.log(item)
      data[item] = itemData[item]
    })
    setData({ ...data })
  }, [wellLidId])

  /* 列表项点击事件 */
  const handleItemClick = (itemData) => {
    // keyArea.forEach(ele => {
    //   ele.icon = ele.defaultIcon
    // })
    // item.icon = item.activeIcon
    // Object.keys(data).forEach((item) => {
    //   data[item] = itemData[item]
    // })
    // setData({ ...data })
    // onItemClick(itemData.coordinates)
    socketSend({ checkedPoint: itemData })
    setVisible(true)
  }

  /* 下拉框选择 */
  const handleInputChange = (e, type) => {
    formParams[type] = e.target.value
    setFormParams({ ...formParams })
    let newList = []
    if (formParams.text !== '全部') {
      newList = [...wellLid].filter((item) => {
        if (item.text === formParams.text) {
          return item
        }
      })
    } else {
      newList = [...wellLid]
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
      {place === 0 && (
        <Box className={'leftBox leftBox_wellLid'}>
          <Box className={'left'}>
            <Title
              title="井盖设备列表"
              style={{
                marginBottom: '20px',
              }}
            ></Title>
            <Grid container spacing={{ xs: 1 }} className="from">
              <Grid item xs={6} className="from-item">
                <FormLabel component="span" className="label">
                  设备类型
                </FormLabel>
                <Input
                  select
                  required
                  id="phoneInput"
                  size="small"
                  placeholder="设备类型"
                  value={formParams.text}
                  onChange={(e) => handleInputChange(e, 'text')}
                  autoComplete="off"
                  sx={{
                    width: '70%',
                  }}
                >
                  {deviceType.map((item, index) => (
                    <MyMenuItem key={index} value={item}>
                      {item}
                    </MyMenuItem>
                  ))}
                </Input>
              </Grid>
              <Grid item xs={6} className="from-item">
                <FormLabel component="span" className="label">
                  设备状态
                </FormLabel>
                <Input
                  select
                  required
                  id="phoneInput"
                  size="small"
                  placeholder="设备状态"
                  value={formParams.state}
                  onChange={(e) => handleInputChange(e, 'state')}
                  autoComplete="off"
                  sx={{
                    width: '70%',
                  }}
                >
                  {deviceState.map((item, index) => (
                    <MyMenuItem key={index} value={index}>
                      {item}
                    </MyMenuItem>
                  ))}
                </Input>
              </Grid>
            </Grid>
            <Box className={'list'}>
              {list.map((item, index) => (
                <Box onClick={() => handleItemClick(item)} className={'item ' + (item.id === data.id ? 'active' : '')}>
                  <p className={'title'}>
                    <span>
                      <SvgIcon svgName="well_lid_type_icon1"></SvgIcon>
                      <span
                        style={{
                          marginLeft: '10px',
                        }}
                      >
                        {item.title}
                      </span>
                    </span>
                    <p
                      className={
                        'tigs ' + (item.state === 1 ? 'tigs_green' : item.state === 2 ? 'tigs_yellow' : 'tigs_red')
                      }
                    >
                      {item.state === 1 ? '在线' : item.state === 2 ? '漫水预警' : '离线'}
                    </p>
                  </p>
                  <p className={'time'}>
                    <SvgIcon svgName="place"></SvgIcon>
                    <span
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      {item.place}
                    </span>
                  </p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      <Fade in={visible && place === 2}>
        <Box className={'rightBox rightBox_wellLid'}>
          <Box className="title_bar">
            <div className="title_info">
              <span className="title">{data.title}</span>{' '}
              <p
                className={'tigs ' + (data.state === 1 ? 'tigs_green' : data.state === 2 ? 'tigs_yellow' : 'tigs_red')}
              >
                {data.state === 1 ? '在线' : data.state === 2 ? '漫水预警' : '离线'}
              </p>
            </div>
            {/* <SvgIcon
              svgName="closeX"
              svgClass="closeX"
              onClick={() => {
                setVisible(false)
              }}
            ></SvgIcon> */}
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
