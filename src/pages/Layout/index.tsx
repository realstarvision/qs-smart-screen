import React, { useEffect, useState } from 'react'
import { Box, Fade } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Main from '@/pages/main'
import Button from '@/components/Button'
import Place from './Place'
import { initSocket, closeSocket } from '@/utils/websocket'
import './style.scss'

// 图片
import backrground_left from '@/assets/image/background/background_left.png'
import backrground_center from '@/assets/image/background/background_center.png'
import backrground_right from '@/assets/image/background/background_right.png'

export default function index({ children }: { children?: any }) {
  /* 场景选择：0：左边   1：中间    2：右边 */
  const [place, setPlace] = useState(1)
  const [placeVisible, setPlaceVisible] = useState(true)

  //数据大屏自适应函数
  // const handleScreenAuto = (): void => {
  //   const designDraftWidth = 2780 //设计稿的宽度
  //   const designDraftHeight = 1080 //设计稿的高度
  //   //根据屏幕的变化适配的比例
  //   const scale =
  //     document.documentElement.clientWidth / document.documentElement.clientHeight <
  //     designDraftWidth / designDraftHeight
  //       ? document.documentElement.clientWidth / designDraftWidth
  //       : document.documentElement.clientHeight / designDraftHeight
  //   //缩放比例
  //   ;(document.querySelector('#screen') as any).style.transform = `scale(${scale}) translate(-50%)`
  // }

  // //React的生命周期 如果你是vue可以放到mountd或created中
  // useEffect(() => {
  //   //初始化自适应  ----在刚显示的时候就开始适配一次
  //   handleScreenAuto()
  //   //绑定自适应函数   ---防止浏览器栏变化后不再适配
  //   window.onresize = () => handleScreenAuto()
  //   //退出大屏后自适应消失   ---这是react的组件销毁生命周期，如果你是vue则写在deleted中。最好在退出大屏的时候接触自适应
  //   return () => (window.onresize = null)
  // }, [])

  /* 初始化 */
  useEffect(() => {
    initSocket()
    return () => {
      closeSocket()
    }
  }, [])

  /* 场景确认事件 */
  const handlePlaceConfirm = (active) => {
    setPlace(active)
    setPlaceVisible(false)
  }

  return (
    <Box
      id="screen"
      className="screen"
      style={{
        backgroundImage: `url('${
          place === 0 ? backrground_left : place === 1 ? backrground_center : backrground_right
        }')`,
      }}
    >
      <Header place={place}></Header>
      <Main place={place}></Main>
      {placeVisible && <Place onConfirm={handlePlaceConfirm}></Place>}
    </Box>
  )
}
