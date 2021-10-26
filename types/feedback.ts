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

export {};
