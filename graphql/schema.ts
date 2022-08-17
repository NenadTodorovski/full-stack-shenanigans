import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Link {
    id: String
    title: String
    description: String
    category: String
    imageUrl: String
    url: String
    users: [String]
  }

  type Query {
    getLinks: [Link]!
  }
`;
