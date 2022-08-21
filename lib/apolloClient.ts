import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/api/server",
  cache: new InMemoryCache(),
});
