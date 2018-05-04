import morgan from 'koa-morgan';

export default app => app.use(morgan('dev'));
