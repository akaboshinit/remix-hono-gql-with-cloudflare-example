import { makeExecutableSchema } from "@graphql-tools/schema";
import { createYoga } from "graphql-yoga";

type GraphQLContext = {
  env: APIEnv;
};

const typeDefinitions = `
  type Query {
    hello(id: String!): String!
  }
`;

const resolvers = {
  Query: {
    hello: (
      parent: unknown,
      args: {
        id: number;
      },
      ctx: GraphQLContext
    ) => {
      console.log(parent,ctx.env.SESSION_SECRET);
      return `Hello ${args.id} World!`;
    },
  },
};

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});

const yoga = createYoga<{
  env: APIEnv;
  ctx: ExecutionContext;
}>({
  graphqlEndpoint: "/",
  landingPage: false,
  schema,
});

export default {
  fetch(
    req: Request,
    env: APIEnv,
    ctx: ExecutionContext
  ) {
    return yoga.handleRequest(req, {
      env,
      ctx,
    });
  },
};
