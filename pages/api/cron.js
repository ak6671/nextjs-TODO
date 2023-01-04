import { verifySignature } from "@upstash/qstash/nextjs";

export default async function handler(req, res) {
  console.log("If this is printed, the signature has already been verified");
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = "ACa33a991929b5a71406dfe6276e5253fb";
  const authToken = "9fa307556b4f26f4349e1cdba85c3947";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({ body: "Hi there", from: "+12057408812", to: "+918072161462" })
    .then((message) => console.log(message.sid));

  // do stuff
  res.status(200).end();
}

verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
