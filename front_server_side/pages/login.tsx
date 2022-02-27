import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

import { signin, signup, signout } from '../logics/auth'
import { firebaseClient } from '../pluguins/firebaseClient'

// export default (_props: any) => {
const Login: NextPage = (_props: any) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  console.log("_props", _props)

  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}
      />
      <input
        type={'password'}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={'Password'}
      />
      <button
        onClick={async () => {
          await signup(email, pass)
        }}
      >
        FireBase Create account
      </button>
      <button
        onClick={async () => {
          await signin(email, pass)
        }}
      >
        FireBase Log in
      </button>
      <button
        onClick={async () => {
          await signout()
        }}
      >
        FireBase sign out
      </button>

      <hr />

      別ログインボタンを用意予定

      <hr />

      <button
        onClick={async () => {
          await sampleButton()
        }}
      >
        sampleButton
      </button>
    </div>
  )
}

// サーバーサイドレンダリング時に動作する関数
export async function getServerSideProps(_props: any) {
  return {
    props: {}
  }
}

const sampleButton = () => {
  console.log('test')
}

export default Login
