import { PUT } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { PUBLISH_NOTICE } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";

export const publishNoticeAction = (noticeId: string, notificationChannels?: string[]) => {
  return async (dispatch: any) => {
    try {
      dispatch(publishNoticeRequest());

      console.log('Publishing Notice', { noticeId, notificationChannels });

      // Get user info
      const user = await PrefManager.getValue(STRING.USER);
      let userId = null;
      if (user && typeof user === 'object') {
        userId = user.id || user.userId || user._id;
      }

      const apiUrl = PUBLISH_NOTICE(noticeId);
      console.log('📡 Final API URL:', apiUrl);

      const requestData = {
        publishedBy: userId || undefined,
        publishedAt: new Date().toISOString(),
        notificationChannels: notificationChannels || ['app'],
      };

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: PUT,
        apiData: requestData,
      });

      dispatch(publishNoticeSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Publish Notice Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(publishNoticeFailure(error));
      throw error;
    }
  };
};

export const publishNoticeRequest = () => ({
  type: types.PUBLISH_NOTICE_REQUEST,
});

export const publishNoticeSuccess = (payload: any) => ({
  type: types.PUBLISH_NOTICE_SUCCESS,
  payload,
});

export const publishNoticeFailure = (payload: any) => ({
  type: types.PUBLISH_NOTICE_FAILURE,
  payload,
});

export const publishNoticeClear = () => ({
  type: types.PUBLISH_NOTICE_CLEAR,
});

