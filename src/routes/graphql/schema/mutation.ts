import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/index.js';
import { PostType } from '../types/customTypes/post.js';
import { ChangePostInput, CreatePostInput } from '../types/customTypes/mutationTypes/post.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/customTypes/user.js';
import { ChangeUserInput, CreateUserInput } from '../types/customTypes/mutationTypes/user.js';
import { ProfileType } from '../types/customTypes/profile.js';
import { ChangeProfileInput, CreateProfileInput } from '../types/customTypes/mutationTypes/profile.js';

export const Mutation = new GraphQLObjectType ({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: async (source, arg, context) => {
        return context.prisma.user.create({ data: arg.dto });
      },
    },

    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (source, arg, context) => {
        return await context.prisma.user.update({ where: { id: arg.id }, data: arg.dto });
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, arg, context) => {
          const response = await context.prisma.user.delete({ where: { id: arg.id } });
          return !!response;
      },
    },

    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (source, arg, context) => {
        return context.prisma.post.create({ data: arg.dto });
      },
    },

    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (source, arg, context) => {
        return await context.prisma.post.update({ where: { id: arg.id }, data: arg.dto });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (parent, arg, context) => {
        const response = await context.prisma.post.delete({ where: { id: arg.id } });
        return !!response;
      },
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (source, arg, context) => {
          return context.prisma.profile.create({ data: arg.dto });
      },
    },

    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (source, arg, context) => {
        return await context.prisma.profile.update({ where: { id: arg.id }, data: arg.dto });
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (source, arg, context) => {
        const response = await context.prisma.profile.delete({ where: { id: arg.id } });
        return !!response;
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        authorId: { type: new GraphQLNonNull(UUIDType) },
        userId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, arg, context) => {
        const response = await context.prisma.subscribersOnAuthors.create({
            data: { subscriberId: arg.userId, authorId: arg.authorId },
          });
        return response ? 'Successful subscription' : 'Unsuccessful subscription';
      },
    },

    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, arg, context) => {
        const response = await context.prisma.subscribersOnAuthors.deleteMany({ where: { subscriberId: arg.userId, authorId: arg.authorId } });
        return response ? 'Successful unsubscription' : 'Unsuccessful unsubscription';
      },
    },
  }
})