import type { Document } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Document[]>
) {
  let { limit = "10", offset = "0", month, year } = req.query;

  let find =
    month && year
      ? {
          $expr: {
            $and: [
              { $eq: [{ $year: "$created" }, parseInt(year as string)] },
              { $eq: [{ $month: "$created" }, parseInt(month as string)] },
            ],
          },
        }
      : {};

  const client = await clientPromise;
  const posts = await client
    .db("blog")
    .collection("posts")
    .find(find)
    .sort({ created: -1 })
    .limit(parseInt(limit as string))
    .skip(parseInt(offset as string))
    .toArray();

  res.status(200).json(posts);
}
