import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import Joi from 'joi';

// utils

import { verifySession } from '@lib/server/verify-session';

import { s3Client } from '@utils/aws/s3';
import { withErrorHandler } from '@utils/with-error-handler';

// types & defines

import type { NextApiRequest, NextApiResponse } from 'next';

const Bucket = process.env.AWS_PUBLIC_BUCKET_NAME;
if (!Bucket) throw new Error('Missing AWS_PUBLIC_BUCKET_NAME');

const awsPublicUrl = process.env.AWS_PUBLIC_URL;
if (!awsPublicUrl) throw new Error('Missing awsPublicUrl');

const expiresIn = 300;

const path = 'test/files';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  verifySession(req, res);

  if (req.method === 'GET') {
    const querySchema = Joi.object({
      key: Joi.string().label('key').max(100).required(),
    });

    const { key } = (await querySchema.validateAsync(req.query)) as { key: string };

    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket,
      Key: `${path}/${key}`,
      Conditions: [{ Bucket }, ['content-length-range', 1, 50 * 1024 * 1024]],
      Fields: { acl: 'public-read' },
      Expires: expiresIn,
    });

    return res.status(201).json({ url, fields });
  }

  // if (req.method === 'POST') {
  //   const querySchema = Joi.object({
  //     key: Joi.string().label('key').required(),
  //   });

  //   const { key } = (await querySchema.validateAsync(req.query)) as { key: string };

  //   const headCommand = new HeadObjectCommand({ Bucket, Key: `${path}/${key}` });

  //   try {
  //     await s3Client.send(headCommand);
  //   } catch (err) {
  //     if (err.name === 'NotFound') {
  //       return res.status(404).json(createError('AWS_NOT_FOUND'));
  //     }

  //     return res.status(500).json(createError('AWS_ERROR'));
  //   }

  //   const imgBuffer = await got(`${awsPublicUrl}/${path}/${key}`).buffer();

  //   if (!imgBuffer) return res.status(500).json(createError('INTERNAL_SERVER_ERROR'));

  //   const { UploadId, Key } = await s3Client.send(
  //     new CreateMultipartUploadCommand({
  //       ACL: 'public-read',
  //       Bucket,
  //       Key: `${path}/${key}`,
  //     }),
  //   );

  //   const { ETag } = await s3Client.send(
  //     new UploadPartCommand({
  //       Bucket,
  //       Key,
  //       PartNumber: 1,
  //       UploadId,
  //       Body: imgBuffer,
  //     }),
  //   );

  //   await s3Client
  //     .send(
  //       new CompleteMultipartUploadCommand({
  //         Bucket,
  //         Key,
  //         UploadId,
  //         MultipartUpload: { Parts: [{ ETag, PartNumber: 1 }] },
  //       }),
  //     )
  //     .catch(console.error);

  //   return res.status(204).end();
  // }
};

export default withErrorHandler(handler);
