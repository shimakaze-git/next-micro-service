import nookies from 'nookies'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import type { NextPage, NextPageContext } from 'next'
import { firebaseClient } from '../pluguins/firebaseClient'

// cookieの取得
export const getCookies = (ctx: object) => {
  const cookies = nookies.get(ctx)
  return cookies
}

// cookieの削除
// ServerSide cookies
export const destroyCookieToken = (ctx: NextPageContext, token: string) => {
  // console.log("token", token)
  destroyCookie(ctx, 'accessToken')
}

// cookieにtokenをsetする
// ServerSide cookies
export const setCookieToken = (ctx: NextPageContext, token: string) => {
  console.log("token", token)
  setCookie(ctx, 'accessToken', token, {
    maxAge: 30 * 24 * 60 * 60,
    // path: '/',
  })
}

// cookieを抽出する.
export const extractCookie = (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx)
  return cookie
}

// ログイン
export const signin = async (email: string, password: string) => {
  console.log("email", email)
  console.log("password", password)
  await firebaseClient.auth()
    .signInWithEmailAndPassword(email, password).then(user => {
      // ログイン成功
      // ページを移動する、ユーザーの情報を取得して処理を行う、等する
      // user.uid をユーザーIDとして使用する
      console.log("login success")
      console.log("user", user)

      window.location.href = '/'
    }, (err) => {
      // エラーを表示する等
      console.log("login failed", err)
    })
}

// 会員登録
export const signup = (email: string, password: string) => {
  console.log("email", email)
  console.log("password", password)
  firebaseClient.auth()
    .createUserWithEmailAndPassword(email, password).then(user => {
      // user.uid をユーザーIDとして使用する
      console.log("create success")
      console.log("user", user)

      window.location.href = '/'
    }, (err) => {
      // エラーを表示する等
      console.log("login failed", err)
    })
}

// ログアウト
export const signout = () => {
  firebaseClient.auth()
    .signOut().then(user => {
      // user.uid をユーザーIDとして使用する
      console.log("signout success")
      console.log("user", user)
      window.location.href = '/login'
    }, (err) => {
      // エラーを表示する等
      console.log("signout failed", err)
    })
}
