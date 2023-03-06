import { useState } from 'react'
import ReactDOM from 'react-dom'
import Snackbar from '../Snackbar'

// 消息弹出框
export default function index({
  content,
  duration,
  icon,
  background,
}: {
  content: string
  duration?: number
  icon?: string
  background?: string
}) {
  // 创建一个dom
  const dom = document.createElement('div')
  // 定义组件，
  const JSXdom = <MessageEle content={content} duration={duration} icon={icon} background={background}></MessageEle>
  // 渲染DOM
  ReactDOM.render(JSXdom, dom)
  // 置入到body节点下
  document.body.appendChild(dom)
}

function MessageEle({
  content,
  duration,
  icon,
  background,
}: {
  content: string
  duration?: number
  icon?: string
  background?: string
}) {
  // 开关控制：默认true,调用时会直接打开
  const [open, setOpen] = useState(true)
  // 关闭消息提示
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Snackbar
      open={open}
      message={content}
      onClose={handleClose}
      duration={duration}
      icon={icon}
      background={background}
    ></Snackbar>
  )
}
