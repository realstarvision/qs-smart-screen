;(function flexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 120 // 这里默认是10等份，手动改为24，此时1rem=1920/24px即80px。（设计稿是1920px的）
    if (rem < 10) {
      rem = 10
    }
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)

// ;(function (win) {
//   // 基准大小
//   // const baseSize = 24
//   // 设置 rem 函数
//   // function setRem() {
//   //   // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
//   //   const scale = document.documentElement.clientWidth>1024? document.documentElement.clientWidth / 1920 : (1024 /1920)
//   //   // 设置页面根节点字体大小
//   //   if (document.documentElement.clientWidth > 1024) {
//   //     document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
//   //   }
//   // }

//   function setRem() {
//     var rem = document.documentElement.clientWidth / 120 // 这里默认是10等份，手动改为24，此时1rem=1920/24px即80px。（设计稿是1920px的）
//     if (rem < 10) {
//       rem = 10
//     }
//     document.documentElement.style.fontSize = rem + 'px'
//   }

//   // 初始化
//   setRem()
//   // 改变窗口大小时重新设置 rem
//   win.onresize = function () {
//     setRem()
//   }
// })(window)
