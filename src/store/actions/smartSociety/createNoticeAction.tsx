import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CREATE_NOTICE } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";
import { getSocietyIdFromToken } from "../../../utils/tokenHelper";

export const createNoticeAction = (noticeData: {
  title: string;
  description: string;
  category: string;
  priority: string;
  targetAudience?: string[];
  targetUnits?: string[];
  attachments?: Array<{ fileName: string; fileUrl: string }>;
  validFrom?: string;
  validUntil?: string;
  societyId?: string;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(createNoticeRequest());

      console.log('Creating Notice', noticeData);

      // Get society ID from params first, otherwise extract from token
      let societyId = noticeData?.societyId || null;

      if (!societyId) {
        // Get token and extract society ID
        const token = await PrefManager.getValue(STRING.TOKEN);
        
        // Handle token if it's stored as JSON string
        let cleanToken = token;
        if (token && typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
          try {
            cleanToken = JSON.parse(token);
          } catch (e) {
            cleanToken = token;
          }
        }

        if (cleanToken) {
          try {
            societyId = getSocietyIdFromToken(cleanToken);
            console.log('🏢 Society ID extracted from token:', societyId);
          } catch (error) {
            console.error('❌ Error extracting society ID from token:', error);
          }
        }
      }

      // Get user info
      const user = await PrefManager.getValue(STRING.USER);
      let userId = null;
      if (user && typeof user === 'object') {
        userId = user.id || user.userId || user._id;
      }

      // Ensure required fields are present and trimmed
      const trimmedTitle = noticeData.title?.trim() || '';
      const trimmedDescription = noticeData.description?.trim() || '';
      
      if (!trimmedTitle) {
        throw new Error('Title is required');
      }
      
      if (!trimmedDescription) {
        throw new Error('Description is required');
      }
      
      if (!noticeData.category) {
        throw new Error('Category is required');
      }
      
      if (!noticeData.priority) {
        throw new Error('Priority is required');
      }

      const requestData: any = {
        title: trimmedTitle,
        description: trimmedDescription,
        category: noticeData.category,
        priority: noticeData.priority,
      };

      // Add optional fields
      if (noticeData.targetAudience && Array.isArray(noticeData.targetAudience) && noticeData.targetAudience.length > 0) {
        requestData.targetAudience = noticeData.targetAudience;
      }
      
      if (noticeData.targetUnits && Array.isArray(noticeData.targetUnits) && noticeData.targetUnits.length > 0) {
        requestData.targetUnits = noticeData.targetUnits;
      }
      
      if (noticeData.attachments && Array.isArray(noticeData.attachments) && noticeData.attachments.length > 0) {
        requestData.attachments = noticeData.attachments;
      }
      
      // Start date is required
      const startDate = noticeData.startDate || noticeData.validFrom || new Date().toISOString().split('T')[0];
      requestData.startDate = startDate;
      
      // Also include validFrom for backward compatibility
      if (noticeData.validFrom) {
        requestData.validFrom = noticeData.validFrom;
      }
      
      // End date is optional
      if (noticeData.endDate) {
        requestData.endDate = noticeData.endDate;
      } else if (noticeData.validUntil) {
        requestData.endDate = noticeData.validUntil.split('T')[0]; // Extract date part if ISO string
        requestData.validUntil = noticeData.validUntil;
      }
      
      if (societyId) {
        requestData.societyId = societyId;
      }
      
      if (userId) {
        requestData.createdBy = userId;
      }

      console.log('📤 Sending notice data:', JSON.stringify(requestData, null, 2));

      const response = await MakeApiRequest({
        apiUrl: CREATE_NOTICE,
        apiMethod: POST,
        apiData: requestData,
      });

      dispatch(createNoticeSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Create Notice Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(createNoticeFailure(error));
      throw error;
    }
  };
};

export const createNoticeRequest = () => ({
  type: types.CREATE_NOTICE_REQUEST,
});

export const createNoticeSuccess = (payload: any) => ({
  type: types.CREATE_NOTICE_SUCCESS,
  payload,
});

export const createNoticeFailure = (payload: any) => ({
  type: types.CREATE_NOTICE_FAILURE,
  payload,
});

export const createNoticeClear = () => ({
  type: types.CREATE_NOTICE_CLEAR,
});

