// API Configuration
// Change this based on your environment: dev, staging, or prod
import { Platform } from 'react-native';

type ApiEnvironment = 'dev' | 'staging' | 'prod';

const API_ENV: ApiEnvironment = (__DEV__ as boolean) ? 'dev' : 'prod'; // Use 'dev' for development, 'staging' for staging, 'prod' for production

// Platform-specific base URLs
// Android Emulator: Use 10.0.2.2 to access localhost on host machine
// iOS Simulator: localhost works fine
// Physical Device: Use network IP (10.10.115.77) or ensure same WiFi network

// Configuration: Set USE_NETWORK_IP to true if your server is on a network IP
const USE_NETWORK_IP = true; // Set to true to use network IP instead of localhost/10.0.2.2
const NETWORK_IP = '10.10.115.85'; // Change this to your server's IP address

const getBaseUrl = (): string => {
  // If using network IP, use it for all platforms
  if (USE_NETWORK_IP) {
    return `http://${NETWORK_IP}:11001/api/v1/`;
  }

  // Platform-specific URLs
  if (Platform.OS === 'android') {
    // For Android Emulator, use 10.0.2.2 instead of localhost
    // This allows the emulator to access localhost on the host machine
    return 'http://10.0.2.2:11001/api/v1/';
  } else {
    // iOS Simulator or other platforms - localhost works fine
    return 'http://localhost:11001/api/v1/';
  }
};

export const API_BASE_URLS: Record<ApiEnvironment, string> = {
  dev: getBaseUrl(),
  staging: getBaseUrl(),
  prod: getBaseUrl(),
};

// Network Configuration Notes:
// - For Android Emulator with localhost server: Automatically uses 'http://10.0.2.2:11001/api/v1/'
// - For Android Emulator with network server: Use port forwarding: adb reverse tcp:11001 tcp:11001
// - For iOS Simulator: 'http://localhost:11001/api/v1/' works fine
// - For Physical Device: Change getBaseUrl() to use network IP: 'http://10.10.115.77:11001/api/v1/'

// Use API_BASE_URLS to get the current environment URL
let API_URL = API_BASE_URLS[API_ENV] || getBaseUrl();

// Export function to change API URL at runtime if needed
export const setApiUrl = (url: string) => {
  // Note: This will override the API_BASE_URLS setting
  // To use API_BASE_URLS again, call setApiUrl(API_BASE_URLS[API_ENV])
  API_URL = url;
};

export const getApiUrl = () => API_URL;

// Export function to get API URL for a specific environment
export const getApiUrlForEnv = (env: ApiEnvironment) =>
  API_BASE_URLS[env] || API_BASE_URLS.dev;

// Export API_URL getter to access the current URL
export const getCurrentApiUrl = () => API_URL;

export const GOOGLE_PLACES_API = '';

// AUTH FLOW
export const LOGIN = API_URL + 'users/send-phone-otp';
// New login endpoint with userLoginType
// For Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator or physical devices, use localhost
export const LOGIN_SEND_OTP = API_URL + 'auth/login/send-otp';
export const OTP_VERIFY = API_URL + 'auth/login/verify-otp';
export const RESEND_OTP = API_URL + 'users/resend-otp';
export const IMAGE = API_URL + 'common/upload-file-auth';
export const PROFILE = API_URL + 'users/registrations';
export const TERRITORYLIST = API_URL + 'territory/list?page=1';

export const TERRITORY = API_URL + 'users/submit-territory-details';
export const FEEDBACK_MODULE_LIST = (params: { page?: number }) =>
  API_URL + `feedbackmodules/list?page=${params.page}`;
export const FEEDBACK = API_URL + 'feedbacks/user/create';

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

// Visitor Entry
export const ADD_VISITOR_ENTRY = API_URL + 'smart-society/visitor-entry/create';
export const ADD_VISITOR = API_URL + 'visitor/visitors';
export const GET_VISITORS = API_URL + 'visitor/visitors';

// Amenities
export const GET_AMENITIES_LIST = API_URL + 'amenity/amenities';
export const GET_AMENITY_DETAIL = (amenityId: string) =>
  API_URL + `amenity/amenities/${amenityId}`;

// Complaints
export const GET_COMPLAINT_CATEGORIES =
  API_URL + 'mobile/complaints/categories';
