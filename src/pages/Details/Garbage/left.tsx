import React, { useEffect, useState, useRef } from 'react'
import { Box, Fade, Grid, FormLabel, MenuItem } from '@mui/material'
import Input from '@/components/Input'
import MyMenuItem from '@/components/MenuItem'
import SvgIcon from '@/components/SvgIcon'
import Title from '@/pages/common/ModuleTitle'
import { keyArea } from '@/components/Map/json'
import { garbageSorting } from '@/components/Map/json'
import './style.scss'
import '../common.scss'

// 图片
// import rectangle from '@/assets/image/map/rectangle.png'
import back_btn from '@/assets/image/test/back_btn.png'

export default function index({ onBack, garbageId, onItemClick }) {
  let deviceState = ['全部', '在线', '离线']
  // 显示状态
  let [visible, setVisible] = useState(true)
  // 列表
  const [list, setList] = useState([...garbageSorting])
  // 数据
  let [data, setData] = useState({
    id: 0,
    code: '',
    state: '',
    coordinates: [],
    address: '',
    video: '',
  })
  // 参数
  const [formParams, setFormParams] = useState({
    state: '全部',
  })

  useEffect(() => {
    let itemData: any = garbageSorting.find((item) => {
      return item.id === garbageId
    })
    Object.keys(data).forEach((item) => {
      data[item] = itemData[item]
    })
    setData({ ...data })
  }, [garbageId])

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
    console.log(e)
    formParams[type] = e.target.value
    setFormParams({ ...formParams })
    let newList = []
    if (formParams.state !== '全部') {
      newList = [...garbageSorting].filter((item) => {
        console.log(item)
        if (item.state === formParams.state) {
          return item
        }
      })
    } else {
      newList = [...garbageSorting]
    }
    setList([...newList])
  }
  return (
    <>
      <Box className={'leftBox leftBox_wellLid'}>
        <Box className={'left'}>
          <Title
            title="垃圾桶设备列表"
            style={{
              marginBottom: '20px',
            }}
          ></Title>
          <Grid container spacing={{ xs: 1 }} className="from">
            <Grid item xs={6} className="from-item" display={'flex'} alignItems={'center'}>
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
                  <MyMenuItem key={index} value={item}>
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
                    <SvgIcon svgName="garbage"></SvgIcon>
                    <span
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      {item.code}
                    </span>
                  </span>
                  <p
                    className={
                      'tigs ' +
                      (item.state === '在线' ? 'tigs_green' : item.state === '离线' ? 'tigs_red' : 'tigs_yellow')
                    }
                  >
                    {item.state}
                  </p>
                </p>
                <p className={'time'}>
                  <SvgIcon svgName="place"></SvgIcon>
                  <span
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    {item.address}
                  </span>
                </p>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Fade in={visible}>
        <Box className={'rightBox rightBox_wellLid'}>
          <Box className="title_bar">
            <div className="title_info">
              <span className="title">{data.code}</span>
              <p
                className={
                  'tigs ' + (data.state === '在线' ? 'tigs_green' : data.state === '离线' ? 'tigs_red' : 'tigs_yellow')
                }
              >
                {data.state}
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
          <p className="mt font">地址：{data.address}</p>
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
          <p className="mt font">视频监控</p>

          <video
            key={data.id}
            className="mt-10"
            autoPlay={true}
            loop
            controls
            style={{
              width: '100%',
            }}
            src={data.video}
          >
            {/* <source src={data.video} type="video/mp4"></source> */}
          </video>
        </Box>
      </Fade>

      <img src={back_btn} className="back_btn" onClick={handleBack} />
    </>
  )
}
