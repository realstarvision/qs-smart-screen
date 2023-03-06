import React from 'react'
import { Box } from '@mui/material'
import buttonIcon from '@/assets/image/button/button_icon.png'
import buttonActiveIcon from '@/assets/image/button/button_active_icon.png'
import s from './s.module.scss'

// 内涝切换菜单
export default function index({ onChange, active, list }) {
  // tab事件
  const handleClick = (index) => {
    if (active !== index) {
      onChange(index)
    }
  }
  return (
    <Box className={s.waterlogging_tabs}>
      {list.map((tab, index) => (
        <Box key={index} className={s.tab} onClick={() => handleClick(tab.id)}>
          <img src={tab.id == active ? buttonActiveIcon : buttonIcon} />
          <p style={{ color: tab.id == active ? '#61A8FC' : '#fff' }}>{tab.title}</p>
        </Box>
      ))}
    </Box>
  )
}
