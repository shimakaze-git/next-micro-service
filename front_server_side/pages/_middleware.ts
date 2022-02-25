import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'  

export const middleware = (req: NextRequest) => {
  console.log('Request URL', req.url)
  return NextResponse.next()
}
