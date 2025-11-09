import { GET } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { GET_AMENITIES_LIST_API } from '../../../services/httpService';
import * as types from '../../actionType';

export const getAmenitiesList = () => {
    console.log('getAmenitiesList:::');
  return async (dispatch: any) => {
    try {
      dispatch(getAmenitiesListAction());
      const response = await MakeApiRequest({
        apiUrl: GET_AMENITIES_LIST_API,
        apiMethod: GET,
      });
      console.log('Amenities List Response:', response);
      dispatch(getAmenitiesListSuccess(response?.data?.result?.amenities));
      return response;
    } catch (error: any) {
      console.log('Amenities List Error:', error);
      dispatch(getAmenitiesListFailure(error));
      throw error;
    }
  };
};

export const getAmenitiesListAction = () => ({
  type: types.GET_AMENITIES_LIST_REQUEST,
});

export const getAmenitiesListSuccess = (payload: any) => ({
  type: types.GET_AMENITIES_LIST_SUCCESS,
  payload,
});

export const getAmenitiesListFailure = (payload: any) => ({
  type: types.GET_AMENITIES_LIST_FAILURE,
  payload,
});


