import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { schema } from './schema/schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { body: { query, variables } } = req;
      const validationErrors = validate(schema, parse(query), [depthLimit(5)]);
      if (validationErrors && validationErrors.length > 0) return {errors: validationErrors}
      return await graphql({
        schema: schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, dataLoaders: {} },
      })
    },
  });
};

export default plugin;


