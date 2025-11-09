import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const createNoticeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_NOTICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.CREATE_NOTICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.CREATE_NOTICE_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default createNoticeReducer;

