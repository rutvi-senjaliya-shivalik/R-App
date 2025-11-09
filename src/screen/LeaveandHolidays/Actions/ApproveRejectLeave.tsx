import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { APPROVE_LEAVE, REJECT_LEAVE } from '../../../services/httpService';

export const approveLeaveAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(approveLeaveRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: APPROVE_LEAVE,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(approveLeaveSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(approveLeaveFailure(error));
      throw error;
    }
  };
};

export const rejectLeaveAction = (credentials: {}) => {
  return async (dispatch: any) => {
    try {
      dispatch(rejectLeaveRequest(credentials));
      const response = await MakeApiRequest({
        apiUrl: REJECT_LEAVE,
        apiMethod: POST,
        apiData: credentials,
      });
      dispatch(rejectLeaveSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(rejectLeaveFailure(error));
      throw error;
    }
  };
};

export const approveLeaveRequest = (credentials: {}) => ({
  type: 'APPROVE_LEAVE_REQUEST',
  payload: credentials,
});
export const approveLeaveSuccess = (data: any) => ({
  type: 'APPROVE_LEAVE_SUCCESS',
  payload: data,
});
export const approveLeaveFailure = (error: any) => ({
  type: 'APPROVE_LEAVE_FAILURE',
  payload: error,
});

export const rejectLeaveRequest = (credentials: {}) => ({
  type: 'REJECT_LEAVE_REQUEST',
  payload: credentials,
});
export const rejectLeaveSuccess = (data: any) => ({
  type: 'REJECT_LEAVE_SUCCESS',
  payload: data,
});
export const rejectLeaveFailure = (error: any) => ({
  type: 'REJECT_LEAVE_FAILURE',
  payload: error,
});
