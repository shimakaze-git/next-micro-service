
import type { NextPage } from 'next'

// import nookies from "nookies";
import Router, { useRouter } from "next/router"

const Dashboard: NextPage<{ email: string }> = ({ email }) => {
  const router = useRouter()

  const onLogout = async () => {
    // ログインページへ遷移させる
    router.push("/login")
  }

  return (
    <div>
      <h1>Dashboard Pages</h1>
      <h2>email: {email}</h2>

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

Dashboard.getInitialProps = async ({ req, res }) => {
  const isServerSide = typeof window === "undefined"

  // バックエンドのみで動かす
  if (isServerSide && req && res) {
    const root = "http://localhost:3300"
    const options = {
      headers: {
        cookie: req.headers.cookie || ""
      }
    }

    const result = await fetch(
      `${root}/api/me`,
      options
    )
    const json = (await result.json()) as { user?: { email: string } }

    // 認証情報が無ければログイン画面へリダイレクト
    if (!json.user) {
      res.writeHead(
        302, {
          Location: "/login"
        }
      )
      res.end()
    }

    return {
      email: (json.user || {}).email || ""
    }
  }

  // フロントエンドのみで動かす
  if (!isServerSide) {
    // 認証情報を取得する
    const result = await fetch("/api/me")
    const json = (await result.json()) as { user?: { email: string } }

    // 認証情報が無ければログイン画面へリダイレクトさせる
    if (!json.user) Router.push("/login")

    return { email: (json.user || {}).email || "" }
  }

  return {
    email: ""
  }
}

export default Dashboard
