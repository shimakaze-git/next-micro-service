import * as firebaseAdmin from "firebase-admin"

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID

// if (!firebasePrivateKey) console.error("権限がありません")

if (!firebaseAdmin.apps.length) {
  if (firebasePrivateKey && firebaseClientEmail && firebaseProjectId) {
    const cert = {
      privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
      clientEmail: firebaseClientEmail,
      projectId: firebaseProjectId,
      // privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(cert),
      databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
    })    
  } else {
    let error_message = `Failed to load Firebase credentials.`
    error_message += ` Follow the instructions in the README to set your Firebase credentials inside environment variables.`
    console.error(error_message)
  }
}

// JWTを解析し、有効かどうか検証する
const verifyIdToken = async (token: string): Promise<firebaseAdmin.auth.DecodedIdToken> => {
  return firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.log("error")
      console.error(error)

      throw new Error("no valid token")
    })
}
  
export { firebaseAdmin, verifyIdToken }
