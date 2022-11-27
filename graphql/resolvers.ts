export const resolvers = {
	Query: {
		getLinks: async (_parent, _args, context) =>
			await context.prisma.link.findMany(),
	},
};
