import { encodeId } from '@utils/hashids';
import { ObjectId } from 'mongodb';

const OAUTH_PROVIDERS = ['github', 'google'] as const;
type OAuthProvider = typeof OAUTH_PROVIDERS[number];

interface OAuthAccount {
  provider: OAuthProvider;
  providerAccountId: number | string;
  accessToken: string;
  accessTokenExpires: OurDate | null;
  refreshToken: string;
  refreshTokenExpires: OurDate | null;
  createdAt: OurDate;
  updatedAt: OurDate;
}

export interface User {
  _id: ObjectId;
  name: string;
  userId: string;
  profileUrl: string | null;
  password: string | null;
  connectedAccounts: OAuthAccount[];
  createdAt: OurDate;
  updatedAt: OurDate;
  deletedAt: OurDate | null;
}

export type UserInfo = Pick<User, '_id' | 'name' | 'userId' | 'profileUrl'>;

export interface UserSession extends Omit<UserInfo, '_id'> {
  id: string;
}

export function encodeUser({ _id, ...userInfo }: UserInfo): UserSession {
  return {
    id: encodeId(_id),
    ...userInfo,
  };
}

export {};
