/* 手机验证 */
export function phoneVerify(value) {
  let rex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value) {
    return rex.test(value)
  }
  return true
}

/* 邮件 */

export function emailVerify(value) {
  let rex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
  if (value) {
    return rex.test(value)
  }
  return true
}