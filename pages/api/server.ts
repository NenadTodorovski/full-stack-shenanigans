import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import { schema } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";

const server = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
});

const serverStart = server.start();
const cors = Cors();

// 1. register apollo server as next.js api endpoint using default export function
// 2. use micro-corse for apollo studio
export default cors(async function handler(req, res) {
  await serverStart;

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await server.createHandler({
    path: "/api/server",
  })(req, res);
});

// disable body parsing - handled by default by graphQL
// next.js specific implementation
export const config = {
  api: {
    bodyParser: false,
  },
};
