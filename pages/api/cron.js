import { verifySignature } from "@upstash/qstash/nextjs";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      res.status(200).json({ success: "hey upstash" });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
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
