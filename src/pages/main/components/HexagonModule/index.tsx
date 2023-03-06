import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import s from './style.module.scss'
import SvgIcon from '@/components/SvgIcon'

import danger_level_bg from '@/assets/image/png/danger_level_bg.png'

interface List {
  label: string
  type: string
  img: string
  checkImg: string
  value: string | number
}

let colorList = ['#CDA103', '#0BCD03', '#C60406']

export default function index({ list, onOpen, open }: { list: Array<List>; onOpen?: Function; open?: any }) {
  const handleOpen = (item, type) => {
    onOpen(item, type)
  }

  return (
    <Box className={s.container}>
      <img src={danger_level_bg} className={s.danger_level_img_bg} />
      {list.map((item, index) => (
        <Hexagon
          className={item.type === 'danger' ? s.danger : item.type === 'steady' ? s.steady : s.fluctuate}
          open={open ? open[item.type] : false}
          onOpen={() => handleOpen(item, item.type)}
          item={item}
          value={item.value}
          label={item.label}
          color={item.type === 'danger' ? colorList[2] : item.type === 'steady' ? colorList[1] : colorList[0]}
        />
      ))}
    </Box>
  )
}

/* 六边形 */
function Hexagon({ className, onOpen, open, item, value, label, color }) {
  const handleOpen = () => {
    onOpen()
  }
  return (
    <>
      <div className={s.honeycomb_icon + ' ' + className} onClick={() => handleOpen()}>
        <img src={open ? item.checkImg : item.img} />
        {/* <SvgIcon svgName="red-nor" svgClass={s.svg}></SvgIcon> */}
        <span
          style={{
            color: color,
            opacity: open ? 0.9 : 0.6,
          }}
          className={s.label}
        >
          {label}
        </span>
        <span
          style={{
            opacity: open ? 0.9 : 0.6,
          }}
          className={s.value}
        >
          {value}
        </span>
      </div>
    </>
  )
}
