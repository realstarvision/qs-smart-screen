import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { store } from '@/store'
import { Provider } from 'react-redux'
import Theme from './Theme'
import '@/i18n/config'
import 'virtual:svg-icons-register'
import './assets/index.css'
import './assets/styles/date.scss'
import './assets/styles/tailwind.css'
import '@/utils/flexible.js'

let theme = responsiveFontSizes(Theme)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
)
