// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "./mongodb";

let todos = [{ id: 1, value: "add your first todo", checked: false }];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  const { method } = req;

  switch (method) {
    case "GET":
      const alltodos = await db.collection("todos").find({}).toArray();
      res.status(200).json(alltodos);
      break;
    case "POST":
      const { value, checked } = req.body;
      const dbres = await db.collection("todos").insertOne(req.body);
      res.status(200).json(dbres.insertedId);
      break;
    case "PATCH":
      const { _id, checked: check, value: v, listaddedTime } = req.body;
      const { ObjectId } = require("mongodb");

      console.log("Updating todo:", {
        _id,
        check,
        v,
        objectId: new ObjectId(_id),
      });

      const dbPATCHres = await db
        .collection("todos")
        .updateOne(
          { _id: new ObjectId(_id) },
          { $set: { checked: check, value: v, listaddedTime } }
        );

      console.log("Update result:", dbPATCHres);
      res.status(200).json(dbPATCHres);
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
