import * as types from "../../actionType";

interface EmergencyContact {
  _id?: string;
  id?: string;
  name: string;
  phoneNumber: string;
  email?: string;
  designation?: string;
  department?: string;
  isActive?: boolean;
  contactType?: string;
  [key: string]: any;
}

interface EmergencyContactsState {
  loading: boolean;
  data: EmergencyContact[] | null;
  error: any | null;
}

const initialState: EmergencyContactsState = {
  loading: false,
  data: null,
  error: null,
};

const getEmergencyContactsReducer = (
  state = initialState,
  action: any
): EmergencyContactsState => {
  switch (action.type) {
    case types.GET_EMERGENCY_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_EMERGENCY_CONTACTS_SUCCESS:
      // Extract data from response
      const responseData = action.payload?.data?.data || action.payload?.data || action.payload?.result || [];
      return {
        ...state,
        loading: false,
        data: Array.isArray(responseData) ? responseData : [],
        error: null,
      };

    case types.GET_EMERGENCY_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    case types.GET_EMERGENCY_CONTACTS_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default getEmergencyContactsReducer;

