import { GET, POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { APPLY_LEAVE, HOLIDAY_LIST } from '../../../services/httpService';

export const applyleaveAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(applyleaveRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: APPLY_LEAVE,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(applyleaveSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(applyleaveFailure(error));
      throw error;
    }
  };
};

export const applyleaveRequest = (credentials: {}) => ({
  type: 'HOLIDAY_LIST_REQUEST',
  payload: credentials,
});

export const applyleaveSuccess = (data: any) => ({
  type: 'HOLIDAY_LIST_SUCCESS',
  payload: data,
});

export const applyleaveFailure = (error: string) => ({
  type: ' HOLIDAY_LIST_FAILURE',
  payload: error,
});
