// import { links } from "../data/links";
import { prisma } from "../lib/prisma";

export const resolvers = {
  Query: {
    getLinks: async () => await prisma.link.findMany(),
  },
};
