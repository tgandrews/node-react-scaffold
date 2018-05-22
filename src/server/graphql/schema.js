import { readFileSync } from 'fs';
import { resolve } from 'path';

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = readFileSync(resolve(__dirname, './schema.graphql'), 'utf8');

export default makeExecutableSchema({ typeDefs, resolvers });
