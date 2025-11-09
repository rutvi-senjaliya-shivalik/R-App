import * as types from '../../actionType';
import {ComplainDataModel} from '../../../types/models/complaintDataModel';

const initialState: {
  loading: boolean;
  complaintsData: ComplainDataModel[];
  error: string;
  createLoading: boolean;
  createSuccess: boolean;
  createError: string;
} = {
  loading: false,
  complaintsData: [],
  error: '',
  createLoading: false,
  createSuccess: false,
  createError: '',
};

const complaintsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_COMPLAINTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case types.GET_COMPLAINTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        complaintsData: action.payload,
      };
    case types.GET_COMPLAINTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_COMPLAINTS_LIST_CLEAR:
      return {
        ...state,
        loading: false,
        error: '',
        complaintsData: [],
      };
    case types.CREATE_COMPLAINT_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: '',
        createSuccess: false,
      };
    case types.CREATE_COMPLAINT_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
      };
    case types.CREATE_COMPLAINT_FAILURE:
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
        createSuccess: false,
      };
    case types.CREATE_COMPLAINT_CLEAR:
      return {
        ...state,
        createLoading: false,
        createError: '',
        createSuccess: false,
      };
    default:
      return state;
  }
};

export default complaintsReducer;

