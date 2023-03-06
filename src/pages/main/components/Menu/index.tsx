import React, { useRef } from 'react'
import { Box } from '@mui/material'
import './style.scss'

// 图片
import safetyImage from '@/assets/image/tabs/safety.png'
import safetyActiveImage from '@/assets/image/tabs/safety_active.png'
import garbagesortingImage from '@/assets/image/tabs/garbagesorting.png'
import garbagesortingActiveImage from '@/assets/image/tabs/garbagesorting_active.png'
import waterloggingImage from '@/assets/image/tabs/waterlogging.png'
import waterloggingActiveImage from '@/assets/image/tabs/waterlogging_active.png'

// 菜单列表
let menuList = [
  [safetyImage, safetyActiveImage],
  [waterloggingImage, waterloggingActiveImage],
  [garbagesortingImage, garbagesortingActiveImage],
]

interface Menu {
  active: number
  onMenuClick?: Function
  style?: Object
}

export default function index({ active, onMenuClick, style }: Menu) {
  const imgRef = useRef([])
  /* 标签单击事件 */
  const handleMenuClick = (index) => {
    if (index !== active) {
      imgRef.current[index].classList.add('menu_animation')
      setTimeout(() => {
        imgRef.current[index].classList.remove('menu_animation')
      }, 300)
    }
    onMenuClick(index)
  }

  /* 循环ref */
  function getRef(dom) {
    imgRef.current.push(dom)
  }
  return (
    <Box className="menu-container" style={style}>
      {menuList.map((menu, index) => (
        <Box className={'menuItem'}>
          <img ref={getRef} src={active === index ? menu[1] : menu[0]} onClick={() => handleMenuClick(index)}></img>
        </Box>
      ))}
    </Box>
  )
}
