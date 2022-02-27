import { useRouter } from "next/router"

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../components/authProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // ログインページとダッシュボードページにのみJWT取得処理を実装
  if (["/login", "/dashboard"].includes(router.pathname)) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  }

  // ページコンポーネントをそのまま表示
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
