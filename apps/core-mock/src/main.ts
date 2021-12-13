import express from 'express';
import { handlers } from './handlers';
import { createMiddleware } from '@mswjs/http-middleware';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(createMiddleware(...handlers));
if (process.env.NODE_ENV != 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
  });
}
