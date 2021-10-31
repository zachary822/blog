import { Document, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Document>
) {
  const { pid } = req.query;

  const client = await clientPromise;
  try {
    const post = await client
      .db("blog")
      .collection("posts")
      .findOne({ _id: new ObjectId(pid as string) });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({});
    }
  } catch (e) {
    res.status(400).send({});
  }
}
