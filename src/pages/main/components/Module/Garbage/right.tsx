import React, { useRef, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Title from '@/pages/common/ModuleTitle'
import Table from '@/components/Table'
import Echarts from '@/components/Echarts'
import HexagonModule from '../../HexagonModule'
// import EventCount from '../../EventCount'
import chartsAnimation from '@/utils/chartsAnimation'
import AnnouncementDialog from '@/pages/Dialog/AnnouncementDialog'
import { doubleBarOption, triangleOption } from '../echartOption'
import { announcementColumns, announcementListData, deviceListColumns, garbageSorting } from './json'
import './style.scss'

// 图片
import danger from '@/assets/image/png/hexagon/danger.png'
import steady from '@/assets/image/png/hexagon/steady.png'
import dangerChecked from '@/assets/image/png/hexagon/danger_checked.png'
import steadyChecked from '@/assets/image/png/hexagon/steady_checked.png'

let hexagonList = [
  {
    type: 'danger',
    label: '离线',
    img: danger,
    checkImg: dangerChecked,
    value: '18',
  },
  {
    type: 'steady',
    label: '正常',
    img: steady,
    checkImg: steadyChecked,
    value: '472',
  },
]

// 数据
let xLabel = ['新建社区', '乔司社区', 'aa社区', 'bb社区', 'cc社区', 'dd社区']
let yData = [14, 19, 11, 12, 10, 18]

let garbagePointTimer = null

export default function index() {
  const announcementDialogRef = useRef(null)
  const garbagePointRef = useRef(null)

  useEffect(() => {
    if (garbagePointRef.current) {
      setTimeout(() => {
        garbagePointTimer = chartsAnimation(garbagePointRef.current, garbagePointTimer, xLabel.length - 1)
      }, 0)
    }
  }, [garbagePointRef.current])

  // 初始化
  useEffect(() => {
    return function () {
      clearInterval(garbagePointTimer)
      garbagePointTimer = null
    }
  }, [])

  // 图表鼠标移入移出事件
  const handleMouse = (action) => {
    if (action === 'enter') {
      if (garbagePointTimer) {
        clearInterval(garbagePointTimer)
        garbagePointTimer = null
      }
    } else if (action === 'leave') {
      garbagePointTimer = chartsAnimation(garbagePointRef.current, garbagePointTimer, xLabel.length - 1)
    }
  }

  /* 表格行点击事件 */
  const handleRowClick = (row) => {
    announcementDialogRef.current.handleSetData(row)
  }
  return (
    <Box className="garbage_sorting">
      <Grid container spacing={6} className="mt-50">
        <Grid xs={6} item className="table_box">
          <Title size="normal" style={{ marginBottom: '15px' }} title="公告信息" />
          <Table
            onRowClick={handleRowClick}
            columns={announcementColumns}
            data={announcementListData}
            className="announcement_table"
          />
        </Grid>
        <Grid xs={6} item className="garbage_classification_point">
          <Title size="normal" title="垃圾站点位" />
          <Echarts
            onMouseEnter={() => handleMouse('enter')}
            onMouseLeave={() => handleMouse('leave')}
            options={triangleOption(xLabel, yData, '垃圾站点位数量（个）')}
          ></Echarts>
        </Grid>
      </Grid>
      <Grid container spacing={6} className="event_processing_garbageSorting mt-20">
        <Grid xs={6} item className="pt-32">
          <Title size="normal" title="设备监测" />
          <HexagonModule list={hexagonList}></HexagonModule>
        </Grid>
        <Grid xs={6} item className="pt-32">
          <Title title="设备列表" style={{ marginBottom: '15px' }} size="normal" />
          <Table
            columns={deviceListColumns}
            data={garbageSorting}
            className="deviceList_table"
            // onRowClick={handleDeviceRowClick}
          ></Table>
        </Grid>
      </Grid>

      {/* 弹出框 */}
      <AnnouncementDialog ref={announcementDialogRef}></AnnouncementDialog>
    </Box>
  )
}
