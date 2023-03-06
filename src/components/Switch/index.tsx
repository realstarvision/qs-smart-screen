import * as React from 'react'
import { styled } from '@mui/material/styles'
import Switch, { SwitchProps } from '@mui/material/Switch'

// const IOSSwitch = styled((props: SwitchProps) => (
//   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//   width: '2rem',
//   height: '1rem',
//   padding: 0,
//   '& .MuiSwitch-switchBase': {
//     padding: 0,
//     margin: '0.1rem',
//     transitionDuration: '300ms',
//     '&.Mui-checked': {
//       transform: 'translateX(1rem)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         backgroundColor: theme.palette.mode === 'dark' ? '#0170D2' : '#0170D2',
//         opacity: 1,
//         border: 0,
//       },
//       '&.Mui-disabled + .MuiSwitch-track': {
//         opacity: 0.5,
//       },
//     },
//     '&.Mui-focusVisible .MuiSwitch-thumb': {
//       color: '#0170D2',
//       border: '0.5rem solid #A6D0F4',
//     },
//     '&.Mui-disabled .MuiSwitch-thumb': {
//       color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
//     },
//     '&.Mui-disabled + .MuiSwitch-track': {
//       opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxSizing: 'border-box',
//     width: '0.8rem',
//     height: '0.8rem',
//   },
//   '& .MuiSwitch-track': {
//     // borderRadius: 26 / 2,
//     backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#044D8D',
//     opacity: 1,
//     transition: theme.transitions.create(['background-color'], {
//       duration: 500,
//     }),
//   },
// }))

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#0170D2' : '#0170D2',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#0170D2',
      border: '0.5rem solid #A6D0F4',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#044D8D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

export default IOSSwitch
