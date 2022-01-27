import { Record } from '@quechua.ai/entities';
import { combineReducers } from 'redux';
import * as types from './types';

const recordsReducer = (state: Record | null = null, { type, payload }) => {
  console.log({ type, payload });
  const record = JSON.parse(JSON.stringify(state));
  switch (type) {
    case types.SET_RECORD: {
      return payload;
    }
    case types.SET_ANNOTATION: {
      record?.annotations.push(payload);
      return record;
    }
    case types.DELETE_ANNOTATION: {
      const annotation = payload;
      console.log(' DELETE_ANNOTATION', annotation);
      const idx = record?.annotations.findIndex(
        (a) => a.start === annotation.start && a.end === annotation.end
      );
      if (idx !== -1) record?.annotations.splice(idx, 1);
      return record;
    }
    case types.EDIT_ANNOTATION: {
      const annotation = payload;
      console.log('EDIT_ANNOTATION', annotation);
      const idx = record?.annotations.findIndex((a) => a.id === annotation.id);
      if (idx !== -1) record.annotations[idx] = annotation;
      return record;
    }
    case types.EDIT_RECORD: {
      const updatedRecord = payload;
      updatedRecord.annotations =
        updatedRecord.text === record.text ? record?.annotations : [];
      return updatedRecord;
    }
    default:
      return record;
  }
};

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return 0;
    default:
      return state;
  }
};

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
};

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  record: recordsReducer,
};

export default combineReducers(reducers);
