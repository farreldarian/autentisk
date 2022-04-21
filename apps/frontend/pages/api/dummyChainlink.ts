import { NextApiRequest, NextApiResponse } from "next";

export default function dummyChainlink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.tokenURI == null) {
    res.status(400).json({ error: "Unknown Token URI" });
    return;
  }

  res.send(0);
}
