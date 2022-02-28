import admin from "firebase-admin"

// Firebaseの管理画面から取得した管理者アカウント情報
const serviceAccount: admin.ServiceAccount = {
  // project_id: process.env.FIREBASE_PROJECT_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n"
  ),
}

// Admin SDKを扱うためのオブジェクト
// バックエンドのみで使用可能
let firebaseAdmin = admin.apps[0] || admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export {
  firebaseAdmin
}
