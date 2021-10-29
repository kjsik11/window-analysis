import { verifySession } from '@lib/server/verify-session';

import { connectMongo } from '@utils/connect-mongo';
import { withErrorHandler } from '@utils/with-error-handler';

import { FeedbackBSON, validateFeedback } from 'types/feedback';
import { encodeUser, User, UserInfo } from 'types/user';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { _userId } = verifySession(req, res, { renewSession: true });

    const feedbackInput = await validateFeedback(req.body);

    const { db } = await connectMongo();

    const user = await db.collection<Pick<User, '_id' | 'name'>>('user').findOne<UserInfo>(
      {
        _id: _userId,
      },
      {
        projection: {
          _id: 1,
          name: 1,
        },
      },
    );

    if (!user) throw new Error('User does not exist.');

    await db.collection<FeedbackBSON>('feedback').insertOne({
      ...feedbackInput,
      user,
      created: new Date(),
    });

    return res.json(encodeUser(user));
  }
};

export default withErrorHandler(handler);
