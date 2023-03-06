import { styled } from '@mui/material/styles'
import { Dialog } from '@mui/material'

const MyDialog = styled(Dialog)({
  position: 'absolute',
  '& .MuiDialog-paper': {
    backgroundColor: 'transparent',
  },
})

export default MyDialog
