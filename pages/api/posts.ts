import type { Document } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Document[]>
) {
  let { limit = "10", offset = "0" } = req.headers;
  limit = Array.isArray(limit) ? limit[0] : limit;
  offset = Array.isArray(offset) ? offset[0] : offset;

  const client = await clientPromise;
  const posts = await client
    .db("blog")
    .collection("posts")
    .find()
    .sort({ created: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(offset))
    .toArray();

  res.status(200).json(posts);
}
