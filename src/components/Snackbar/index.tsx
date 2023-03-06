import { Snackbar, Box } from '@mui/material'
// import error from '@/assets/image/png/error.png'
import './style.scss'

function Index({
  open,
  onClose,
  message,
  icon,
  background,
  color,
  duration,
}: {
  open: boolean
  onClose: Function
  message: string
  icon?: string
  background?: string
  color?: string
  duration?: number
}) {
  const handleClose = () => {
    onClose()
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={duration || 3000}
      sx={{ padding: '0 20px' }}
    >
      <Box
        className="snackbar"
        sx={{
          background: background || '',
          color: color || '',
        }}
      >
        <img src={icon} />
        <span> {message}</span>
      </Box>
    </Snackbar>
  )
}

export default Index
