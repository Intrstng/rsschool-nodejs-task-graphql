import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/type/index.js';
import { UUIDType } from '../uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileType,
      resolve: async (source, args, context) => {
        return await context.prisma.profile.findUnique({ where: { userId: source.id } })
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async (source, args, context) => {
        return await context.prisma.post.findMany({ where: { authorId: source.id } })
      },
    },

    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (source, args, context) => {
        const userSubscribedToArray = await context.prisma.subscribersOnAuthors.findMany({
              where: { subscriberId: source.id },
              select: { author: true }
            });
        return userSubscribedToArray.map(user => user.author);
      },
    },

    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (source, args, context) => {
        const subscribedToUserArray = await context.prisma.subscribersOnAuthors.findMany({
              where: { authorId: source.id },
              select: { subscriber: true }
            });
        return subscribedToUserArray.map(user => user.subscriber);
      },
    },
  })
})