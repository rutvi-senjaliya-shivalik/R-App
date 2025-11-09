/**
 * SOS Emergency Alert Action
 * 
 * Handles creating emergency SOS alerts by sending type to backend
 * Types: "Medical Emergency", "Fire Emergency", "Theft"
 */

import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { CREATE_SOS } from '../../../services/httpService';
import * as types from '../../actionType';

/**
 * SOS Emergency Types
 */
export type SOSEmergencyType = 'Medical Emergency' | 'Fire Emergency' | 'Theft';

/**
 * Create SOS Alert Action
 * 
 * @param emergencyType - Type of emergency (Medical Emergency, Fire Emergency, Theft)
 * @returns Promise with API response
 */
export const createSOSAction = (emergencyType: SOSEmergencyType) => {
  return async (dispatch: any) => {
    console.log('Creating SOS alert:', emergencyType);
    
    try {
      dispatch(sosCreateRequest(emergencyType));
      
      const response = await MakeApiRequest({
        apiUrl: CREATE_SOS,
        apiMethod: POST,
        apiData: {
          type: emergencyType,
        },
      });
      
      console.log('SOS Alert Created:', response?.data);
      dispatch(sosCreateSuccess(response?.data));
      
      return response;
    } catch (error: any) {
      console.error('SOS Alert Creation Failed:', error);
      dispatch(sosCreateFailure(error));
      throw error;
    }
  };
};

/**
 * SOS Create Request Action
 */
export const sosCreateRequest = (emergencyType: SOSEmergencyType) => ({
  type: types.SOS_CREATE_REQUEST,
  payload: { type: emergencyType },
});

/**
 * SOS Create Success Action
 */
export const sosCreateSuccess = (data: any) => ({
  type: types.SOS_CREATE_SUCCESS,
  payload: data,
});

/**
 * SOS Create Failure Action
 */
export const sosCreateFailure = (error: any) => ({
  type: types.SOS_CREATE_FAILURE,
  payload: error,
});

/**
 * SOS Create Clear Action
 */
export const sosCreateClear = () => ({
  type: types.SOS_CREATE_CLEAR,
});

