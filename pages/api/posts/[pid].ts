import { Document, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../../../utils/models";
import clientPromise from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Document | ErrorResponse>
) {
  const { pid } = req.query;

  const client = await clientPromise;
  try {
    const post = await client
      .db("blog")
      .collection("posts")
      .findOne({ _id: new ObjectId(pid as string), published: { $eq: true } });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "not found" });
    }
  } catch (e) {
    res.status(400).json({ error: "bad id" });
  }
}
