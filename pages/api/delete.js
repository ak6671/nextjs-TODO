// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../api/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  const { method } = req;

  switch (method) {
    case "POST":
      const { value, checked } = req.body;
      await db.collection("todos").findOneAndDelete(req.body);

      res.status(200).json("success");
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// import { NextRequest, NextResponse } from "next/server";

// export default (req) => {
//   return NextResponse.json(todos);
// };

// export const config = {
//   runtime: "experimental-edge",
// };
