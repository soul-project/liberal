import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";

type Data = {
  cid: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const folderUUID = uuidv4();

      const formData = new FormData();
      formData.append("file", req.body.content, {
        filename: encodeURIComponent(`${folderUUID}/index.html`),
      });

      const response = (
        await axios.post<string>(
          "http://127.0.0.1:5001/api/v0/add", // TODO: Create an env file for this to store the hostname
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

      const folderCid = cids[cids.length - 1].Hash;

      res.status(201).json({ cid: folderCid });
    } catch (err) {
      res.status(500).end();
    }
  }
  res.status(404).end();
}
