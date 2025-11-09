import { PUT } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { ARCHIVE_NOTICE } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";

export const archiveNoticeAction = (noticeId: string, reason?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(archiveNoticeRequest());

      console.log('Archiving Notice', { noticeId, reason });

      // Get user info
      const user = await PrefManager.getValue(STRING.USER);
      let userId = null;
      if (user && typeof user === 'object') {
        userId = user.id || user.userId || user._id;
      }

      const apiUrl = ARCHIVE_NOTICE(noticeId);
      console.log('📡 Final API URL:', apiUrl);

      const requestData = {
        archivedBy: userId || undefined,
        reason: reason || 'Archived by admin',
        archivedAt: new Date().toISOString(),
      };

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: PUT,
        apiData: requestData,
      });

      dispatch(archiveNoticeSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Archive Notice Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(archiveNoticeFailure(error));
      throw error;
    }
  };
};

export const archiveNoticeRequest = () => ({
  type: types.ARCHIVE_NOTICE_REQUEST,
});

export const archiveNoticeSuccess = (payload: any) => ({
  type: types.ARCHIVE_NOTICE_SUCCESS,
  payload,
});

export const archiveNoticeFailure = (payload: any) => ({
  type: types.ARCHIVE_NOTICE_FAILURE,
  payload,
});

export const archiveNoticeClear = () => ({
  type: types.ARCHIVE_NOTICE_CLEAR,
});

