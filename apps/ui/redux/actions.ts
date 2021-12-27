import * as types from './types';
import * as api from '../services/api';
import { async } from 'rxjs';

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
    dispatch(setAnnotation(record, annotation));
  } catch (error) {
    console.log('error??');
    console.error(error);
  }
};
