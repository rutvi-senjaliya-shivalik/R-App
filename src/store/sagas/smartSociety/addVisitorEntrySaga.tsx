import { call, put, takeLatest } from 'redux-saga/effects';
import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { ADD_VISITOR_ENTRY } from "../../../services/httpService";
import * as types from "../../actionType";

function* addVisitorEntrySaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(MakeApiRequest, {
        apiUrl: ADD_VISITOR_ENTRY,
        apiMethod: POST,
        apiData: action.payload,
      });
      yield put({ type: types.ADD_VISITOR_ENTRY_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.ADD_VISITOR_ENTRY_FAILURE, payload: error });
    }
  }

export default function* addVisitorEntryWatcherSaga() {
  yield takeLatest(types.ADD_VISITOR_ENTRY_REQUEST, addVisitorEntrySaga);
}

