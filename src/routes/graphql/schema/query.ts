import { GraphQLList, GraphQLNonNull, GraphQLObjectType, } from 'graphql';
import { MemberType, MemberTypeIdType } from '../types/customTypes/member.js';
import { PostType } from '../types/customTypes/post.js';
import { UserType } from '../types/customTypes/user.js';
import { ProfileType } from '../types/customTypes/profile.js';
import { UUIDType } from '../types/uuid.js';


export const Query = new GraphQLObjectType ({
  name: 'Query',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, args, context) => {
        return await context.prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async(source, args, context) => {
        return await context.prisma.post.findUnique( { where: { id: args.id } });
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (source, args, context) => {
        return await context.prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeIdType) } },
      resolve: async(source, args, context) => {
        return await context.prisma.memberType.findUnique( { where: { id: args.id } });
      },
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source, args, context) => {
        return await context.prisma.profile.findMany();
      },
    },

    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async(source, args, context) => {
        return await context.prisma.profile.findUnique( { where: { id: args.id } });
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (source, args, context) => {
        return await context.prisma.user.findMany();
      },
    },

    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async(source, args, context) => {
        return await context.prisma.user.findUnique( { where: { id: args.id } });
      },
    },
  },
});