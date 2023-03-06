import React from 'react'
import './svg.scss'

interface Props {
  svgClass?: string
  svgName: string
  onClick?: Function
  style?: object
}

const SvgIcon = (props: Props) => {
  const handleClick = () => {
    props.onClick()
  }
  return (
    <svg
      className={props.svgClass + ' svg'}
      aria-hidden="true"
      v-on="$listeners"
      onClick={handleClick}
      style={props.style}
    >
      <use xlinkHref={'#icon-' + props.svgName} />
    </svg>
  )
}
export default SvgIcon
