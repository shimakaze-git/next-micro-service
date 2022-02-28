// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from "nookies"

import { firebaseAdmin } from "../../firebaseAdmin"

export const sessionApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(404).send("Not Found")

  const auth = firebaseAdmin.auth()
  // console.log("auth", auth)

  // Tokenの有効期限
  // 5日
  const expiresIn = 60 * 60 * 24 * 5 * 1000

  // セッションCookieを作成するためのIDを取得
  const id = (JSON.parse(req.body).id || "").toString()

  // Cookieに保存するセッションIDを作成する
  const sessionCookie = await auth.createSessionCookie(
    id,
    { expiresIn }
  )

  // Cookieのオプション
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    // secure: true,
    path: "/",
  }

  // セッションIDをCookieに設定する
  setCookie(
    { res },
    "session",
    sessionCookie, 
    options
  )

  res.send(
    JSON.stringify({
      status: "success"
    })
  )
}

export default sessionApi
