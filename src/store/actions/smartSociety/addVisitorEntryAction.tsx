import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { ADD_VISITOR_ENTRY, ADD_VISITOR } from "../../../services/httpService";
import * as types from "../../actionType";

export interface VisitorEntryPayload {
  visitorName: string;
  visitorPhone: string;
  flatNo: string;
  purpose: string;
  isPreApproved?: boolean;
  expectedDate?: string | null;
  expectedTime?: string | null;
}

export interface VisitorPayload {
  visitorName: string;
  visitorEmail?: string;
  visitorMobile: string;
  visitorCategory: string;
  company?: string;
  purposeOfVisit: string;
  buildingId?: string;
  expectedDuration?: {
    value: number;
    unit: string;
  };
  numberOfVisitors?: number;
  vehicleDetails?: {
    vehicleNumber?: string;
    vehicleType?: string;
  };
  idProof?: {
    type?: string;
    number?: string;
    image?: string;
  };
  notes?: string;
  visitorStatus?: string;
  createdBy?: string;
  // Legacy fields (kept for backward compatibility)
  hostId?: string;
  hostName?: string;
  hostMobile?: string;
  hostUnit?: string;
}

export const addVisitorEntryAction = (payload: VisitorEntryPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(addVisitorEntryRequest());
      const response = await MakeApiRequest({
        apiUrl: ADD_VISITOR_ENTRY,
        apiMethod: POST,
        apiData: payload,
      });
      dispatch(addVisitorEntrySuccess(response));
      return response;
    } catch (error: any) {
      dispatch(addVisitorEntryFailure(error));
      throw error;
    }
  };
};

export const addVisitorAction = (payload: VisitorPayload | FormData, isFormData: boolean = false) => {
  return async (dispatch: any) => {
    try {
      dispatch(addVisitorEntryRequest());
      console.log('📤 Submitting visitor entry:', isFormData ? 'FormData' : payload);
      
      // Don't set Content-Type header for FormData - axios will set it automatically with boundary
      const headers = {};
      
      const response = await MakeApiRequest({
        apiUrl: ADD_VISITOR,
        apiMethod: POST,
        apiData: payload,
        apiHeaders: headers,
      });
      console.log('✅ Visitor entry response:', response?.data);
      dispatch(addVisitorEntrySuccess(response));
      return response;
    } catch (error: any) {
      console.error('❌ Visitor entry error:', error);
      dispatch(addVisitorEntryFailure(error));
      throw error;
    }
  };
};

export const addVisitorEntryRequest = () => ({
  type: types.ADD_VISITOR_ENTRY_REQUEST,
});

export const addVisitorEntrySuccess = (payload: any) => ({
  type: types.ADD_VISITOR_ENTRY_SUCCESS,
  payload,
});

export const addVisitorEntryFailure = (payload: any) => ({
  type: types.ADD_VISITOR_ENTRY_FAILURE,
  payload,
});

export const addVisitorEntryClear = () => ({
  type: types.ADD_VISITOR_ENTRY_CLEAR,
});

