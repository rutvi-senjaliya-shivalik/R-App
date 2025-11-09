import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actionType';
import { createAmenityBooking } from '../../actions/society/amenityBookingAction';

function* createAmenityBookingSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(createAmenityBooking, action.payload);
    yield put({ type: types.CREATE_AMENITY_BOOKING_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: types.CREATE_AMENITY_BOOKING_FAILURE,
      payload: error.message,
    });
  }
}

export default function* amenityBookingWatcherSaga() {
  yield takeLatest(types.CREATE_AMENITY_BOOKING_REQUEST, createAmenityBookingSaga);
}