export const CREATE_COMPLAINT = API_URL + 'mobile/complaints';
export const GET_ALL_COMPLAINTS = (params?: {
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  const queryString = queryParams.toString();
  return API_URL + `mobile/complaints${queryString ? '?' + queryString : ''}`;
};
export const GET_COMPLAINT_BY_ID = (complaintId: string) =>
  API_URL + `mobile/complaints/${complaintId}`;
export const UPDATE_COMPLAINT = (complaintId: string) =>
  API_URL + `mobile/complaints/${complaintId}`;
export const UPDATE_COMPLAINT_STATUS = (complaintId: string) =>
  API_URL + `mobile/complaints/${complaintId}/status`;
export const DELETE_COMPLAINT = (complaintId: string) =>
  API_URL + `mobile/complaints/${complaintId}`;

// Notices
export const GET_NOTICES_LIST = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  priority?: string;
  startDate?: string;
  endDate?: string;
  societyId?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.priority) queryParams.append('priority', params.priority);
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  if (params?.societyId) queryParams.append('societyId', params.societyId);
  const queryString = queryParams.toString();
  return API_URL + `society/notices${queryString ? '?' + queryString : ''}`;
};

export const CREATE_NOTICE = API_URL + 'society/notices';
export const GET_NOTICE_DETAIL = (noticeId: string) =>
  API_URL + `society/notices/${noticeId}`;
export const UPDATE_NOTICE = (noticeId: string) =>
  API_URL + `society/notices/${noticeId}`;
export const DELETE_NOTICE = (noticeId: string) =>
  API_URL + `society/notices/${noticeId}`;
export const PUBLISH_NOTICE = (noticeId: string) =>
  API_URL + `society/notices/${noticeId}/publish`;
export const ARCHIVE_NOTICE = (noticeId: string) =>
  API_URL + `society/notices/${noticeId}/archive`;
export const ACKNOWLEDGE_NOTICE = (noticeId: string) =>
  API_URL + `society/notices/${noticeId}/acknowledge`;
export const GET_NOTICE_STATS = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  const queryString = queryParams.toString();
  return (
    API_URL + `society/notices/stats${queryString ? '?' + queryString : ''}`
  );
};

// Events
export const GET_EVENTS_LIST = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  eventType?: string;
  upcoming?: boolean;
  societyId?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.eventType) queryParams.append('eventType', params.eventType);
  if (params?.upcoming !== undefined)
    queryParams.append('upcoming', params.upcoming.toString());
  if (params?.societyId) queryParams.append('societyId', params.societyId);
  const queryString = queryParams.toString();
  return API_URL + `society/events${queryString ? '?' + queryString : ''}`;
};

export const CREATE_EVENT = API_URL + 'society/events';
export const GET_EVENT_DETAIL = (eventId: string) =>
  API_URL + `society/events/${eventId}`;
export const UPDATE_EVENT = (eventId: string) =>
  API_URL + `society/events/${eventId}`;
export const DELETE_EVENT = (eventId: string) =>
  API_URL + `society/events/${eventId}`;
export const PUBLISH_EVENT = (eventId: string) =>
  API_URL + `society/events/${eventId}/publish`;
export const CANCEL_EVENT = (eventId: string) =>
  API_URL + `society/events/${eventId}/cancel`;
export const REGISTER_EVENT = (eventId: string) =>
  API_URL + `society/events/${eventId}/register`;
export const CANCEL_REGISTRATION = (eventId: string) =>
  API_URL + `society/events/${eventId}/cancel-registration`;
export const GET_EVENT_STATS = API_URL + 'society/events/stats';
export const GET_EVENT_ATTENDEES = (eventId: string) =>
  API_URL + `society/events/${eventId}/attendees`;

// Emergency Contacts
export const GET_EMERGENCY_CONTACTS = API_URL + 'society/emergency-contacts';

// Units
export const CREATE_UNIT = API_URL + 'society/units/create';
export const ASSIGN_UNIT = (unitId: string) =>
  API_URL + `society/units/${unitId}/assign`;
export const UNASSIGN_UNIT = (unitId: string) =>
  API_URL + `society/units/${unitId}/unassign`;
export const GET_UNIT_BY_ID = (unitId: string) =>
  API_URL + `society/units/${unitId}`;
export const UPDATE_UNIT = (unitId: string) =>
  API_URL + `society/units/${unitId}`;
export const DELETE_UNIT = (unitId: string) =>
  API_URL + `society/units/${unitId}`;
export const GET_ALL_UNITS = (params?: {
  page?: number;
  limit?: number;
  blockId?: string;
  unitStatus?: string;
  unitType?: string;
  floor?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.blockId) queryParams.append('blockId', params.blockId);
  if (params?.unitStatus) queryParams.append('unitStatus', params.unitStatus);
  if (params?.unitType) queryParams.append('unitType', params.unitType);
  if (params?.floor) queryParams.append('floor', params.floor.toString());
  const queryString = queryParams.toString();
  return API_URL + `society/units${queryString ? '?' + queryString : ''}`;
};
