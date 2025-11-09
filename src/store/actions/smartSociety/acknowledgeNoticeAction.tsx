import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { ACKNOWLEDGE_NOTICE } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";

export const acknowledgeNoticeAction = (noticeId: string, unitNumber?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(acknowledgeNoticeRequest());

      console.log('Acknowledging Notice', { noticeId, unitNumber });

      // Get user info
      const user = await PrefManager.getValue(STRING.USER);
      let userId = null;
      if (user && typeof user === 'object') {
        userId = user.id || user.userId || user._id;
      }

      const apiUrl = ACKNOWLEDGE_NOTICE(noticeId);
      console.log('📡 Final API URL:', apiUrl);

      const requestData = {
        userId: userId || undefined,
        unitNumber: unitNumber || undefined,
        acknowledgedAt: new Date().toISOString(),
        method: 'app',
      };

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: POST,
        apiData: requestData,
      });

      dispatch(acknowledgeNoticeSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Acknowledge Notice Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(acknowledgeNoticeFailure(error));
      throw error;
    }
  };
};

export const acknowledgeNoticeRequest = () => ({
  type: types.ACKNOWLEDGE_NOTICE_REQUEST,
});

export const acknowledgeNoticeSuccess = (payload: any) => ({
  type: types.ACKNOWLEDGE_NOTICE_SUCCESS,
  payload,
});

export const acknowledgeNoticeFailure = (payload: any) => ({
  type: types.ACKNOWLEDGE_NOTICE_FAILURE,
  payload,
});

export const acknowledgeNoticeClear = () => ({
  type: types.ACKNOWLEDGE_NOTICE_CLEAR,
});

