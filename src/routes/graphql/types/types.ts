import { User } from '@prisma/client';

type Subscriptions = {
  authorId: string;
  subscriberId: string;
}

export type UserSubscriptions = User & {
  userSubscribedTo?: Subscriptions[];
  subscribedToUser?: Subscriptions[];
}