import { extendType, intArg, objectType, stringArg } from "nexus";
import { User } from "./User";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("description");
    t.string("category");
    t.string("imageUrl");
    t.string("url");
    t.list.field("users", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .users();
      },
    });
  },
});

export const Edge = objectType({
  name: "Edge",
  definition(t) {
    t.string("cursor");
    t.field("node", {
      type: Link,
    });
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.string("endCursor");
    t.boolean("hasNextPage");
  },
});

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.field("pageInfo", { type: PageInfo });
    t.list.field("edges", {
      type: Edge,
    });
  },
});

export const LinksQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("links", {
      type: "Response",
      args: {
        size: intArg(),
        after: stringArg(),
      },
      async resolve(
        _parent,
        args: { size: number; after: string },
        ctx
      ): Promise<any> {
        let queryResult;

        if (!!args.after) {
          queryResult = await ctx.prisma.link.findMany({
            take: args.size,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResult = await ctx.prisma.link.findMany({ take: args.size });
        }

        if (queryResult.length > 0) {
          const activeCursor = queryResult[queryResult.length - 1].id;
          const nextQueryResult = await ctx.prisma.link.findMany({
            take: args.size,
            cursor: { id: activeCursor },
          });

          const result = {
            pageInfo: {
              endCursor: activeCursor,
              hasNextPage: nextQueryResult.length >= args.size,
            },
            edges: queryResult.map((link) => ({
              cursor: link.id,
              node: link,
            })),
          };

          return result;
        }

        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});
