import got from 'got'
import Joi from 'joi';


import { withErrorHandler } from '@utils/with-error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

const parseUrl = process.env.PARSE_SERVER_URL

if(!parseUrl) throw new Error('No such url')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const querySchema = Joi.object({
        url: Joi.string().label('url').required(),
      });
  
      const { url } = (await querySchema.validateAsync(req.query)) as { url: string };


      if(!url) throw new Error('Error!!')
  if (req.method === 'POST') {
   

    const {rawBody} = await got.get(parseUrl,{searchParams:{urllink:url}})


    return res.json({rawBody})
  }
};

export default withErrorHandler(handler);
