import { GET, POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { LEAVE_TYPE_LIST, LOGOUT } from '../../../services/httpService';


export const logoutAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(logoutRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: LOGOUT,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(logoutSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(logoutFailure(error));
      throw error;
    }
  };
};

export const logoutRequest = (credentials: {}) => ({
  type: 'LOGOUT_REQUEST',
  payload: credentials,
});

export const logoutSuccess = (data: any) => ({
  type: 'LOGOUT_SUCCESS',
  payload: data,
});

export const logoutFailure = (error: string) => ({
  type: ' LOGOUT_FAILURE',
  payload: error,
});
