import * as types from '../../actionType';
import { UserModel } from '.././../../types/models';

const initialState: {
  loading: boolean;
  userData: UserModel | null;
  error: string;
} = {
  loading: false,
  userData: null,
  error: '',
};

const otpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.OTP_VARIFY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.OTP_VARIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case types.OTP_VARIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.OTP_VARIFY_CLEAR:
      return {
        ...state,
        loading: false,
        error: {},
        otpVarifyData: undefined,
      };
    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userData: action.payload.userData,
        isAuthenticated: true,
      };
    case types.UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        userData: null,
        isAuthenticated: false,
        otpVarifyData: undefined,
        error: {},
      };
    default:
      return state;
  }
};

export default otpReducer;
