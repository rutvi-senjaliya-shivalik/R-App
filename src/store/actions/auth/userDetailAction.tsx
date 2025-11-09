import { GET } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { GET_PROFILE } from '../../../services/httpService';
import * as types from '../../actionType';
import { otpVarifySuccess } from './otpVarifyAction';

export const userDetailAction = () => {
  return async (dispatch: any) => {
    try {
      dispatch(userDetailRequest());
      const response = await MakeApiRequest({
        apiUrl: GET_PROFILE,
        apiMethod: GET,
      });
      console.log('userDetailAction-response:::', response);
      dispatch(userDetailSuccess(response));
      dispatch(otpVarifySuccess(response?.data?.result));
      return response;
    } catch (error: any) {
      dispatch(userDetailFailure(error));
      throw error;
    }
  };
};

export const userDetailRequest = () => ({
  type: types.USER_DETAIL_REQUEST,
});

export const userDetailSuccess = (payload: any) => ({
  type: types.USER_DETAIL_SUCCESS,
  payload,
});

export const userDetailFailure = (payload: any) => ({
  type: types.USER_DETAIL_FAILURE,
  payload,
});

export const userDetailClear = () => ({
  type: types.USER_DETAIL_CLEAR,
});
