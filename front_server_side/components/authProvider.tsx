import React, { useState, useContext, useEffect, createContext } from "react"
import nookies from "nookies"

// import * as firebase from "firebase/app"

// import { User as FirebaseUser } from "firebase/auth"

import { firebaseClient } from '../pluguins/firebaseClient'

// firebaseを初期化
// if (typeof window !== "undefined" && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// interface IAuthContextData {
//   // firebaseUser: FirebaseUserType | null
//   firebaseUser: "" | null
// }

// AuthContextを作成
// export const AuthContext = createContext<IAuthContextData>({
//   firebaseUser: null,
// })
const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
})

export const AuthProvider = ({ children }: any) => {

  // console.log("children", children)
  // console.log("firebaseClient.apps.length", firebaseClient.apps.length)
  // console.log("AuthContext", AuthContext)

  // console.log('firebase getApp', firebase.getApp())
  // console.log('firebase getApps', firebase.getApps())


  // console.log("Firebase !", Firebase)

  // console.log("AuthProvider", firebaseClient.User)
  // console.log("firebase.User", firebase.User)

  const [user, setUser] = useState<firebaseClient.User | null>(null)

  // console.log("user", user)
  // console.log("setUser", setUser)

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies
    }

    console.log("useEffect", useEffect)
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`)

      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        // nookies.destroy(null, "token");
        // nookies.set(null, "token", "", {path: '/'});
        return;
      }

      console.log(`updating token...`)
      console.log("user", user)

      const token = await user.getIdToken()
      console.log("token", token)
    })
  }, [])

  // const [user, setUser] = useState<firebaseClient.User | null>(null)
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}