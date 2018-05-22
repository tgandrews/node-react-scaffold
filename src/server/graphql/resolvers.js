import { promises } from 'fs';
import { resolve } from 'path';
import { createResolver } from 'apollo-resolvers';
import { isInstance } from 'apollo-errors';

import { UnknownError } from './errors';

const { readFile } = promises;

const baseResolver = createResolver(undefined, (root, args, ctx, err) => {
  if (isInstance(err)) {
    return err;
  }
  return new UnknownError({
    data: {
      name: err.name,
    },
  });
});

const browsers = baseResolver.createResolver(async (obj, { top = 10 }, _) => {
  const stringData = await readFile(
    resolve(__dirname, '..', '..', '..', 'data', 'browsers.json'),
    'utf8'
  );
  const data = JSON.parse(stringData);
  return data.slice(0, top);
});

export default {
  Query: {
    browsers,
  },
};
