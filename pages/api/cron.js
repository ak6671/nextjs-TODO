import { verifySignature } from "@upstash/qstash/nextjs";
import fetch from "node-fetch";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      async function run() {
        const servicePlanId = "e78892b2465944349b9a4fe412aad6c5";
        const region = "us";
        const resp = await fetch(
          `https://${region}.sms.api.sinch.com/xms/v1/${servicePlanId}/batches`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 073c1d764d9343c794fa3753ebd92681",
            },
            body: JSON.stringify({
              from: "+447520652839",
              to: ["+919003192752"],
              body: "hey testing",
              delivery_report: "summary",
              type: "mt_text",
            }),
          }
        );

        const data = await resp.json();
        console.log(data);
      }

      run();

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
