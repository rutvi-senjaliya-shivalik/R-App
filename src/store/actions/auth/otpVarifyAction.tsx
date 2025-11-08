import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { OTP_VERIFY } from '../../../services/httpService';
import * as types from '../../actionType';

export const otpVarifyAction = (credentials: {
  countryCode: string;
  mobileNumber: string;
  otp: string;
}) => {
  return async (dispatch: any) => {
    console.log('otpVarifyAction:::', credentials);
    try {
      dispatch(otpVarifyRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: OTP_VERIFY,
        apiMethod: POST,
        apiData: credentials,
      });
      console.log('response:::', response);
      dispatch(otpVarifySuccess(response?.data?.result));
      return response;
    } catch (error: any) {
      dispatch(otpVarifyFailure(error));
      throw error;
    }
  };
};

export const otpVarifyRequest = (credentials: {
  countryCode: string;
  mobileNumber: string;
  otp: string;
}) => ({
  type: types.OTP_VARIFY_REQUEST,
  payload: credentials,
});

export const otpVarifySuccess = (data: any) => ({
  type: types.OTP_VARIFY_SUCCESS,
  payload: data,
});

export const otpVarifyFailure = (error: string) => ({
  type: types.OTP_VARIFY_FAILURE,
  payload: error,
});
