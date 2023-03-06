/**
 * 防抖
 * @param {function} fn 
 * @param {number} delay 
 */
export function debounce(fn: any, delay = 500,) {
  let timer: NodeJS.Timeout | null | undefined = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      // fn.apply(this, arguments)
      clearTimeout(timer as NodeJS.Timeout)
    }, delay)
  }
}


/* 
*数组对象去重
*
*/

export function repetition(data: any[]) {

  let obj: any = {};
  let peon = data.reduce((cur, next) => {
    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
    return cur
  }, []) //设置cur默认类型为数组，并且初始值为空的数组

  return peon
}