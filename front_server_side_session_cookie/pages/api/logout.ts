// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, destroyCookie } from "nookies"

import { firebaseAdmin } from "../../firebaseAdmin"

export const sessionLogoutApi = async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.method !== "POST") return res.status(404).send("Not Found")

  const auth = firebaseAdmin.auth()

  // Cookieに保存されているセッションIDを取得
  const sessionId = parseCookies({ req }).session || ""

  // セッションIDから認証情報を取得する
  const decodedClaims = await auth
    .verifySessionCookie(sessionId)
    .catch(() => null)

  // console.log("sessionId", sessionId)
  // console.log("decodedClaims", decodedClaims)

  // 全てのセッションを無効にする
  if (decodedClaims) {
    console.log("decodedClaims.sub", decodedClaims.sub)

    await auth.revokeRefreshTokens(
      decodedClaims.sub
    )
  }

  // Cookieに保存されているセッションIDを削除
  destroyCookie(
    { res },
    "session",
    { path: "/" }
  )

  res.send(
    JSON.stringify({
      status: "success",
      claim: decodedClaims
    })
  )
}

export default sessionLogoutApi
