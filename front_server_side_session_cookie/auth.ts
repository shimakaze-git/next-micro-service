import type { FirebaseApp } from "firebase/app";
import type { Auth as FirebaseAuth } from "firebase/auth";

import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// FirebaseAppを返す
export const getFirebaseApp = (): FirebaseApp | undefined => {
  // バックエンドで実行されないようにする
  if (typeof window === "undefined") return

  return getApps()[0] || initializeApp(config)
}

// FirebaseAuthを返す
export const getFirebaseAuth = (): FirebaseAuth => {
  return getAuth(getFirebaseApp())
}

// ログイン
export const login = async (email: string, password: string) => {
  // FirebaseAuthを取得する
  const auth = getFirebaseAuth()

  // メールアドレスとパスワードでログイン
  const result = await signInWithEmailAndPassword(auth, email, password)

  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken()

  // Cookieにセッションを付与するようにAPIを投げる
  await fetch(
    "/api/session",
    {
      method: "POST",
      body: JSON.stringify({ id })
    }
  )
}
  
// ログアウト
export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウト
  await fetch(
    // "/api/sessionLogout",
    "/api/logout",
    {
      // method: "POST",
      method: "GET"
    }
  )
}
