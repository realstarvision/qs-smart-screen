import React from 'react'
import { Box } from '@mui/material'
import event_count from '@/assets/image/png/event_count.png'
import s from './s.module.scss'

export default function index({ label1 = '待处理事件总量', label2 = '已处理事件总量', count1 = 0, count2 = 0 }) {
  return (
    <Box className={s.container}>
      <Module label={label1} count={count1} />
      <Module label={label2} count={count2} />
    </Box>
  )
}

// 单个模块
function Module({ label, count, style }: { label: string; count: number; style?: object }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${event_count})`,
        ...style,
      }}
      className={s.module}
    >
      <span className={s.label}>{label}</span>
      <span className={s.count}>{count}</span>
    </Box>
  )
}
