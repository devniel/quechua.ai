import { Record } from '@quechua.ai/entities';
import { combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from 'connected-next-router';
import * as types from './types';

const recordsReducer = (state: Record | null = null, { type, payload }) => {
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
      const idx = record?.annotations.findIndex(
        (a) => a.start === annotation.start && a.end === annotation.end
      );
      if (idx !== -1) record?.annotations.splice(idx, 1);
      return record;
    }
    case types.EDIT_ANNOTATION: {
      const annotation = payload;
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
    case types.CREATE_RECORD: {
      return payload;
    }
    default:
      return record;
  }
};

/**
 * Router reducer
 */
// Using next-redux-wrapper's initStore
export const mainReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

// COMBINED REDUCERS
const rootReducer = combineReducers({
  record: recordsReducer,
  router: routerReducer,
});

export default rootReducer;
