import { RootState } from '../reducers';

export const selectAmenitiesData = (state: RootState) => state.amenities;

export const selectAmenityBookingData = (state: RootState) => ({
  loading: state.amenityBooking?.loading,
  bookingSuccess: state.amenityBooking?.bookingSuccess,
  bookingData: state.amenityBooking?.bookingData,
  error: state.amenityBooking?.error,
});
