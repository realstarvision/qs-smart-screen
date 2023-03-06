import React, { useEffect, useState } from 'react'
import { Fade } from '@mui/material'
import FloatFrame from '../../common/FloatFrame'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

// 模块组件
import SinkingLeft from './Module/Sinking/left'
import SinkingRight from './Module/Sinking/right'
import WaterloggingLeft from './Module/Waterlogging/left'
import WaterloggingRight from './Module/Waterlogging/right'
import GarbageLeft from './Module/Garbage/left'
import GarbageRight from './Module/Garbage/right'
import 'animate.css'
import '../style.scss'

export default function index({
  active,
  onCheckDetails,
  place,
  mapTabActive,
  menuActive,
}: {
  active: number
  onCheckDetails?: Function
  place: number
  mapTabActive?: number
  menuActive?: number
}) {
  /* 查看详情 */
  const handleCheckDetails = (type) => {
    onCheckDetails(type)
  }

  return (
    <>
      <FloatFrame>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition key={active} timeout={500} classNames="fade-scale">
            {active === 0 ? (
              /* 沉降 */
              place === 0 ? (
                <SinkingLeft mapTabActive={mapTabActive} />
              ) : place === 2 ? (
                <SinkingRight />
              ) : (
                ''
              )
            ) : active === 1 ? (
              /* 水涝 onCheckDetails={handleCheckDetails}*/
              place === 0 ? (
                <WaterloggingLeft />
              ) : place === 2 ? (
                <WaterloggingRight />
              ) : (
                ''
              )
            ) : /* 垃圾 */
            place === 0 ? (
              <GarbageLeft />
            ) : place === 2 ? (
              <GarbageRight />
            ) : (
              ''
            )}
          </CSSTransition>
        </SwitchTransition>
      </FloatFrame>

      {/* ))} */}
    </>
  )
}
