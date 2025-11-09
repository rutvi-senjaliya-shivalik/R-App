import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { feedbackAction } from '../../actions/feedback/feedbackAction';

function* feedbackSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(feedbackAction, action.payload);
      yield put({ type: types.FEEDBACK_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.FEEDBACK_FAILURE, payload: error.message });
    }
  }

export default function* feedbackWatcherSaga() {
  yield takeLatest(types.FEEDBACK_REQUEST, feedbackSaga);
}

