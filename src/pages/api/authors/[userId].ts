import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromId } from "@soul-project/react-soul-utils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ username: string; userId: number; userHandle: string }>
) => {
  if (req.method === "GET") {
    const { userId } = req.query;
    const data = await getUserFromId(parseInt(userId as string, 10));
    res.status(200).json(data);
  }
  res.status(404).end();
};

export default handler;
