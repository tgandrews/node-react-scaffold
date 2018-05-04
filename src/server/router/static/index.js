import development, { state as devState } from './development';
import production, { state as prodState } from './production';

const isDev = process.env.NODE_ENV === 'development';

export const state = isDev ? devState : prodState;
const exported = isDev ? development : production;
export default exported;
