// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let todos = [{ id: 1, value: "add your first todo", checked: false }];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(todos);
      break;
    case "POST":
      const { value, checked } = req.body;
      todos.push({
        id: todos.length + 1,
        value,
        checked,
      });
      res.status(200).json(todos);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
