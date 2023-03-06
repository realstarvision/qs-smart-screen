import React, { useRef, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Title from '@/pages/common/ModuleTitle'
import Table from '@/components/Table'
import Echarts from '@/components/Echarts'
import AnnouncementDialog from '@/pages/Dialog/AnnouncementDialog'
import EventSinkingDialog from '@/pages/Dialog/EventSinkingDialog'
import EventCount from '../../EventCount'
// import { eventProcessingChart } from '@/utils/chartsAnimation'
import { doubleBarOption } from '../echartOption'
import { announcementColumns, announcementListData, eventProcessingColumns, eventProcessingListData } from './json'
import './style.scss'

// 定时器
let interValWaterloggingTimer = null

export default function index() {
  const announcementDialogRef = useRef(null)
  const eventSinkingDialogRef = useRef(null)
  const eventProcessingWaterloggingRef = useRef(null)

  /* 表格行点击事件 */
  const handleRowClick = (row, type) => {
    if (type === 'announcement') {
      announcementDialogRef.current.handleSetData(row)
    } else {
      eventSinkingDialogRef.current.handleSetData(row)
    }
  }

  // 初始化
  useEffect(() => {
    setTimeout(() => {
      interValWaterloggingTimer = eventProcessingChart()
    }, 0)

    return function () {
      clearInterval(interValWaterloggingTimer)
      interValWaterloggingTimer = null
    }
  }, [])

  // 定时器滚动事件
  function eventProcessingChart() {
    if (interValWaterloggingTimer) {
      clearInterval(interValWaterloggingTimer)
    }
    // 定时器
    return setInterval(function () {
      // 每次向后滚动一个，最后一个从头开始。
      let option = eventProcessingWaterloggingRef.current.myChart.getModel().option
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
      eventProcessingWaterloggingRef.current.setOption({
        dataZoom: [obj],
      })
    }, 3500)
  }

  // 事件处理统计图表鼠标移入移出事件
  const handleMouse = (type) => {
    if (type === 'enter') {
      if (interValWaterloggingTimer) {
        clearInterval(interValWaterloggingTimer)
        interValWaterloggingTimer = null
      }
    } else if (type === 'leave') {
      interValWaterloggingTimer = eventProcessingChart()
    }
  }
  return (
    <Box className="waterlogging">
      <Grid container spacing={6} className="mt-50">
        <Grid xs={6} item>
          <div className="table_box">
            <Title size={'normal'} style={{ marginBottom: '15px' }} title="公告信息" />
            <Table
              onRowClick={(row) => handleRowClick(row, 'announcement')}
              columns={announcementColumns}
              data={announcementListData}
              className="announcement_table"
            />
          </div>
          <div className="event_processing_waterlogging">
            <Title size={'normal'} title="事件处理统计" />
            <EventCount />
            <Echarts
              options={doubleBarOption()}
              ref={eventProcessingWaterloggingRef}
              onMouseEnter={() => handleMouse('enter')}
              onMouseLeave={() => handleMouse('leave')}
            ></Echarts>
          </div>
        </Grid>
        <Grid xs={6} item className="table_box">
          <Title size={'normal'} style={{ marginBottom: '15px' }} title="事件处理情况" />
          <Table
            columns={eventProcessingColumns}
            data={eventProcessingListData}
            className="eventProcessing_table"
            onRowClick={(row) => handleRowClick(row, 'event')}
          />
        </Grid>
      </Grid>
      {/* 公告信息弹出框 */}
      <AnnouncementDialog ref={announcementDialogRef}></AnnouncementDialog>

      {/* 事件处理弹出框 */}
      <EventSinkingDialog ref={eventSinkingDialogRef}></EventSinkingDialog>
    </Box>
  )
}
