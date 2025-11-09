import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { CREATE_AMENITY_BOOKING_API } from '../../../services/httpService';
import * as types from '../../actionType';

interface CreateAmenityBookingPayload {
  society: string;
  amenity: string;
  bookingDate: string;
  bookingStartTime: string;
  bookingEndTime: string;
  amount: number;
  paymentMethod: string;
  remarks?: string;
}

export const createAmenityBooking = (payload: CreateAmenityBookingPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(createAmenityBookingRequest());

      console.log('Create Amenity Booking Payload:', payload);

      const response = await MakeApiRequest({
        apiUrl: CREATE_AMENITY_BOOKING_API,
        apiMethod: POST,
        apiData: payload,
      });

      console.log('Create Amenity Booking Response:', response);
      dispatch(createAmenityBookingSuccess(response?.data?.result));
      return response;
    } catch (error: any) {
      console.log('Create Amenity Booking Error:', error);
      dispatch(createAmenityBookingFailure(error));
      throw error;
    }
  };
};

export const createAmenityBookingRequest = () => ({
  type: types.CREATE_AMENITY_BOOKING_REQUEST,
});

export const createAmenityBookingSuccess = (payload: any) => ({
  type: types.CREATE_AMENITY_BOOKING_SUCCESS,
  payload,
});

export const createAmenityBookingFailure = (payload: any) => ({
  type: types.CREATE_AMENITY_BOOKING_FAILURE,
  payload,
});

export const createAmenityBookingClear = () => ({
  type: types.CREATE_AMENITY_BOOKING_CLEAR,
});

