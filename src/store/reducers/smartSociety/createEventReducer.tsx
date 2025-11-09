import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const createEventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.CREATE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.CREATE_EVENT_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default createEventReducer;

