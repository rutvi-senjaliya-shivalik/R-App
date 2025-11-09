import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actionType';
import { createComplaintAction } from '../../actions/society/createComplaintAction';

function* createComplaintSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(createComplaintAction, action.payload);
    yield put({ type: types.CREATE_COMPLAINT_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: types.CREATE_COMPLAINT_FAILURE,
      payload: error.message,
    });
  }
}

export default function* createComplaintWatcherSaga() {
  yield takeLatest(types.CREATE_COMPLAINT_REQUEST, createComplaintSaga);
}

