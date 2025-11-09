import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const addVisitorEntryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ADD_VISITOR_ENTRY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_VISITOR_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.ADD_VISITOR_ENTRY_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.ADD_VISITOR_ENTRY_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default addVisitorEntryReducer;

