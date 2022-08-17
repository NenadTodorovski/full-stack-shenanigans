import { makeSchema } from "nexus";
import { join } from "path";

import { User, Link } from "./types"

// type-safe schema generation
export const schema = makeSchema({
  types: [],
  outputs: {
    // where to generate app's schema types
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexux-typegen",
      "index.d.ts"
    ),
    // location of the generated schema 
    schema: join(process.cwd(), "graphql", "schema", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
});
