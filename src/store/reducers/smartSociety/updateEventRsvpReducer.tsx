import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const updateEventRsvpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.UPDATE_EVENT_RSVP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_EVENT_RSVP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.UPDATE_EVENT_RSVP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.UPDATE_EVENT_RSVP_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default updateEventRsvpReducer;

