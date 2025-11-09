import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const getNoticeDetailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_NOTICE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_NOTICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.GET_NOTICE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.GET_NOTICE_DETAIL_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default getNoticeDetailReducer;

