import { FeedbackInput, validateFeedback } from 'types/feedback';

import { fetcher } from './fetcher';

export default async function requestFeedback(feedbackInput: FeedbackInput) {
  try {
    const buildInput = await validateFeedback(feedbackInput);

    await fetcher.post('/api/feedback', { json: buildInput });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[requestFeedback] error', err);
    }

    throw err;
  }
}
