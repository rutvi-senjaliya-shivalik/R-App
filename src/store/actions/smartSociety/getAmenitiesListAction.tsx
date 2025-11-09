import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_AMENITIES_LIST } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";
import { getSocietyIdFromToken } from "../../../utils/tokenHelper";

export const getAmenitiesListAction = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getAmenitiesListRequest());

      console.log('Getting Amenities List Data');

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

      // Build API URL with society ID as query parameter
      let apiUrl = GET_AMENITIES_LIST;
      if (societyId) {
        const separator = apiUrl.includes('?') ? '&' : '?';
        apiUrl = `${apiUrl}${separator}societyId=${societyId}`;
      }
      
      console.log('API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      dispatch(getAmenitiesListSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Get Amenities List Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getAmenitiesListFailure(error));
      throw error;
    }
  };
};

export const getAmenitiesListRequest = () => ({
  type: types.GET_AMENITIES_LIST_REQUEST,
});

export const getAmenitiesListSuccess = (payload: any) => ({
  type: types.GET_AMENITIES_LIST_SUCCESS,
  payload,
});

export const getAmenitiesListFailure = (payload: any) => ({
  type: types.GET_AMENITIES_LIST_FAILURE,
  payload,
});

export const getAmenitiesListClear = () => ({
  type: types.GET_AMENITIES_LIST_CLEAR,
});

