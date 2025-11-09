import { GET } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { GET_RECENT_BOOKINGS_API } from '../../../services/httpService';
import * as types from '../../actionType';

export const getRecentBookings = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getRecentBookingsRequest());

      console.log('Fetching Recent Bookings...');

      const response = await MakeApiRequest({
        apiUrl: GET_RECENT_BOOKINGS_API,
        apiMethod: GET,
      });

      console.log('Recent Bookings Response:', response);
      
      const bookings = response?.data?.result?.payments || [];
      dispatch(getRecentBookingsSuccess(bookings));
      return response?.data;
    } catch (error: any) {
      console.log('Recent Bookings Error:', error);
      dispatch(getRecentBookingsFailure(error));
      throw error;
    }
  };
};

export const getRecentBookingsRequest = () => ({
  type: types.GET_RECENT_BOOKINGS_REQUEST,
});

export const getRecentBookingsSuccess = (payload: any) => ({
  type: types.GET_RECENT_BOOKINGS_SUCCESS,
  payload,
});

export const getRecentBookingsFailure = (payload: any) => ({
  type: types.GET_RECENT_BOOKINGS_FAILURE,
  payload,
});

export const getRecentBookingsClear = () => ({
  type: types.GET_RECENT_BOOKINGS_CLEAR,
});

