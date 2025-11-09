import { GET } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { GET_COMPLAINTS_LIST_API } from '../../../services/httpService';
import * as types from '../../actionType';

export const getComplaintsListAction = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getComplaintsListRequest());
      const response = await MakeApiRequest({
        apiUrl: GET_COMPLAINTS_LIST_API,
        apiMethod: GET,
      });
      console.log('Complaints List Response:', response);
      dispatch(getComplaintsListSuccess(response?.data?.result?.complaints));
      return response;
    } catch (error: any) {
      console.log('Complaints List Error:', error);
      dispatch(getComplaintsListFailure(error));
      throw error;
    }
  };
};

export const getComplaintsListRequest = () => ({
  type: types.GET_COMPLAINTS_LIST_REQUEST,
});

export const getComplaintsListSuccess = (payload: any) => ({
  type: types.GET_COMPLAINTS_LIST_SUCCESS,
  payload,
});

export const getComplaintsListFailure = (payload: any) => ({
  type: types.GET_COMPLAINTS_LIST_FAILURE,
  payload,
});

export const getComplaintsListClear = () => ({
  type: types.GET_COMPLAINTS_LIST_CLEAR,
});

