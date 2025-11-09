import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const cancelEventRegistrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CANCEL_EVENT_REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CANCEL_EVENT_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.CANCEL_EVENT_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.CANCEL_EVENT_REGISTRATION_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default cancelEventRegistrationReducer;

