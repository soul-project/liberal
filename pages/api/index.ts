export default async function handler(req: any, res: any) {
  const { method } = req;

  // This will allow OPTIONS request
  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }
}
