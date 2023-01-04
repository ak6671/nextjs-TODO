import { verifySignature } from "@upstash/qstash/nextjs";
import fetch from "node-fetch";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("hello from cron task");
    } catch (err) {}
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
