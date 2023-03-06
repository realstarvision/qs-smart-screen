import React, { useEffect, useState } from 'react'
import { Box, Fade, Grid, FormLabel, MenuItem } from '@mui/material'
import Input from '@/components/Input'
import MyMenuItem from '@/components/MenuItem'
import { keyArea } from '@/components/Map/json'
import SvgIcon from '@/components/SvgIcon'
import Title from '@/pages/common/ModuleTitle'
// 图片
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
    </>
  )
}
