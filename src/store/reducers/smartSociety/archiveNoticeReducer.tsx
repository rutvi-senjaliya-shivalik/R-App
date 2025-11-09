import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const archiveNoticeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ARCHIVE_NOTICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ARCHIVE_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.ARCHIVE_NOTICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case types.ARCHIVE_NOTICE_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default archiveNoticeReducer;

