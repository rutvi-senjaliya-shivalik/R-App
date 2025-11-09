import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { MANAGER_LEAVE_REQUEST } from '../../../services/httpService';

export const managerleavereqAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(managerleavereqRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: MANAGER_LEAVE_REQUEST,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(managerleavereqSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(managerleavereqFailure(error));
      throw error;
    }
  };
};

export const managerleavereqRequest = (credentials: {}) => ({
  type: 'MANAGER_LEAVE_REQUEST_REQUEST',
  payload: credentials,
});

export const managerleavereqSuccess = (data: any) => ({
  type: 'MANAGER_LEAVE_REQUEST_SUCCESS',
  payload: data,
});

export const managerleavereqFailure = (error: string) => ({
  type: 'MANAGER_LEAVE_REQUEST_FAILURE',
  payload: error,
});
