// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  start: Date
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
    
//     let myStartDate = new Date('July 10, 2023 9:00:00')
//     res.status(200).json({ start: myStartDate })
// }

export default function handler(req: any, res: any) {
  let myStartDate = new Date('July 10, 2023 9:00:00')

  return new Response(
    JSON.stringify({'start': myStartDate}),
    {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
  )
}

export const config = {
  runtime: 'experimental-edge'
}
