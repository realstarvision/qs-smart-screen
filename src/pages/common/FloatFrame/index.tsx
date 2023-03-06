import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import './style.scss'

export default function index({ children, style }: { children: ReactNode; style?: object }) {
  return (
    // <Box className="float_frame-box">
    <Box className="float_frame-container" style={style}>
      {children}
      {/* </Box> */}
    </Box>
  )
}
