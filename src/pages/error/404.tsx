import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Button from '@/components/Button'
function error404() {
  let navigate = useNavigate()

  let handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#fff',
              fontSize: '48px',
            }}
          >
            页面不存在!
          </Typography>
          <Button
            onClick={handleClick}
            sx={{
              mt: '20px',
            }}
          >
            返回首页
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default error404
