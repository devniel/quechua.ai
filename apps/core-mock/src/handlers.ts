import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import records from '../../../fixtures/records';

const getRecord = rest.get('/records/:id', (req, res, ctx) => {
  console.log('getRecord()', req.body, req.params);
  return res(
    ctx.json(
      records[req.params.id] || {
        ...records.other,
        text: req.params.id,
      }
    )
  );
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
