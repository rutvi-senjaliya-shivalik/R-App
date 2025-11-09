import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_EMERGENCY_CONTACTS } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";
import { getSocietyIdFromToken } from "../../../utils/tokenHelper";

export const getEmergencyContactsAction = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getEmergencyContactsRequest());

      console.log('📞 Fetching emergency contacts...');

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
        }
      } else {
        console.warn('⚠️ No token available for society ID extraction');
      }

      // Build API URL with society ID as query parameter
      let apiUrl = GET_EMERGENCY_CONTACTS;
      if (societyId) {
        apiUrl = `${apiUrl}?societyId=${societyId}`;
      }
      
      console.log('API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      console.log('✅ Emergency contacts response:', response?.data);
      dispatch(getEmergencyContactsSuccess(response));
      return response;
    } catch (error: any) {
      console.error('❌ Get emergency contacts error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getEmergencyContactsFailure(error));
      throw error;
    }
  };
};

export const getEmergencyContactsRequest = () => ({
  type: types.GET_EMERGENCY_CONTACTS_REQUEST,
});

export const getEmergencyContactsSuccess = (response: any) => ({
  type: types.GET_EMERGENCY_CONTACTS_SUCCESS,
  payload: response,
});

export const getEmergencyContactsFailure = (error: any) => ({
  type: types.GET_EMERGENCY_CONTACTS_FAILURE,
  payload: error,
});

export const getEmergencyContactsClear = () => ({
  type: types.GET_EMERGENCY_CONTACTS_CLEAR,
});

