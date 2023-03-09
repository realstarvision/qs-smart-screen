import React, { useRef, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Title from '@/pages/common/ModuleTitle'
import Table from '@/components/Table'
import Echarts from '@/components/Echarts'
import AnnouncementDialog from '@/pages/Dialog/AnnouncementDialog'
import EventSinkingDialog from '@/pages/Dialog/EventSinkingDialog'
import EventCount from '../../EventCount'
import { doubleBarOption } from '../echartOption'
import { announcementColumns, announcementListData, eventProcessingColumns, eventProcessingListData } from './json'
import chartsAnimation from '@/utils/chartsAnimation'
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

  useEffect(() => {
    if (eventProcessingWaterloggingRef.current) {
      setTimeout(() => {
        interValWaterloggingTimer = chartsAnimation(eventProcessingWaterloggingRef.current, interValWaterloggingTimer)
      }, 0)
    }
  }, [eventProcessingWaterloggingRef.current])

  // 初始化
  useEffect(() => {
    return function () {
      clearInterval(interValWaterloggingTimer)
      interValWaterloggingTimer = null
    }
  }, [])

  // 事件处理统计图表鼠标移入移出事件
  const handleMouse = (type) => {
    if (type === 'enter') {
      if (interValWaterloggingTimer) {
        clearInterval(interValWaterloggingTimer)
        interValWaterloggingTimer = null
      }
    } else if (type === 'leave') {
      interValWaterloggingTimer = chartsAnimation(eventProcessingWaterloggingRef.current, interValWaterloggingTimer)
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
