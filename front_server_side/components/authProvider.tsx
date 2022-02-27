import React, { useState, useContext, useEffect, createContext } from "react"
import nookies from "nookies"

import { firebaseClient } from '../pluguins/firebaseClient'

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebaseClient.User | null>(null)

  console.log("user", user)
  console.log("setUser", setUser)

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`)

      if (!user) {
        console.log(`no token found...`)
        setUser(null)

        nookies.destroy(null, "token")
        nookies.set(null, "token", "", {path: '/'})

        return
      }

      console.log(`updating token...`)
      console.log("user", user)

      const token = await user.getIdToken()
      console.log("token", token)

      setUser(user)
      nookies.destroy(null, "token")
      nookies.set(null, "token", token, {path: '/'})
    })
  }, [])

  // // 10分ごとにトークンをリフレッシュ
  // // force refresh the token every 10 minutes
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     console.log(`refreshing token...`)

  //     const user = firebaseClient.auth().currentUser
  //     if (user) {
  //       await user.getIdToken(true)
  //     }
  //   }, 10 * 60 * 1000)
  //   return () => clearInterval(handle)
  // }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
