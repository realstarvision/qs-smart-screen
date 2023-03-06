import React from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const Input = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '0.6rem',
    fontWeight: 300,
    color: '#fbfbfb',
    width: '100%',
    background: '#023E86',
    borderRadius: '2px',
    height: '30px',
    '& .MuiSelect-icon': {
      // fontSize: '1rem',
    },
    '& fieldset': {
      border: 'none',
      // background: '#023E86',
      borderRadius: '2px',
      // opacity: '0.6',
    },
  },

  // '& .MuiPaper-root': {
  //   background: '#023E86',
  //   '& .MuiMenu-list': {
  //     height: '200px !important',
  //   },
  // },
})

export default Input
