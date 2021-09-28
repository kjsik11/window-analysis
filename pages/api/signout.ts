import { serialize } from 'cookie';

import { COOKIE_KEY_ACCESS_TOKEN, defaultCookieOptions } from '@defines/cookie';

import { withErrorHandler } from '@utils/with-error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.setHeader('Set-Cookie', [serialize(COOKIE_KEY_ACCESS_TOKEN, '', defaultCookieOptions)]);

    // FIXME: redirect url 설정?
    res.redirect('/');
  }
};

export default withErrorHandler(handler);
