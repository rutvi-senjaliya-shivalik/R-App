import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const getVisitorsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_VISITORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_VISITORS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.GET_VISITORS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.GET_VISITORS_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default getVisitorsReducer;

