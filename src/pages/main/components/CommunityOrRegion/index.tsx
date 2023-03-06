import React from 'react'
import eye_hidden from '@/assets/image/button/eye_hidden.png'
import eye_visible from '@/assets/image/button/eye_visible.png'
import s from './s.module.scss'

let list = ['社区范围', '管理区域']

export default function index({ visible, setVisible }) {
  function handleClick(index) {
    if (index === 0) {
      visible.community = !visible.community
    } else {
      visible.region = !visible.region
    }
    setVisible({ ...visible })
  }
  return (
    <div className={s.container}>
      {list.map((item, index) => (
        <EyeBtn
          label={item}
          visible={index === 0 ? visible.community : visible.region}
          onClick={() => handleClick(index)}
        ></EyeBtn>
      ))}
    </div>
  )
}

function EyeBtn({ label, visible, onClick }) {
  function handleClick() {
    onClick()
  }
  return (
    <div
      style={{
        backgroundImage: `URL(${visible ? eye_visible : eye_hidden})`,
      }}
      className={s.btn}
      onClick={handleClick}
    >
      <span
        style={{
          opacity: visible ? 1 : 0.7,
        }}
      >
        {label}
      </span>
    </div>
  )
}
