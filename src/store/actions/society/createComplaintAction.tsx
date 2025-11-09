import { POST } from '../../../constants/api';
import { MakeApiRequest } from '../../../services/apiService';
import { CREATE_COMPLAINT_API } from '../../../services/httpService';
import * as types from '../../actionType';

interface CreateComplaintPayload {
  society: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  image?: any;
}

export const createComplaintAction = (payload: CreateComplaintPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(createComplaintRequest());

      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('society', payload.society);
      formData.append('type', payload.type);
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      formData.append('priority', payload.priority);

      // Add image if provided
      if (payload.image) {
        const imageFile = {
          uri: payload.image.path,
          type: payload.image.mime || 'image/jpeg',
          name: payload.image.filename || `complaint_${Date.now()}.jpg`,
        };
        formData.append('image', imageFile as any);
      }

      console.log('Create Complaint Payload:', payload);

      const response = await MakeApiRequest({
        apiUrl: CREATE_COMPLAINT_API,
        apiMethod: POST,
        apiData: formData,
        apiHeaders: { "Content-Type": "multipart/form-data" },
      });

      console.log('Create Complaint Response:', response);
      dispatch(createComplaintSuccess(response?.data?.result));
      return response;
    } catch (error: any) {
      console.log('Create Complaint Error:', error);
      dispatch(createComplaintFailure(error));
      throw error;
    }
  };
};

export const createComplaintRequest = () => ({
  type: types.CREATE_COMPLAINT_REQUEST,
});

export const createComplaintSuccess = (payload: any) => ({
  type: types.CREATE_COMPLAINT_SUCCESS,
  payload,
});

export const createComplaintFailure = (payload: any) => ({
  type: types.CREATE_COMPLAINT_FAILURE,
  payload,
});

export const createComplaintClear = () => ({
  type: types.CREATE_COMPLAINT_CLEAR,
});

