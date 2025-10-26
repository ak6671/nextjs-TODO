// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../api/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  const { method } = req;

  switch (method) {
    case "POST":
      const { _id } = req.body;
      const { ObjectId } = require("mongodb");

      try {
        const result = await db
          .collection("todos")
          .deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Failed to delete todo" });
      }
      break;

    default:
      res.setHeader("Allow", ["DELETE"]);
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
