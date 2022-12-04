// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../mongodb";

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
      await db.collection("todos").insertOne(req.body);
      // todos.push({
      //   id: todos.length + 1,
      //   value,
      //   checked,
      // });
      res.status(200).json("success");
      break;
    case "PATCH":
      console.log("req", req.body);
      const { id, checked: check, value: v } = req.body;

      // const Next = await db
      //   .collection("todos")
      //   .findOneAndUpdate({ id }, { checked: check });

      // const response = await db
      //   .collection("todos")
      //   .findOneAndReplace(
      //     { id, checked: !check, v },
      //     { id, checked: check, v }
      //   );
      // console.log("response", response);

      let todo;

      // try {
      //   todo = await db
      //     .collection("todos")
      //     .findOneAndUpdate({ id }, { id, checked: check, value: v });
      //   console.log(todo);
      // } catch (err) {
      //   console.log(err);
      //   const error = new Error(
      //     "Something went wrong, could not update place.",
      //     500
      //   );
      // }
      await db
        .collection("todos")
        .updateOne(
          { id },
          { $set: { id, checked: check, value: v } },
          { upsert: true }
        );
      // try {
      //   await todo.save();
      // } catch (err) {
      //   const error = new Error(
      //     "Something went wrong, could not update place.",
      //     500
      //   );
      // }
      //var foundIndex = todos.findIndex((x) => x.id == id);

      //todos[foundIndex].checked = check;

      res.status(200).json("updated");
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
