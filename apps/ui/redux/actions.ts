import * as types from './types';
import * as api from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import { push } from 'connected-next-router';

export const setRecord = (record) => ({
  type: types.SET_RECORD,
  payload: record,
});

export const setAnnotation = (record, annotation) => ({
  type: types.SET_ANNOTATION,
  payload: annotation,
});

export const _deleteAnnotation = (record, annotation) => ({
  type: types.DELETE_ANNOTATION,
  payload: annotation,
});

export const _editAnnotation = (record, annotation) => ({
  type: types.EDIT_ANNOTATION,
  payload: annotation,
});

export const _editRecord = (record) => ({
  type: types.EDIT_RECORD,
  payload: record,
});

export const _createRecord = (record) => ({
  type: types.CREATE_RECORD,
  payload: record,
});

export const setSearch = (search) => ({
  type: types.SET_SEARCH,
  payload: search,
});

export const getRecord = (recordId) => async (dispatch) => {
  try {
    const record = await api.getRecord(recordId);
    dispatch(setRecord(record));
  } catch (error) {
    console.error(error);
  }
};

export const addAnnotation = (record, annotation) => async (dispatch) => {
  try {
    //const record = await api.getRecord(recordId);
    console.log('addAnnnotation()', { record, annotation });
    annotation.id = uuidv4();
    dispatch(setAnnotation(record, annotation));
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnnotation = (record, annotation) => async (dispatch) => {
  try {
    //const record = await api.getRecord(recordId);
    console.log('deleteAnnotation()', { record, annotation });
    dispatch(_deleteAnnotation(record, annotation));
  } catch (error) {
    console.error(error);
  }
};

export const editAnnotation = (record, annotation) => async (dispatch) => {
  try {
    console.log('editAnnotation()', { record, annotation });
    dispatch(_editAnnotation(record, annotation));
  } catch (error) {
    console.error(error);
  }
};

export const editRecord = (record) => async (dispatch) => {
  try {
    console.log('editRecord()', { record });
    dispatch(_editRecord(record));
  } catch (error) {
    console.error(error);
  }
};

export const createRecord = (record) => async (dispatch) => {
  try {
    console.log('createRecord()', { record });
    const createdRecord = await api.createRecord(record);
    dispatch(
      push({
        pathname: `/records/${createdRecord.text}`,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const searchRecord =
  ({ query, page }: { query: string; page?: number }) =>
  async (dispatch) => {
    try {
      console.log('searchRecord()', { query, page });
      const search = await api.searchRecord({ query, page });
      dispatch(setSearch(search));
    } catch (error) {
      console.error(error);
    }
  };
