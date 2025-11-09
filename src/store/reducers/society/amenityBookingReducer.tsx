import * as types from '../../actionType';

const initialState: {
  loading: boolean;
  bookingSuccess: boolean;
  bookingData: any;
  error: string;
} = {
  loading: false,
  bookingSuccess: false,
  bookingData: null,
  error: '',
};

const amenityBookingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_AMENITY_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        bookingSuccess: false,
        error: '',
      };
    case types.CREATE_AMENITY_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookingSuccess: true,
        bookingData: action.payload,
      };
    case types.CREATE_AMENITY_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        bookingSuccess: false,
        error: action.payload,
      };
    case types.CREATE_AMENITY_BOOKING_CLEAR:
      return {
        ...state,
        loading: false,
        bookingSuccess: false,
        bookingData: null,
        error: '',
      };
    default:
      return state;
  }
};

export default amenityBookingReducer;

