import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import FormData from "form-data";

type Data = {
  cid: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const formData = new FormData();
      formData.append("file", req.body.content);

      const { Hash } = (
        await axios.post<{ Hash: string }>(
          "http://127.0.0.1:5001/api/v0/add",
          formData,
          {
            headers: { ...formData.getHeaders() },
            params: { pin: true },
          }
        )
      ).data;
      res.status(201).json({ cid: Hash });
    } catch (err) {
      res.status(500).end();
    }
  }
  res.status(404).end();
}
