import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
// import LoadingBtn from '@mui/lab/LoadingButton'

const MyButton = styled(Button)({
  // background: '#AEBDD8',
  borderRadius: '3px',
  fontSize: '14px',
  // fontWeight: 300,
  color: '#fff',
  padding: '8px',
  height: '30px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '&:hover': {
    // background: 'linear-gradient(180deg, #AEBDD8 0%, #7E98C8 85%, #8499BF 100%)',
    // boxShadow: '0px 0px 8px 0px rgba(26,28,37,0.5000)',
    // borderColor: 'transparent',
    opacity: 0.8,
  },
  '&:active': {
    // background: '#AEBDD8',
    // boxShadow: '0px 0px 8px 0px rgba(26,28,37,0.5000)',
    // opacity: 0.8,
  },
})

// export const LoadingButton = styled(LoadingBtn)({
//   borderRadius: '3px',
//   fontSize: '14px',
//   // fontWeight: 300,
//   color: '#fff',
//   padding: '8px',
//   height: '30px',
//   overflow: 'hidden',
//   whiteSpace: 'nowrap',
//   '&:hover': {
//     // background: '#2E6EDF',
//     opacity: 0.8,
//   },
// })

export default MyButton
