import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_NOTICE_DETAIL } from "../../../services/httpService";
import * as types from "../../actionType";

export const getNoticeDetailAction = (noticeId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(getNoticeDetailRequest());

      console.log('Getting Notice Detail', noticeId);

      const apiUrl = GET_NOTICE_DETAIL(noticeId);
      console.log('📡 Final API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      dispatch(getNoticeDetailSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Get Notice Detail Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getNoticeDetailFailure(error));
      throw error;
    }
  };
};

export const getNoticeDetailRequest = () => ({
  type: types.GET_NOTICE_DETAIL_REQUEST,
});

export const getNoticeDetailSuccess = (payload: any) => ({
  type: types.GET_NOTICE_DETAIL_SUCCESS,
  payload,
});

export const getNoticeDetailFailure = (payload: any) => ({
  type: types.GET_NOTICE_DETAIL_FAILURE,
  payload,
});

export const getNoticeDetailClear = () => ({
  type: types.GET_NOTICE_DETAIL_CLEAR,
});

