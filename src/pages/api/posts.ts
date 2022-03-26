import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";

import { HTMLTemplate } from "./posts/template";

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

async function addToFirestore() {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // TODO: validate request with class-validator or something
    try {
      const folderUUID = uuidv4();

      const formData = new FormData();
      formData.append(
        "file",
        HTMLTemplate({
          content: req.body.content as string,
          title: req.body.title as string,
        }),
        {
          filename: encodeURIComponent(`${folderUUID}/index.html`),
        }
      );

      const cids = await addToIPFS(formData);
      const folderCid = cids[cids.length - 1].Hash;

      res.status(201).json({ cid: folderCid });
    } catch (err) {
      res.status(500).end();
    }
  }
  res.status(404).end();
}
