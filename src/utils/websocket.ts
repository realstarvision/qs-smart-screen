// 定义全局变量
export let ws = null

// 地址
let url = 'ws://192.168.148.33:8098/star-qiaosi/websocket'

// 初始化webSocket
export function initSocket() {
  if (typeof WebSocket == 'undefined') {
    console.log('您的浏览器不支持WebSocket')
  } else {
    console.log('您的浏览器支持WebSocket')
  }
  ws = new WebSocket(url)
  //打开事件
  ws.onopen = function (e) {
    socketOnOpen(e)
  }
  //关闭事件
  ws.onclose = function (e) {
    socketOnClose(e)
  }
  //发生了错误事件
  ws.onerror = function (e) {
    socketOnError(e)
  }
}

// 连接成功后
export function socketOnOpen(e) {
}

// 发生错误后
export function socketOnError(e) { }

// 接受数据
export function socketOnMessage(callback) {
  setTimeout(() => {
    if (ws) {
      ws.onmessage = function (e) {
        callback(JSON.parse(e.data))
      }
    } else {
      console.log('websocket未连接')
    }
  })

}


// 关闭连接后
export function socketOnClose(e) { }


// 发送数据
export function socketSend(data) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(data))
  } else if (ws.readState === 3) {
    console.log('WebSocket链接已关闭，没有链接成功')
  }
}

// 关闭webSocket
export function closeSocket() {
  if (ws) {
    ws.close()
  }
}


