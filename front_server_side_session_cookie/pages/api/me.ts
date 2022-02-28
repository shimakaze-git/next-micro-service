// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, destroyCookie } from "nookies"

import { firebaseAdmin } from "../../firebaseAdmin"

export const me = async (req: NextApiRequest, res: NextApiResponse) => {
  // Cookieに保存されているセッションIDを取得
  const sessionId = parseCookies({ req }).session || ""

  if (req.method !== "GET") return res.status(404).send("Not Found")

  if (!sessionId) return res.json({})

  const auth = firebaseAdmin.auth()

  // セッションIDから認証情報を取得する
  const user = await auth
    .verifySessionCookie(sessionId)
    .catch(() => null)

  res.json(
    user ? {
      user: {
        email: user.email
      }
    } : {}
  )
}

export default me
