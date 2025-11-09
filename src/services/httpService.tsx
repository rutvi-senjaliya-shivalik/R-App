let API_URL = "https://realos-api.devpress.net/";
//"https://sectile-marla-retrospectively.ngrok-free.dev/";

export const GOOGLE_PLACES_API = '';

// AUTH FLOW
export const LOGIN_API = API_URL + 'user/api/v1/users/register';
export const OTP_VERIFY = API_URL + 'user/api/v1/users/verify-otp';
export const RESEND_OTP_API = API_URL + 'user/api/v1/users/resend-otp';
export const UPDATE_PROFILE = API_URL + 'user/api/v1/users/profile';
export const GET_PROFILE = API_URL + 'user/api/v1/users/profile';
export const GET_AMENITIES = API_URL + 'user/api/v1/amenities';

export const LOGIN = API_URL + 'users/send-phone-otp';
export const RESEND_OTP = API_URL + 'users/resend-otp';
export const IMAGE = API_URL + 'common/upload-file-auth';
export const PROFILE = API_URL + 'users/registrations';
export const TERRITORYLIST = API_URL + 'territory/list?page=1';

export const TERRITORY = API_URL + 'users/submit-territory-details';
export const FEEDBACK_MODULE_LIST = (params: { page?: number }) => API_URL + `feedbackmodules/list?page=${params.page}`;
export const FEEDBACK = API_URL + "feedbacks/user/create";

//  contact
export const CONTACT_UPLOAD = API_URL + 'users/sync-contact-data';
export const GET_CONTACT_LIST = (params: { page?: number }) =>
  API_URL + `users/my-contacts?page=${params.page}&type=MyContact`;

export const INVITE_CONTACT_LIST = (params: { page?: number }) =>
  API_URL + `users/my-contacts?page=${params.page}&type=NotRegister`;

export const MY_CONTACT_LIST = (params: { page?: number }) =>
  API_URL + `users/public-users-list?page=${params.page}`;

export const ADD_CONTACT = API_URL + `users/add/my-contacts`;

export const PROJECT_LIST = (params?: { page?: number; search?: string }) => {
  const page = params?.page || 1;
  const searchParam = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return API_URL + `projects/app-list?page=${page}${searchParam}`;
};

export const ADD_PROJECT_LEAD = API_URL + `project-leads/create-app`;

export const PROJECT_LEAD = API_URL + `project-leads/create-new`;


export const DELETE_USER = API_URL + `users/delete-account`;

export const WHO_AM_I = API_URL + `users/create/identity-selection`;

// Edit Profile
export const EDIT_PROFILE = (userId: string) =>
  API_URL + `users/user-profile/${userId}`;

// Change Phone Number
export const CHANGE_PHONE_NUMBER = API_URL + 'users/change-phone-number';

// Change Phone Number Verify OTP
export const CHANGE_PHONE_NUMBER_VERIFY_OTP =
  API_URL + 'users/change-phone-number-verify-otp';

// Get User Profile
export const GET_USER_PROFILE = API_URL + 'users/user-profile';

export const PULSES_LIST = (params?: { page?: number; search?: string }) => {
  const page = params?.page || 1;
  const searchParam = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return API_URL + `knowledges/get-list?page=${page}${searchParam}`;
};


// Project User List
export const PROJECT_USER_LIST = (params: {
  page: number;
  projectId: string;
  search?: string;
}) => {
  const searchParam = params.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return (
    API_URL +
    `common/project-user-list?page=${params.page}&projectId=${params.projectId}${searchParam}`
  );
};


// User Detail
export const USER_DETAIL = API_URL + `users/user-detail`;

// Employee Details
export const EMPLOYEE_DETAILS = (userId: string) => {
  return API_URL + `employees/detail/${userId}`;
};


// Professional List
export const GET_PROFESSIONAL_LIST = (page: number = 1) =>
  API_URL + `users/professional/list?page=${page}`;

// Create Professional
export const CREATE_PROFESSIONAL = API_URL + 'users/create/professionals';

// Lost & Found (LOS)
export const CREATE_LOS = API_URL + 'user/api/v1/los';
export const GET_LOS_LIST = API_URL + 'user/api/v1/los';

// Notices
export const GET_NOTICES_LIST = API_URL + 'user/api/v1/notices';

// SOS Emergency Alert
export const CREATE_SOS = API_URL + 'user/api/v1/sos';

// Visitor Entry
export const CREATE_VISITOR = API_URL + 'user/api/v1/visitors';

// Complaints
export const GET_COMPLAINTS_LIST_API = API_URL + 'user/api/v1/complaints?page=1&limit=10';
export const CREATE_COMPLAINT_API = API_URL + 'user/api/v1/complaints';

// Amenities
export const GET_AMENITIES_LIST_API = API_URL + 'user/api/v1/amenities';
export const CREATE_AMENITY_BOOKING_API = API_URL + 'user/api/v1/amenity-payments';
export const GET_RECENT_BOOKINGS_API = API_URL + 'user/api/v1/amenity-payments';

