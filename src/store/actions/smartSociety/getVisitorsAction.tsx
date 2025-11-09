import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_VISITORS } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";
import { getSocietyIdFromToken } from "../../../utils/tokenHelper";

export const getVisitorsAction = (params?: { status?: string; page?: number }) => {
  return async (dispatch: any) => {
    try {
      dispatch(getVisitorsRequest());

      console.log('📞 Fetching visitors list...', params);

      // Get token and extract society ID (same format as amenities)
      const token = await PrefManager.getValue(STRING.TOKEN);
      console.log('🔑 Token check:', {
        exists: !!token,
        type: typeof token,
        isString: typeof token === 'string',
        length: token?.length || 0,
      });
      
      // Validate token exists
      if (!token) {
        console.error('❌ No token found! This will cause 401 error.');
        console.error('  Please ensure user is logged in and token is saved.');
        throw new Error('No authentication token found. Please login again.');
      }
      
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
      
      // Validate token format (should be a JWT-like string)
      if (typeof cleanToken !== 'string' || cleanToken.trim().length < 10) {
        console.error('❌ Invalid token format!');
        console.error('  Token type:', typeof cleanToken);
        console.error('  Token length:', cleanToken?.length || 0);
        throw new Error('Invalid authentication token. Please login again.');
      }
      
      let societyId = null;
      if (cleanToken) {
        try {
          societyId = getSocietyIdFromToken(cleanToken);
          console.log('🏢 Society ID extracted:', societyId);
        } catch (error) {
          console.error('❌ Error extracting society ID from token:', error);
          // Continue without society ID if extraction fails
        }
      } else {
        console.warn('⚠️ No token available for society ID extraction');
      }

      // Build API URL with society ID and other query parameters
      let apiUrl = GET_VISITORS;
      const queryParams: string[] = [];
      
      // Add society ID first (same as amenities)
      if (societyId) {
        queryParams.push(`societyId=${societyId}`);
      }
      
      // Add other query parameters if provided
      if (params?.status) {
        queryParams.push(`status=${params.status}`);
      }
      if (params?.page) {
        queryParams.push(`page=${params.page}`);
      }
      
      if (queryParams.length > 0) {
        apiUrl = `${apiUrl}?${queryParams.join('&')}`;
      }
      
      console.log('API URL:', apiUrl);
      console.log('🔑 Token will be automatically added to Authorization header by MakeApiRequest');

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      console.log('✅ Visitors list response:', response?.data);
      console.log('✅ Response status:', response?.status);
      dispatch(getVisitorsSuccess(response));
      return response;
    } catch (error: any) {
      console.error('❌ Get visitors error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getVisitorsFailure(error));
      throw error;
    }
  };
};

export const getVisitorsRequest = () => ({
  type: types.GET_VISITORS_REQUEST,
});

export const getVisitorsSuccess = (payload: any) => ({
  type: types.GET_VISITORS_SUCCESS,
  payload,
});

export const getVisitorsFailure = (payload: any) => ({
  type: types.GET_VISITORS_FAILURE,
  payload,
});

export const getVisitorsClear = () => ({
  type: types.GET_VISITORS_CLEAR,
});

