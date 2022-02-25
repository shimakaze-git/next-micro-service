// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "content-type",
    "application/json"
  )
  res.status(200).json({
    users: [{ name: 'foo'}, { name: 'John Doe'}]
  })
}
