import HashIds from 'hashids';
import { ValidationError } from 'joi';
import { ObjectId } from 'mongodb';

const key = process.env.HASHIDS_KEY;
if (!key) throw new Error('Missing HASHIDS_KEY');

const hashIds = new HashIds(key);

export const encodeId: (id: ObjectId) => string = (id) => {
  return hashIds.encodeHex(String(id));
};

export const decodeId: (hashed: string) => ObjectId = (hashed) => {
  const decoded = hashIds.decodeHex(hashed);
  if (!ObjectId.isValid(decoded)) {
    throw new ValidationError('Invalid Id', '', '');
  }
  return new ObjectId(decoded);
};
