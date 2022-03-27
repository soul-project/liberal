import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";
import { getUserFromSoul } from "@soul-project/react-soul-utils";

import { HTMLTemplate } from "./posts/template";

import Logger from "../../utils/logger";
import db from "../../firebase/firestoreClient";

const logger = Logger("api/posts");

type Data = {
  cid: string;
};

const addToIPFS = async (formData: FormData) => {
  const response = (
    await axios.post<string>(
      `http://${process.env.IPFS_HOSTNAME}:${process.env.IPFS_PORT}/api/v0/add`,
      formData,
      {
        headers: { ...formData.getHeaders() },
        params: { pin: true },
      }
    )
  ).data;

  const cids = response
    .replace(/\n$/, "") // Remove trailing newline
    .split("\n") // Split into lines
    .map<{ Hash: string }>((data) => JSON.parse(data)); // Parse each line

  return cids;
};

const addToFirestore = async ({
  userId,
  cid,
  title,
}: {
  userId: number;
  cid: string;
  title: string;
}) => {
  const docId = ulid();
  const data = { title, cid };

  // add to user posts
  await db
    .collection("users")
    .doc(String(userId))
    .collection("posts")
    .doc(docId)
    .set(data);

  // add to global posts
  await db.collection("posts").doc(docId).set(data);
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const {
      content,
      title,
      token,
    }: { token: string; content: string; title: string } = req.body;
    try {
      if (!token) throw new Error("Token not provided");
      const { userId } = await getUserFromSoul(token);

      const folderUUID = uuidv4();

      const formData = new FormData();
      formData.append(
        "file",
        HTMLTemplate({
          content: content,
          title: title,
        }),
        {
          filename: encodeURIComponent(`${folderUUID}/index.html`),
        }
      );

      const cids = await addToIPFS(formData);
      const folderCid = cids[cids.length - 1].Hash;
      await addToFirestore({ userId, cid: folderCid, title });

      res.status(201).json({ cid: folderCid });
    } catch (err) {
      logger.error(err);
      res.status(500).end();
    }
  }
  res.status(404).end();
};

export default handler;
