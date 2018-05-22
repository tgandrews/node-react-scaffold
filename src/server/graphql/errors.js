import { createError } from 'apollo-errors';

// eslint-disable-next-line import/prefer-default-export
export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred',
});
