import React from 'react'
import { Box } from '@mui/material'
import s from './s.module.scss'

// 沉降标签切换菜单
export default function index({ list, mapTabActive, onChange }) {
  const handleMapTabClick = (index) => {
    if (mapTabActive !== index) {
      onChange(index)
    }
  }
  return (
    <Box className={s.cumulative_settlement_volume}>
      <Box className={s.map_tabs}>
        {list.map((tab, index) => (
          <Box className={s.tab} onClick={() => handleMapTabClick(index)} key={index}>
            <img src={mapTabActive === index ? tab.activeName : tab.name} className={s.bg}></img>
            <span
              style={{
                color: mapTabActive === index ? '#eee' : '#7DA9D0',
              }}
            >
              {tab.label}
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
