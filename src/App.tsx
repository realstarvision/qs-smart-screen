import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useParams, useRoutes, useNavigate } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import router, { whiteList } from './router'
import { getToken, getUserInfo } from '@/utils/auth'
import './App.scss'

function App() {
  let location = useLocation()
  let navigate = useNavigate()
  // 路由守卫
  // useEffect(() => {
  //   if (getToken() && getUserInfo()) {
  //     if (location.pathname === '/login') {
  //       navigate('/')
  //     }
  //   } else {
  //     if (!whiteList.includes(location.pathname)) {
  //       navigate('/login')
  //     }
  //   }
  // }, [location.pathname])

  // useEffect(() => {
  //   let filterMenuDTOS = getUserInfo().filterMenuDTOS
  //   if (filterMenuDTOS) {
  //     setRouters([...routers, ...filterMenuDTOS])
  //   }
  // }, [getUserInfo()])

  return <Box className="app">{useRoutes(router)}</Box>
}

// 判断
// export function RequireAuth({ children, data }: { children: JSX.Element; data: { auth: boolean } }) {
//   let singeRoute = ['/login']
//   let location = useLocation()
//   const componentType = !singeRoute.includes(location.pathname) ? <Layout>{children}</Layout> : children
//   if (getToken()) {
//     if (location.pathname === '/login') {
//       return <Navigate to="/" state={{ from: location }} replace />
//     } else {
//       return componentType
//     }
//   } else {
//     if (!data.auth) {
//       return componentType
//     } else {
//       return <Navigate to="/login" state={{ from: location }} replace />
//     }
//   }
// }

export default App
