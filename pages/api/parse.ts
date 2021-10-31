import got from 'got';
import Joi from 'joi';

import { withErrorHandler } from '@utils/with-error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

const parseUrl = process.env.PARSE_SERVER_URL;

if (!parseUrl) throw new Error('No such url');


const publicUrl = process.env.AWS_PUBLIC_URL;

if (!parseUrl) throw new Error('No such aws url');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const querySchema = Joi.object({
    fileName: Joi.string().label('fileName').required(),
  });


  const { fileName } = (await querySchema.validateAsync(req.query)) as { fileName: string };


  if (!fileName) throw new Error('Error!!');

  if (req.method === 'POST') {

    const data = await got.get(parseUrl, { searchParams: { urllink: `${publicUrl}${fileName}` } }).json();

    return res.json({ data });
  }
};

export default withErrorHandler(handler);
