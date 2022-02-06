import { Record } from '@quechua.ai/entities';
import Chance from 'chance';
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

const searchRecord = rest.get('/search', (req, res, ctx) => {
  console.log('searchRecord()', req.body, req.params, req.url.searchParams);
  const chance = new Chance();
  const query = req.url.searchParams.get('query');
  const page = Number(req.url.searchParams.get('page') || 1);
  const pageSize = Number(req.url.searchParams.get('pageSize') || 20);
  if (query == 'empty') {
    return res(
      ctx.json({
        query,
        results: [],
        page,
        pageSize,
        total: 0,
      })
    );
  }
  const results = Array.from({
    length: chance.integer({ min: 50, max: 300 }),
  }).map(() => Record.fake());
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return res(
    ctx.json({
      query,
      results: results.slice(start, end),
      page,
      pageSize,
      total: results.length,
    })
  );
});

export const handlers = [getRecord, createRecord, searchRecord];
