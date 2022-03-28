import type { NextApiRequest, NextApiResponse } from "next";

type Post = {
  title: string;
  cid: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ posts: Post[]; totalCount: number }>
) => {
  if (req.method === "GET") {
    const { userId } = req.query;
    // TODO: use firebase to retrieve the posts for the user and check totalCount
    res
      .status(200)
      .json({ posts: [{ title: "test", cid: "test" }], totalCount: 1 });
  }
  res.status(404).end();
};

export default handler;
