import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const getNoticesListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_NOTICES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_NOTICES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.GET_NOTICES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.GET_NOTICES_LIST_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default getNoticesListReducer;

