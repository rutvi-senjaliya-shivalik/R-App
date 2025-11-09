import * as types from '../../actionType';
import { RegisterResponseModel } from '../../../types/models/register';

const initialState: {
  loading: boolean;
  loginData: RegisterResponseModel | null;
  error: string;
} = {
  loading: false,
  loginData: null,
  error: '',
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginData: action.payload,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.LOGIN_CLEAR:
      return {
        ...state,
        loading: false,
        error: {},
        loginData: undefined,
      };
    default:
      return state;
  }
};

export default authReducer;
