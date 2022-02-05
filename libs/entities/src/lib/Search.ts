import { Record } from '..';

export class Search {
  query: string;
  results: Record[];
  page: number;
  pageSize: number;
  total: number;
}
