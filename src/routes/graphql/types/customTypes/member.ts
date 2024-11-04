import { GraphQLEnumType, GraphQLObjectType, GraphQLInt } from 'graphql';
import { GraphQLFloat, GraphQLNonNull } from 'graphql/type/index.js';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const MemberTypeIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: MemberTypeId.BASIC },
    BUSINESS: { value: MemberTypeId.BUSINESS },
  }
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',

  fields: () => ({
    id: { type: MemberTypeIdType },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  })
});
