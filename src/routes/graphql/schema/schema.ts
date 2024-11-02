import { GraphQLSchema } from 'graphql';
import { Query } from './query.js';

export const schema = new GraphQLSchema({
  query: Query,
});