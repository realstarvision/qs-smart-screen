import React from 'react'
import { MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'

const MyMenuItem = styled(MenuItem)({
  '&.MuiMenuItem-root': {
    fontSize: '0.8rem',
    background: '#004faf !important',
    '&:hover': {
      background: '#0c4891 !important',
      span: {
        background: 'transparent !important',
      },
    },
    '&.Mui-selected': {
      background: '#012e66 !important',
    },
  },
})

export default MyMenuItem
