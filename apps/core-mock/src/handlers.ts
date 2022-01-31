import { rest } from 'msw';
import record from '../../../fixtures/record.json';
import { v4 as uuidv4 } from 'uuid';

const getRecord = rest.get('/records/:recordId', (req, res, ctx) => {
  console.log('getRecord()');
  return res(ctx.json(record));
});

const createRecord = rest.post('/records', (req, res, ctx) => {
  console.log('createRecord()', req.body);
  const data = req.body as any;
  return res(
    ctx.json({
      ...data,
      id: uuidv4(),
    })
  );
});

export const handlers = [getRecord, createRecord];
