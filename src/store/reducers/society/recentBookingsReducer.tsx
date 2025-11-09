import { RecentBookingDataModel } from '../../../types/models';
import * as types from '../../actionType';

const initialState: {
  loading: boolean;
  bookingsData: RecentBookingDataModel[];
  error: string;
} = {
  loading: false,
  bookingsData: [],
  error: '',
};

const recentBookingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_RECENT_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case types.GET_RECENT_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookingsData: action.payload,
      };
    case types.GET_RECENT_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_RECENT_BOOKINGS_CLEAR:
      return {
        ...state,
        loading: false,
        bookingsData: [],
        error: '',
      };
    default:
      return state;
  }
};

export default recentBookingsReducer;

