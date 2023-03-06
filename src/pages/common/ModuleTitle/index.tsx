import React from 'react'
import title_large_bg from '@/assets/image/title_bg/title_large.png'
import title_small_bg from '@/assets/image/title_bg/title_small.png'
import title_normal_bg from '@/assets/image/title_bg/title_normal.png'
import title_bg from '@/assets/image/title_bg/title.png'

import s from './s.module.scss'

export default function index({
  size = '',
  title = '',
  style,
  className,
}: {
  size?: string
  title?: string
  style?: object
  className?: string
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${
          size === 'small'
            ? title_small_bg
            : size === 'large'
            ? title_large_bg
            : size === 'normal'
            ? title_normal_bg
            : title_bg
        })`,
        // backgroundSize: '100% 100%',
        ...style,
      }}
      className={s.container + ' ' + className}
    >
      <span>{title}</span>
    </div>
  )
}
