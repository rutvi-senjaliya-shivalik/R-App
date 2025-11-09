import { PUT } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import * as types from '../../actionType';
import { UPDATE_PROFILE } from '../../../services/httpService';
import { otpVarifySuccess } from './otpVarifyAction';

export const profileAction = (payload: any) => {
  return async (dispatch: any) => {
    console.log('profileAction:::', payload);
    try {
      dispatch(profileRequest(payload));
      const response = await MakeApiRequest({
        apiUrl: UPDATE_PROFILE,
        apiMethod: PUT,
        apiData: payload,
      });
      console.log('UPDATE_PROFILE-response.data', response.data);
      dispatch(otpVarifySuccess(response?.data?.result));
      return response;
    } catch (error: any) {
      dispatch(profileFailure(error));
      throw error;
    }
  };
};

export const profileRequest = (payload: any) => ({
  type: types.PROFILE_REQUEST,
  payload: payload,
});

export const profileSuccess = (data: any) => ({
  type: types.PROFILE_SUCCESS,
  payload: data,
});

export const profileFailure = (error: string) => ({
  type: types.PROFILE_FAILURE,
  payload: error,
});
