import { useRouter } from "next/router"
import type { NextPage, NextPageContext, GetServerSideProps } from 'next'

import { extractCookie } from './auth'
// import styles from '../styles/Home.module.css'

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
//   console.log("getServerSideProps")
//   return {}
// }

const About: NextPage = (props) => {
  console.log("props", props)

  const router = useRouter()
  console.log("router.query", router.query)

  return (
    <div>
      <h1>Hello world!</h1>
      <p>About</p>
    </div>
  )
}

// getServerSideProps
About.getInitialProps = async (ctx: NextPageContext) => {
  // axiosとかで通信する
  // SSRなので、fetchは使えません(node-fetch入れればいける)

  if (ctx !== undefined) {
    let req = ctx.req

    let host = req ? req.headers["host"] : ""
    let userAgent = req ? req.headers['user-agent'] : navigator.userAgent

    // cookieを抽出する
    let cookie = extractCookie(ctx)

    return {
      data: {
        host: host,
        cookie: cookie,
        userAgent: userAgent
      }
    }
  }

  return {
    data: {
      host: "",
      cookie: "",
      userAgent: ""
    }
  }
}

export default About
