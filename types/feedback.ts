import { ObjectId } from 'bson';
import Joi from 'joi';

export interface FeedbackBSON {
  _id: ObjectId;
  name: string;
  organization: string;
  email: string;
  message: string;
  user: {
    _id: ObjectId;
    name: string;
  };
  created: Date;
}

export interface FeedbackInput {
  name: string;
  organization: string;
  email: string;
  message: string;
}

export const initialFeedbackInput: FeedbackInput = {
  name: '',
  organization: '',
  email: '',
  message: '',
};

// Validator
export const validateFeedback: (buildRequestDemo: FeedbackInput) => Promise<FeedbackInput> = async (
  buildRequestDemo,
) => {
  const requestDemoSchema = Joi.object<FeedbackInput>({
    name: Joi.string()
      .max(20)
      .required()
      .error(() => {
        throw new Error('name validation failed.');
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .error(() => {
        throw new Error('Email validation failed.');
      }),
    organization: Joi.string()
      .allow('')
      .error(() => {
        throw new Error('Organization validation failed.');
      }),
    message: Joi.string()
      .allow('')
      .max(500)
      .error(() => {
        throw new Error('Message validation failed.');
      }),
  }).required();

  return (await requestDemoSchema.validateAsync(buildRequestDemo).catch((err) => {
    throw new Error(err.message);
  })) as FeedbackInput;
};

export {};
