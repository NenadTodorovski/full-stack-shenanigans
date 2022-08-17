import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import Cors from "micro-cors";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const serverStart = server.start();
const cors = Cors();

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

export const config = {
  api: {
    bodyParser: false,
  },
};
