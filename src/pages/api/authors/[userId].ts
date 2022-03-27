import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromId } from "@soul-project/react-soul-utils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ username: string }>
) => {
  if (req.method === "GET") {
    const { userId } = req.query;
    console.log(userId);
    const { username } = await getUserFromId(parseInt(userId as string, 10));
    res.status(200).json({ username });
  }
  res.status(404).end();
};

export default handler;
