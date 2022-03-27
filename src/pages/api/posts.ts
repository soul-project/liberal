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

async function addToIPFS(formData: FormData) {
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
}

async function addToFirestore(userId: number, cid: string) {
  // add to user posts
  const docId = ulid();
  if ((await db.collection("userPosts").listDocuments()).length === 0) {
    await db
      .collection("userPosts")
      .doc(String(userId))
      .set({ [docId]: cid });
  } else {
    await db
      .collection("userPosts")
      .doc(String(userId))
      .update({ [docId]: cid });
  }

  // add to global posts
  await db.collection("posts").doc(docId).set({ cid });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
}
