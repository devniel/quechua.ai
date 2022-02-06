import axios from 'axios';
import { Record } from '@quechua.ai/entities';
import { BASE_API_URL } from '../constants/constants';

axios.defaults.baseURL = BASE_API_URL;

export const getRecord = async function (recordId: string): Promise<Record> {
  return (await axios.get(`/records/${recordId}`))?.data;
};

export const createRecord = async function (record: Record): Promise<Record> {
  return (await axios.post(`/records/`, record))?.data;
};

export const searchRecord = async function ({
  query,
  page,
}: {
  query: string;
  page?: number;
}): Promise<Record[]> {
  return (
    await axios.get(`/search`, {
      params: {
        query,
        page,
      },
    })
  )?.data;
};
