import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_AMENITY_DETAIL } from "../../../services/httpService";
import * as types from "../../actionType";

export const getAmenityDetailAction = (amenityId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(getAmenityDetailRequest());

      console.log('Getting Amenity Detail Data for ID:', amenityId);

      const apiUrl = GET_AMENITY_DETAIL(amenityId);
      console.log('API URL:', apiUrl);

      const response = await MakeApiRequest({
        apiUrl,
        apiMethod: GET,
      });

      dispatch(getAmenityDetailSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Get Amenity Detail Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(getAmenityDetailFailure(error));
      throw error;
    }
  };
};

export const getAmenityDetailRequest = () => ({
  type: types.GET_AMENITY_DETAIL_REQUEST,
});

export const getAmenityDetailSuccess = (payload: any) => ({
  type: types.GET_AMENITY_DETAIL_SUCCESS,
  payload,
});

export const getAmenityDetailFailure = (payload: any) => ({
  type: types.GET_AMENITY_DETAIL_FAILURE,
  payload,
});

export const getAmenityDetailClear = () => ({
  type: types.GET_AMENITY_DETAIL_CLEAR,
});

