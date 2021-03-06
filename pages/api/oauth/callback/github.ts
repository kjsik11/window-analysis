import { serialize } from 'cookie';
import got from 'got/dist/source';
import Joi from 'joi';

import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REDIRECT_URL,
  defaultCookieOptions,
} from '@defines/cookie';
import { ACCESS_TOKEN_EXPIRES_IN } from '@defines/token';

import { connectMongo } from '@utils/connect-mongo';
import { encodeId } from '@utils/hashids';
import { signToken, verifyToken } from '@utils/jsonwebtoken';
import { withErrorHandler } from '@utils/with-error-handler';

// types
import { User } from 'types/user';

import type { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.GITHUB_ID;
if (!client_id) throw new Error('Missing GITHUB_ID');

const client_secret = process.env.GITHUB_SECRET;
if (!client_secret) throw new Error('Missing GITHUB_SECRET');

const SERVER_URL = process.env.SERVER_URL;
if (!SERVER_URL) throw new Error('Missing SERVER_URL');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const querySchema = Joi.object({
      code: Joi.string().label('code').required(),
      state: Joi.string().label('state').required(),
    });
    const { code, state } = await querySchema.validateAsync(req.query);

    // Check validity of the request
    verifyToken(state);

    const { access_token, expires_in, refresh_token, refresh_token_expires_in } = await got
      .post('https://github.com/login/oauth/access_token', {
        headers: {
          Accept: 'application/json',
        },
        json: {
          client_id,
          client_secret,
          code,
          redirect_uri: `${SERVER_URL}/api/oauth/callback/github`,
          state,
        },
      })
      .json();

    const { id, login, avatar_url } = await got
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
      .json();

    const { db } = await connectMongo();

    const exUser = await db.collection<User>('user').findOne({ userId: id as string });

    if (!exUser) {
      // create account with github.
      const { insertedId } = await db.collection<User>('user').insertOne({
        name: login,
        userId: id,
        profileUrl: avatar_url,
        password: null,
        connectedAccounts: [
          {
            provider: 'github',
            providerAccountId: id,
            accessToken: access_token,
            accessTokenExpires: new Date(Date.now() + expires_in),
            refreshToken: refresh_token,
            refreshTokenExpires: new Date(Date.now() + refresh_token_expires_in),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

      const accessToken = signToken(
        { userId: encodeId(insertedId) },
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
      );
      res.setHeader('Set-Cookie', [
        serialize(COOKIE_KEY_ACCESS_TOKEN, accessToken, defaultCookieOptions),
      ]);
      res.redirect(req.cookies[COOKIE_KEY_REDIRECT_URL] || '/');
      return;
    }

    // TODO: if exUser is deleted user?

    if (exUser.connectedAccounts.map(({ provider }) => provider).includes('github')) {
      await db.collection<User>('user').updateOne(
        {
          _id: exUser._id,
          connectedAccounts: { $elemMatch: { provider: { $eq: 'github' } } },
        },
        {
          $set: {
            'connectedAccounts.$.accessToken': access_token,
            'connectedAccounts.$.accessTokenExpires': new Date(Date.now() + expires_in),
            'connectedAccounts.$.refreshToken': refresh_token,
            'connectedAccounts.$.refreshTokenExpires': new Date(
              Date.now() + refresh_token_expires_in,
            ),
            'connectedAccounts.$.updatedAt': new Date(),
          },
        },
      );
    } else {
      await db.collection<User>('user').updateOne(
        {
          _id: exUser._id,
        },
        {
          $push: {
            connectedAccounts: {
              provider: 'github',
              providerAccountId: id,
              accessToken: access_token,
              accessTokenExpires: new Date(Date.now() + expires_in),
              refreshToken: refresh_token,
              refreshTokenExpires: new Date(Date.now() + refresh_token_expires_in),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      );
    }

    const accessToken = signToken(
      { userId: encodeId(exUser._id) },
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );
    res.setHeader('Set-Cookie', [
      serialize(COOKIE_KEY_ACCESS_TOKEN, accessToken, defaultCookieOptions),
    ]);

    res.redirect(req.cookies[COOKIE_KEY_REDIRECT_URL] || '/analysis');
    return;
  }
};

export default withErrorHandler(handler);
