// import nookies from "nookies"

import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'

import { getCookies } from '../logics/auth'
import { verifyIdToken, firebaseAdmin } from '../pluguins/firebaseAdmin'
import { signout } from '../logics/auth'
import { useAuth } from '../components/authProvider';

interface IDashboardPageProps {
  currentUser: { 
    id: string;
    displayName: string;
  }
}

const DashboardPage: NextPage<IDashboardPageProps> = ({ currentUser }) => {
  const { user } = useAuth()
  return (
    <div>
      <h1>{ currentUser.displayName }さんのダッシュボード画面</h1>
      <p>dashboard</p>
      <button
        onClick={async () => {
          await signout()
        }}
      >
        FireBase sign out
      </button>
      <hr />
      <p>{`User ID: ${user ? user.uid : 'no user signed in'}`}</p>
    </div>
  )
}

// サーバーサイドレンダリング時に動作する関数
// GetServerSideProps
export const getServerSideProps: GetServerSideProps<IDashboardPageProps> = async (ctx: GetServerSidePropsContext) => {
  // console.log("ctx", ctx)
  // console.log("type ctx", typeof ctx)

  try {
    // ブラウザ側で設定したCookieを取得
    let cookies = getCookies(ctx)
    console.log("cookies", cookies)

    // CookieからJWTを取得し検証する
    // const { uid, email } = await verifyIdToken(cookies["token"])

    // console.log("uid", uid)
    // console.log("email", email)
    const user = await verifyIdToken(cookies["token"])

    console.log("user", user)

    // let auth = firebaseAdmin.auth()
    // console.log("auth", auth)

    // ユーザー情報を取得
    // const currentUser = await getUser(uid)

    // DashboardPageにpropsを渡して遷移
    return {
      props: {
        currentUser: {
          id: "id",
          displayName: "displayName"
        }
      }
    }
  } catch (error) {
    console.error(error)

    // 認証に失敗したら、ログイン画面へリダイレクト
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {} as never,
    }
  }
}

export default DashboardPage
