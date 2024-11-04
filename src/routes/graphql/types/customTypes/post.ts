import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './user.js';
import { UUIDType } from '../uuid.js';
import { GraphQLNonNull } from 'graphql/type/index.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => {
    if (!(UserType instanceof GraphQLObjectType)) {
      throw new Error('UserType is not instanceof a GraphQLObjectType');
    }
    return {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    author: {
      type: UserType,
      resolve: async (source, args, context) => {},
    },
  }},
});
