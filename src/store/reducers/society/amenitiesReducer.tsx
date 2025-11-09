import * as types from '../../actionType';
import {ComplainDataModel} from '../../../types/models/complaintDataModel';

const initialState: {
  loading: boolean;
  amenitiesData: ComplainDataModel[];
  error: string;
} = {
  loading: false,
  amenitiesData: [],
  error: '',
};

const amenitiesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_AMENITIES_LIST_REQUEST:
      return { ...state, loading: true };
    case types.GET_AMENITIES_LIST_SUCCESS:
      return { ...state, loading: false, amenitiesData: action.payload };
    case types.GET_AMENITIES_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default amenitiesReducer;
