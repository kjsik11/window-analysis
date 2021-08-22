import type { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandler } from '@utils/with-error-handler';
import { connectMongo } from '@utils/connect-mongo';
import { verifySession } from '@lib/server/verify-session';

import { encodeUser, User, UserInfo } from 'types/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { _userId } = verifySession(req, res, { renewSession: true });

    const { db } = await connectMongo();

    const user = await db.collection<User>('user').findOne<UserInfo>(
      {
        _id: _userId,
      },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          profileUrl: 1,
        },
      },
    );

    if (!user) throw new Error('User does not exist.');
    return res.json(encodeUser(user));
  }
};

export default withErrorHandler(handler);
