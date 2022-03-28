import type { NextApiRequest, NextApiResponse } from "next";

import { paginationSchema } from "src/utils/validators/pagination";
import db from "src/firebase/firestoreClient";

type Post = {
  title: string;
  cid: string;
};

type Response = {
  posts: Post[];
  totalCount: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === "GET") {
    const {
      userId,
      page: stringPage,
      numItemsPerPage: stringNumItemsPerPage,
    } = req.query;
    const { value, error } = paginationSchema.validate({
      page: stringPage,
      numItemsPerPage: stringNumItemsPerPage,
    });

    if (error) {
      throw new Error(error.message);
    }

    const query = db
      .collection("users")
      .doc(String(userId))
      .collection("posts");

    const totalCount = (await query.get()).size;
    const firebaseDocs = await query
      .limit(value.numItemsPerPage)
      .offset((value.page - 1) * value.numItemsPerPage)
      .get();

    const posts = firebaseDocs.docs.map<Post>((doc) => doc.data() as Post);
    res.status(200).json({ posts, totalCount });
  }
  res.status(404).end();
};

export default handler;
