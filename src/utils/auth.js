import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setLocalStorageAndTime (key, value) {
  window.localStorage.setItem(key, JSON.stringify({ data: value, time: new Date().getTime() }))
}