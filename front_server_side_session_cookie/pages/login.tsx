import type { FormEvent } from "react";

import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import { login } from "../auth"

const Login: NextPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (event: FormEvent) => {
    // デフォルトの<form />の挙動を無効
    event.preventDefault()

    // email・passwordを使ってログイン
    await login(email, password)

    // ダッシュボードページへ遷移させる
    router.push("/dashboard")
  }

  return (
    <div>
      <h1>ログイン画面</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )    
}

export default Login
