import { rest } from 'msw';
import record from '../../../fixtures/record.json';

const getRecord = rest.get('/records/:recordId', (req, res, ctx) => {
  console.log('getRecord()');
  return res(ctx.json(record));
});

export const handlers = [getRecord];
