import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_NOTICES_LIST } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";
import { getSocietyIdFromToken } from "../../../utils/tokenHelper";

export const getNoticesListAction = (params?: { page?: number; limit?: number; status?: string; category?: string; priority?: string; societyId?: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch(getNoticesListRequest());

      console.log('Getting Notices List Data', params);

      // Get society ID from params first, otherwise extract from token
      let societyId = params?.societyId || null;
      
      if (!societyId) {
        // Get token and extract society ID
        const token = await PrefManager.getValue(STRING.TOKEN);
        console.log('🔑 Token check:', {
          exists: !!token,
          type: typeof token,
          isString: typeof token === 'string',
        });
        
        // Handle token if it's stored as JSON string
        let cleanToken = token;
        if (token && typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
          try {
            cleanToken = JSON.parse(token);
            console.log('✅ Token was JSON stringified, parsed successfully');
          } catch (e) {
            console.log('⚠️ Token parsing failed, using as is');
            cleanToken = token;
          }
        }
        
        if (cleanToken) {
          try {
            societyId = getSocietyIdFromToken(cleanToken);
            console.log('🏢 Society ID extracted from token:', societyId);
          } catch (error) {
            console.error('❌ Error extracting society ID from token:', error);
            // Continue without society ID if extraction fails
          }
        } else {
          console.warn('⚠️ No token available for society ID extraction');
        }
      } else {
        console.log('🏢 Society ID from params:', societyId);
      }

      // Build API URL with query parameters including society ID
      const apiUrl = GET_NOTICES_LIST({
        ...params,
        societyId: societyId || undefined,
      });
      
      console.log('📡 Final API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      dispatch(getNoticesListSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Get Notices List Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getNoticesListFailure(error));
      throw error;
    }
  };
};

export const getNoticesListRequest = () => ({
  type: types.GET_NOTICES_LIST_REQUEST,
});

export const getNoticesListSuccess = (payload: any) => ({
  type: types.GET_NOTICES_LIST_SUCCESS,
  payload,
});

export const getNoticesListFailure = (payload: any) => ({
  type: types.GET_NOTICES_LIST_FAILURE,
  payload,
});

export const getNoticesListClear = () => ({
  type: types.GET_NOTICES_LIST_CLEAR,
});

