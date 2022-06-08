import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/prisma'

export default async function closestSimilarity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uriSig } = req.query
  if (uriSig == null) {
    res.status(400).json({ error: 'No uri sig' })
    return
  }

  const closestSimilarity = await prisma.closestSimilarity.findFirst({
    where: { incomingId: uriSig as string },
    select: { incoming: true, original: true },
  })

  if (!closestSimilarity) {
    res.status(404).json({ error: 'Not Found!' })
  }

  res.json(closestSimilarity)
}
