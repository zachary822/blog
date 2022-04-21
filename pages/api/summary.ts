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
  const counts = await client
    .db("blog")
    .collection("posts")
    .aggregate([
      {
        $match: {
          published: { $eq: true },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created" },
            month: { $month: "$created" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ])
    .toArray();

  res.status(200).json(counts);
}
