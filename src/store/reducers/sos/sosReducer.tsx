/**
 * SOS Emergency Alert Reducer
 * 
 * Manages state for SOS emergency alerts
 */

import * as types from '../../actionType';

interface SOSState {
  loading: boolean;
  sosData: any;
  error: any;
}

const initialState: SOSState = {
  loading: false,
  sosData: null,
  error: null,
};

export const sosReducer = (
  state = initialState,
  action: any
): SOSState => {
  switch (action.type) {
    case types.SOS_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.SOS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        sosData: action.payload,
        error: null,
      };

    case types.SOS_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.SOS_CREATE_CLEAR:
      return initialState;

    default:
      return state;
  }
};

