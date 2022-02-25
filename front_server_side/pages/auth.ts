import { setCookie, destroyCookie, parseCookies } from 'nookies'
import type { NextPage, NextPageContext } from 'next'

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
