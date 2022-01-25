import * as types from './types';
import * as api from '../services/api';
import { async } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  });

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } });
  }, 1000);

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT });

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET });

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
