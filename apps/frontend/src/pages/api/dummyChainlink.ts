import { NextApiRequest, NextApiResponse } from 'next'

export default function dummyChainlink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.tokenUri == null) {
    res.status(400).json({ error: 'Unknown Token Uri' })
    return
  }

  res.json({ similarity: 0 })
}
