import axios from 'axios';
import { Record } from '@quechua.ai/entities';

export const getRecord = async function (recordId: string): Promise<Record> {
  return (await axios.get(`/api-mock/records/${recordId}`))?.data;
};

export const createRecord = async function (record: Record): Promise<Record> {
  return (await axios.post(`/api-mock/records/`, record))?.data;
};

export const searchRecord = async function ({
  query,
  page,
}: {
  query: string;
  page?: number;
}): Promise<Record[]> {
  return (
    await axios.get('/api-mock/search', {
      params: {
        query,
        page,
      },
    })
  )?.data;
};
