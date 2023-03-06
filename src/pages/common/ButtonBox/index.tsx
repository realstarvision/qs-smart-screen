import React from 'react'
import './style.scss'

export default function index({ className, onClick }) {
  const handleClick = () => {
    onClick()
  }
  return <div onClick={handleClick} className={'button_box-constainer ' + className}></div>
}
