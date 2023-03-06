import React, { useState } from 'react'
import { Box } from '@mui/material'
import SvgIcon from '@/components/SvgIcon'
import circle from '@/assets/image/time_bar/circle.png'
import circle_checked from '@/assets/image/time_bar/circle_checked.png'
import s from './s.module.scss'

let month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

export default function index({ dataIndex, onClick }) {
  let [active, setActive] = useState(dataIndex || 0)
  const handleCircleClick = async (index) => {
    await onClick(index)
    setActive(index)
  }
  return (
    <Box className={s.TimeBarContainer}>
      <SvgIcon svgName="line" svgClass={s.line}></SvgIcon>
      {month.map((item, index) => (
        <div className={s.month}>
          {/* <SvgIcon svgName="circle_checked"></SvgIcon> */}
          <img
            src={active === index ? circle_checked : circle}
            className={active === index ? s.animation : ''}
            onClick={() => handleCircleClick(index)}
          />
          <p
            style={{
              color: active === index ? '#FFBC0C' : '#fff',
            }}
          >
            {item}
          </p>
        </div>
      ))}
    </Box>
  )
}
