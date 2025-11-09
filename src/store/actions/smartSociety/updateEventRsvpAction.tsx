import { POST, PUT } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { REGISTER_EVENT, CANCEL_REGISTRATION } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";

export const updateEventRsvpAction = (eventId: string, rsvpStatus: 'Going' | 'Maybe' | 'Not Going') => {
  return async (dispatch: any) => {
    try {
      dispatch(updateEventRsvpRequest());

      console.log('Registering for Event', { eventId, rsvpStatus });

      const apiUrl = REGISTER_EVENT(eventId);
      console.log('📡 Final API URL:', apiUrl);

      // Simplified request body - API should extract user from token
      // Try multiple formats to match API expectations
      const requestData = {
        status: rsvpStatus,
      };

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: POST,
        apiData: requestData,
      });

      dispatch(updateEventRsvpSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Register Event Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(updateEventRsvpFailure(error));
      throw error;
    }
  };
};

export const cancelEventRegistrationAction = (eventId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(cancelRegistrationRequest());

      console.log('Canceling Event Registration', { eventId });

      const apiUrl = CANCEL_REGISTRATION(eventId);
      console.log('📡 Final API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: POST,
      });

      dispatch(cancelRegistrationSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Cancel Registration Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(cancelRegistrationFailure(error));
      throw error;
    }
  };
};

export const updateEventRsvpRequest = () => ({
  type: types.UPDATE_EVENT_RSVP_REQUEST,
});

export const updateEventRsvpSuccess = (payload: any) => ({
  type: types.UPDATE_EVENT_RSVP_SUCCESS,
  payload,
});

export const updateEventRsvpFailure = (payload: any) => ({
  type: types.UPDATE_EVENT_RSVP_FAILURE,
  payload,
});

export const updateEventRsvpClear = () => ({
  type: types.UPDATE_EVENT_RSVP_CLEAR,
});

export const cancelRegistrationRequest = () => ({
  type: types.CANCEL_EVENT_REGISTRATION_REQUEST,
});

export const cancelRegistrationSuccess = (payload: any) => ({
  type: types.CANCEL_EVENT_REGISTRATION_SUCCESS,
  payload,
});

export const cancelRegistrationFailure = (payload: any) => ({
  type: types.CANCEL_EVENT_REGISTRATION_FAILURE,
  payload,
});

export const cancelRegistrationClear = () => ({
  type: types.CANCEL_EVENT_REGISTRATION_CLEAR,
});

