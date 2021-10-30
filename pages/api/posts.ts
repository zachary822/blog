import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

type Data = {
  posts: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { limit = "10", offset = "0" } = req.headers;
  limit = Array.isArray(limit) ? limit[0] : limit;
  offset = Array.isArray(offset) ? offset[0] : offset;

  const client = await clientPromise;
  const posts = await client
    .db("blog")
    .collection("posts")
    .find()
    .limit(parseInt(limit))
    .skip(parseInt(offset))
    .toArray();

  res.status(200).json({ posts });
}
