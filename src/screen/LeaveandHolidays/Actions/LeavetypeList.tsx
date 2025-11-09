import { GET, POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { LEAVE_TYPE_LIST } from '../../../services/httpService';

export const leavetypelistAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(leavetypelistRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: LEAVE_TYPE_LIST,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(leavetypelistSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(leavetypelistFailure(error));
      throw error;
    }
  };
};

export const leavetypelistRequest = (credentials: {}) => ({
  type: 'HOLIDAY_LIST_REQUEST',
  payload: credentials,
});

export const leavetypelistSuccess = (data: any) => ({
  type: 'HOLIDAY_LIST_SUCCESS',
  payload: data,
});

export const leavetypelistFailure = (error: string) => ({
  type: ' HOLIDAY_LIST_FAILURE',
  payload: error,
});
