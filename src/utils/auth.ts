import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userInfo = 'User-Info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  console.log(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  const info = Cookies.get(userInfo)
  return info ? JSON.parse(info as string) : ''
}

export function setUserInfo(info: { avatarUrl: string, nick: string }) {
  const user = JSON.stringify(info)
  return Cookies.set(userInfo, user)
}

export function removeUserInfo() {
  return Cookies.remove(userInfo)
}
