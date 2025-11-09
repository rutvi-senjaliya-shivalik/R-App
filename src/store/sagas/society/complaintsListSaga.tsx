import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actionType';
import { getComplaintsListAction } from '../../actions/society/complaintsListAction';

function* getComplaintsListSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getComplaintsListAction);
    yield put({ type: types.GET_COMPLAINTS_LIST_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: types.GET_COMPLAINTS_LIST_FAILURE,
      payload: error.message,
    });
  }
}

export default function* complaintsListWatcherSaga() {
  yield takeLatest(types.GET_COMPLAINTS_LIST_REQUEST, getComplaintsListSaga);
}

