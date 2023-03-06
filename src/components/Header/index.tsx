import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Typography, Box, AppBar } from '@mui/material'
import { barHeight } from '@/config'
import './header.scss'

// 图片
import headerBgImg from '@/assets/image/header/background.png'
import projectNameImg from '@/assets/image/header/project_name.png'
import headerLeft from '@/assets/image/header/header_left.png'
import headerCenter from '@/assets/image/header/header_center.png'
import headerRight from '@/assets/image/header/header_right.png'

export const DrawerHeader = styled('div')(({ theme }) => ({
  height: barHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

export default function Header({ place }) {
  return (
    <Box
      className="header"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Box className="bar">
        <img src={place === 0 ? headerLeft : place === 1 ? headerCenter : headerRight}></img>
        {place === 1 && (
          <Box className="font-box">
            <Box className="title-box">
              <span className="title">乔司街道智慧护民保障平台</span>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
