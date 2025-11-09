import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actionType';
import { getAmenitiesListAction } from '../../actions/society/amenitiesListAction';

function* getAmenitiesListSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getAmenitiesListAction);
    yield put({ type: types.GET_AMENITIES_LIST_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: types.GET_AMENITIES_LIST_FAILURE,
      payload: error.message,
    });
  }
}

export default function* amenitiesListWatcherSaga() {
  yield takeLatest(types.GET_AMENITIES_LIST_REQUEST, getAmenitiesListSaga);
}

