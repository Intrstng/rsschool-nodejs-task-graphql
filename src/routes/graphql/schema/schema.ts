import { GraphQLSchema } from 'graphql';
import { Query } from './query.js';
import { Mutation } from './mutation.js';

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});