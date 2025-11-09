import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_EVENT_DETAIL } from "../../../services/httpService";
import * as types from "../../actionType";

export const getEventDetailAction = (eventId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(getEventDetailRequest());

      console.log('Getting Event Detail', eventId);

      const apiUrl = GET_EVENT_DETAIL(eventId);
      console.log('📡 Final API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      dispatch(getEventDetailSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Get Event Detail Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getEventDetailFailure(error));
      throw error;
    }
  };
};

export const getEventDetailRequest = () => ({
  type: types.GET_EVENT_DETAIL_REQUEST,
});

export const getEventDetailSuccess = (payload: any) => ({
  type: types.GET_EVENT_DETAIL_SUCCESS,
  payload,
});

export const getEventDetailFailure = (payload: any) => ({
  type: types.GET_EVENT_DETAIL_FAILURE,
  payload,
});

export const getEventDetailClear = () => ({
  type: types.GET_EVENT_DETAIL_CLEAR,
});

