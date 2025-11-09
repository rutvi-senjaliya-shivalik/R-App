import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { my_LEAVE_REQUEST } from '../../../services/httpService';

export const myleavereqAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(myleavereqRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: my_LEAVE_REQUEST,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(myleavereqSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(myleavereqFailure(error));
      throw error;
    }
  };
};

export const myleavereqRequest = (credentials: {}) => ({
  type: 'HOLIDAY_LIST_REQUEST',
  payload: credentials,
});

export const myleavereqSuccess = (data: any) => ({
  type: 'HOLIDAY_LIST_SUCCESS',
  payload: data,
});

export const myleavereqFailure = (error: string) => ({
  type: ' HOLIDAY_LIST_FAILURE',
  payload: error,
});
