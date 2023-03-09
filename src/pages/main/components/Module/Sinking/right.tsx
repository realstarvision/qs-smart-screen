import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid } from '@mui/material'
import Table from '@/components/Table'
import Title from '@/pages/common/ModuleTitle'
import Echarts from '@/components/Echarts'
import AnnouncementDialog from '@/pages/Dialog/AnnouncementDialog'
import EventSinkingDialog from '@/pages/Dialog/EventSinkingDialog'
import EventCount from '../../EventCount'
// import { eventProcessingChart } from '@/utils/chartsAnimation'
import { doubleBarOption } from '../echartOption'
import chartsAnimation from '@/utils/chartsAnimation'
import { announcementColumns, announcementListData, eventProcessingColumns, eventProcessingListData } from './json'

// 定时器
let interValSafetyTimer = null

export default function index() {
  const announcementDialogRef = useRef(null)
  const eventSinkingDialogRef = useRef(null)
  const eventProcessingSafetyRef = useRef(null)

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
      interValSafetyTimer = chartsAnimation(eventProcessingSafetyRef.current, interValSafetyTimer)
    }, 0)

    return function () {
      clearInterval(interValSafetyTimer)
      interValSafetyTimer = null
    }
  }, [])

  // 事件处理统计图表鼠标移入移出事件
  const handleMouse = (type) => {
    if (type === 'enter') {
      if (interValSafetyTimer) {
        clearInterval(interValSafetyTimer)
        interValSafetyTimer = null
      }
    } else if (type === 'leave') {
      interValSafetyTimer = chartsAnimation(eventProcessingSafetyRef.current, interValSafetyTimer)
    }
  }
  return (
    <div className="sinking">
      <Grid container spacing={6} className="mt-50">
        <Grid xs={6} item>
          <div className="table_box">
            <Title
              size="normal"
              style={{
                marginBottom: '15px',
              }}
              title="公告信息"
            />
            <Table
              columns={announcementColumns}
              data={announcementListData}
              className="announcement_table"
              onRowClick={(row) => handleRowClick(row, 'announcement')}
            ></Table>
          </div>
          <div className="event_processing_safety">
            <Title size="normal" title="事件处理统计" />
            <EventCount />
            <Echarts
              options={doubleBarOption()}
              ref={eventProcessingSafetyRef}
              onMouseEnter={() => handleMouse('enter')}
              onMouseLeave={() => handleMouse('leave')}
            ></Echarts>
          </div>
        </Grid>
        <Grid xs={6} item className="table_box">
          <Title
            size="normal"
            style={{
              marginBottom: '15px',
            }}
            title="事件处理情况"
          />
          <Table
            columns={eventProcessingColumns}
            data={eventProcessingListData}
            className="eventProcessing_table"
            onRowClick={(row) => handleRowClick(row, 'event')}
          ></Table>
        </Grid>
      </Grid>
      {/* <Grid container spacing={6} className="mt-20">
        <Grid xs={6} item></Grid>
      </Grid> */}

      {/* 公告信息弹出框 */}
      <AnnouncementDialog ref={announcementDialogRef}></AnnouncementDialog>

      {/* 事件处理弹出框 */}
      <EventSinkingDialog ref={eventSinkingDialogRef}></EventSinkingDialog>
    </div>
  )
}
