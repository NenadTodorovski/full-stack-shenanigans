export const resolvers = {
  Query: {
    getLinks: async (_parent, args, context) =>
      await context.prisma.link.findMany(),
  },
};
