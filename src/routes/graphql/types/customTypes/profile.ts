import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../uuid.js';
import { GraphQLNonNull } from 'graphql/type/index.js';
import { MemberType, MemberTypeIdType } from './member.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

    user: { type: UserType,
      resolve: async (source, args, context) => {},
    },

    userId: {type: new GraphQLNonNull(UUIDType)},

    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (source, args, context) => {},
    },

    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdType) } }),
});