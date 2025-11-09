import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actionType';
import { getRecentBookings } from '../../actions/society/recentBookingsAction';

function* recentBookingsSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getRecentBookings);
    yield put({ type: types.GET_RECENT_BOOKINGS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: types.GET_RECENT_BOOKINGS_FAILURE,
      payload: error.message,
    });
  }
}

export default function* recentBookingsWatcherSaga() {
  yield takeLatest(types.GET_RECENT_BOOKINGS_REQUEST, recentBookingsSaga);
}

