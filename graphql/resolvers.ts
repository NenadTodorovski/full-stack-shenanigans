import { links } from "../data/links";

export const resolvers = {
  Query: {
    getLinks: () => links,
  },
};
