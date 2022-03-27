import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";

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

const addToFirestore = async (userId: number, cid: string) => {
  const docId = ulid();

  // add to user posts
  await db
    .collection("users")
    .doc(String(userId))
    .collection("posts")
    .doc(docId)
    .set({ cid });

  // add to global posts
  await db.collection("posts").doc(docId).set({ cid });
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const {
      userId,
      content,
      title,
    }: { userId: number; content: string; title: string } = req.body;
    try {
      if (!userId) throw new Error("User not logged in");

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
      await addToFirestore(userId, folderCid);

      res.status(201).json({ cid: folderCid });
    } catch (err) {
      logger.error(err);
      res.status(500).end();
    }
  }
  res.status(404).end();
};

export default handler;
