import React, { useState } from 'react'
import { Box } from '@mui/material'
import Button from '@/components/Button'
import s from './s.module.scss'

export default function Place({ onConfirm }) {
  let placeList = ['左', '中', '右']
  // 当前选择
  const [active, setActive] = useState(1)

  /* 当前场景选择切换事件 */
  const handleActiveClick = (index) => {
    setActive(index)
  }

  /* 确认按钮 */
  const handleConfirm = () => {
    onConfirm(active)
  }
  return (
    <Box className={s.placeContainer}>
      <Box className={s.placeWrapper}>
        <Box className={s.title}>请确认视口位置</Box>
        <Box className={s.selectAcre}>
          {placeList.map((item, index) => {
            return (
              <div
                onClick={() => handleActiveClick(index)}
                className={s.item}
                style={{
                  background: active === index ? '#226AF5' : 'transparent',
                  color: active === index ? '#fff' : '#999999',
                  borderWidth: active === index ? '0' : '1px',
                }}
              >
                {item}
              </div>
            )
          })}
        </Box>
        <Box className={s.bntBox}>
          <Button className={s.single_screen}>单屏版本</Button>
          <Button className={s.btn} onClick={handleConfirm}>
            确认
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
