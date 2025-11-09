import { GET, POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { HOLIDAY_LIST, MY_LEAVE_BALANCE } from '../../../services/httpService';

export const leavebalanceAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(leavebalanceRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: MY_LEAVE_BALANCE,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(leavebalanceSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(leavebalanceFailure(error));
      throw error;
    }
  };
};

export const leavebalanceRequest = (credentials: {}) => ({
  type: 'HOLIDAY_LIST_REQUEST',
  payload: credentials,
});

export const leavebalanceSuccess = (data: any) => ({
  type: 'HOLIDAY_LIST_SUCCESS',
  payload: data,
});

export const leavebalanceFailure = (error: string) => ({
  type: ' HOLIDAY_LIST_FAILURE',
  payload: error,
});
