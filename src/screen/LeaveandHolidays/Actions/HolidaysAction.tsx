import { GET } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { HOLIDAY_LIST } from '../../../services/httpService';

export const holidaylistAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(holidaylistRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: HOLIDAY_LIST,
        apiMethod: GET,
        apiData: credentials,
      });
      dispatch(holidaylistSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(holidaylistFailure(error));
      throw error;
    }
  };
};

export const holidaylistRequest = (credentials: {}) => ({
  type: 'HOLIDAY_LIST_REQUEST',
  payload: credentials,
});

export const holidaylistSuccess = (data: any) => ({
  type: 'HOLIDAY_LIST_SUCCESS',
  payload: data,
});

export const holidaylistFailure = (error: string) => ({
  type: ' HOLIDAY_LIST_FAILURE',
  payload: error,
});
