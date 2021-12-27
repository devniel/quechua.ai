import { Record } from '@quechua.ai/entities';
import { combineReducers } from 'redux';
import * as types from './types';

const recordsReducer = (state: Record | null = null, { type, payload }) => {
  console.log({ type, payload });
  switch (type) {
    case types.SET_RECORD:
      return payload;
    case types.SET_ANNOTATION:
      const record = state;
      record?.annotations.push(payload);
      return record;
    default:
      return state;
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
