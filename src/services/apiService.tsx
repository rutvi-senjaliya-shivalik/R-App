import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { print } from '../utils';
import { DELETE, GET, POST, PUT } from '../constants/api';
import PrefManager from '../utils/prefManager';
import { STRING } from '../constants';
import { print } from '../utils/method';
import { logout, resetStore } from '../store/actions/auth/loginAction';
import { store } from '../store';
import { getCurrentApiUrl } from './httpService';

interface ApiRequestProps {
  apiUrl: string;
  apiMethod?: string;
  apiData?: any;
  apiHeaders?: Record<string, string>;
  apiParams?: Record<string, any>;
  timeout?: number;
}

// Logout function to clear user data and token
export const handleLogout = async (): Promise<void> => {
  await PrefManager.removeValue(STRING.TOKEN);
  await PrefManager.removeValue(STRING.USER);
  store.dispatch(logout());
  store.dispatch(resetStore());
  // Optionally, add navigation or Redux logout logic here
};

// Create axios instance with baseURL
const createAxiosInstance = (): AxiosInstance => {
  const baseURL = getCurrentApiUrl();
  console.log('🌐 Creating axios instance with baseURL:', baseURL);
  
  return axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Get or create axios instance
let axiosInstance: AxiosInstance | null = null;
const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance();
  }
  return axiosInstance;
};

// Function to update baseURL if API URL changes
export const updateAxiosBaseURL = (newBaseURL: string): void => {
  axiosInstance = axios.create({
    baseURL: newBaseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('🔄 Updated axios instance baseURL to:', newBaseURL);
};

export async function MakeApiRequest({
  apiUrl,
  apiMethod = GET,
  apiData = {},
  apiHeaders = {},
  apiParams = {},
  timeout = 15000,
}: ApiRequestProps): Promise<AxiosResponse<any>> {

  // Try multiple methods to get token
  let token: any = null;
  
  // Method 1: Try PrefManager
  try {
    token = await PrefManager.getValue(STRING.TOKEN);
    if (token) {
      console.log('✅ Token retrieved from PrefManager');
    }
  } catch (error) {
    console.error('❌ Error getting token from PrefManager:', error);
  }
  
  // Method 2: Try direct AsyncStorage access if PrefManager failed
  if (!token) {
    try {
      const storageKey = STRING.TOKEN; // "Token"
      const rawValue = await AsyncStorage.getItem(storageKey);
      if (rawValue) {
        try {
          token = JSON.parse(rawValue);
          console.log('✅ Token retrieved from AsyncStorage (parsed)');
        } catch (e) {
          // If JSON parse fails, use raw value (might be stored as plain string)
          token = rawValue;
          console.log('✅ Token retrieved from AsyncStorage (raw string)');
        }
      }
    } catch (error) {
      console.error('❌ Error getting token from AsyncStorage:', error);
    }
  }
  
  // Method 3: Fallback to Redux state
  if (!token) {
    try {
      const state = store.getState();
      const reduxToken = state?.otp?.accessToken;
      if (reduxToken) {
        console.log('✅ Token retrieved from Redux state');
        token = reduxToken;
      }
    } catch (error) {
      console.error('❌ Error getting token from Redux:', error);
    }
  }
  
  // Debug: Check all AsyncStorage keys to see what's stored
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log('📦 All AsyncStorage keys:', allKeys);
    const tokenKey = STRING.TOKEN;
    if (allKeys.includes(tokenKey)) {
      const rawTokenValue = await AsyncStorage.getItem(tokenKey);
      console.log('🔍 Raw token value from AsyncStorage:', {
        key: tokenKey,
        rawValue: rawTokenValue,
        rawValueType: typeof rawTokenValue,
        rawValueLength: rawTokenValue?.length,
      });
    } else {
      console.warn(`⚠️ Token key "${tokenKey}" not found in AsyncStorage keys`);
    }
  } catch (error) {
    console.error('❌ Error checking AsyncStorage keys:', error);
  }
  
  // Debug token retrieval
  console.log('🔑 Final token retrieval result:', {
    fromStorage: !!await PrefManager.getValue(STRING.TOKEN),
    fromRedux: !!(store.getState()?.otp?.accessToken),
    finalToken: !!token,
    type: typeof token,
    length: token?.length,
    preview: token && typeof token === 'string' ? `${token.substring(0, 20)}...` : String(token),
  });
  
  // Ensure token doesn't already have "Bearer" prefix
  let authToken = token;
  if (token) {
    // Handle if token is stored as JSON string (double-quoted)
    if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
      try {
        authToken = JSON.parse(token);
        console.log('✅ Token was JSON stringified, parsed successfully');
      } catch (e) {
        console.log('⚠️ Token JSON parse failed, using as is');
        authToken = token;
      }
    }
    
    // Remove existing "Bearer " prefix if present
    if (typeof authToken === 'string') {
      authToken = authToken.replace(/^Bearer\s+/i, '').trim();
    }
  } else {
    console.error('❌ No token found in storage or Redux state!');
  }
  
  // Build headers object
  // If FormData is being sent, don't set Content-Type (let axios set it with boundary)
  const isFormData = apiData instanceof FormData;
  const headers: Record<string, any> = {
    ...(isFormData ? {} : { 'Content-Type': apiHeaders['Content-Type'] || 'application/json' }),
    ...apiHeaders,
  };
  
  // Remove Content-Type from headers if it's FormData (axios will set it automatically with boundary)
  // This is critical - axios needs to set Content-Type with boundary for multipart/form-data
  if (isFormData) {
    delete headers['Content-Type'];
    console.log('📦 FormData detected - Content-Type will be set by axios with boundary');
  }
  
  // Only add Authorization header if we have a valid token
  if (authToken && typeof authToken === 'string' && authToken.trim().length > 0) {
    headers.Authorization = `Bearer ${authToken}`;
    console.log('✅ Authorization header added successfully');
    console.log('  Token length:', authToken.length);
    console.log('  Token preview:', `${authToken.substring(0, 20)}...`);
  } else {
    console.error('❌ Cannot add Authorization header - no valid token available');
    console.error('  Token value:', authToken);
    console.error('  Token type:', typeof authToken);
    console.error('  Token length:', authToken?.length || 0);
    console.error('  ⚠️ API call will be made WITHOUT Authorization header - this will likely cause 401 error');
  }

  // Get axios instance with baseURL
  const axiosInstance = getAxiosInstance();
  
  // Determine if apiUrl is a full URL or relative path
  // If it starts with http:// or https://, it's a full URL (use as is)
  // Otherwise, it's a relative path (baseURL will be prepended by axios instance)
  const isFullUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://');
  
  // For relative paths, ensure baseURL is not already included
  let requestUrl: string;
  if (isFullUrl) {
    // Full URL - use as is (bypasses baseURL)
    requestUrl = apiUrl;
  } else {
    // Relative path - remove baseURL if accidentally included
    const baseUrl = getCurrentApiUrl();
    requestUrl = apiUrl.startsWith(baseUrl) ? apiUrl.replace(baseUrl, '') : apiUrl;
  }
  
  // Calculate full URL for logging
  const fullUrl = isFullUrl ? apiUrl : `${getCurrentApiUrl()}${requestUrl}`;
  
  // Debug headers (without exposing full token)
  const debugHeaders = {
    ...headers,
    Authorization: headers.Authorization ? `${headers.Authorization.substring(0, 30)}...` : 'undefined',
  };
  
  print(`${apiMethod} API:`, fullUrl, 1);
  print('Headers:', JSON.stringify(debugHeaders, null, 2), 1);
  print('Params:', JSON.stringify(apiParams), 1);

  // Don't try to JSON.stringify FormData - it will fail
  if (apiMethod !== GET) {
    if (isFormData) {
      print('Body:', '[FormData - multipart/form-data]', 1);
      // Log FormData entries for debugging
      if (apiData instanceof FormData) {
        const entries: string[] = [];
        // Note: FormData.entries() is not available in React Native, so we can't iterate
        entries.push('FormData with image and visitor data');
        print('FormData entries:', entries.join(', '), 1);
      }
    } else {
      print('Body:', JSON.stringify(apiData), 1);
    }
  }

  // Axios Configuration
  const config: AxiosRequestConfig = {
    method: apiMethod as any,
    url: requestUrl,
    headers,
    params: apiParams,
    timeout,
    ...(apiMethod !== GET ? { data: apiData } : {}),
  };
  
  // For FormData, ensure axios doesn't transform the data
  if (isFormData) {
    // Axios automatically handles FormData and sets Content-Type with boundary
    // No need for transformRequest - axios handles it natively
    console.log('📦 Sending FormData - axios will handle multipart/form-data automatically');
  }

  // Log the full URL being used
  console.log('🌐 Request URL:', fullUrl);
  console.log('🌐 Using baseURL:', getCurrentApiUrl());
  console.log('🌐 Relative path:', requestUrl);

  try {
    const response = await axiosInstance(config);
    print('API Response:', response.data, 1);
    return Promise.resolve(response);
  } catch (error: any) {
    print(`${apiMethod} API Error:`, error.response || error, 0);

    // Handle network errors (no response from server)
    if (!error.response) {
      // Network error - server unreachable, no internet, timeout, etc.
      const networkError = {
        ...error,
        message: error.message || 'Network Error',
        isNetworkError: true,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        },
      };
      print('Network Error Details:', networkError, 0);
      return Promise.reject(networkError);
    }

    // Handle status codes
    if (error?.response?.status === 400) {
      return Promise.reject(error);
    }
    else if(error?.response?.status === 401) {
      const url = error.config?.url || '';
      const errorData = error?.response?.data || {};
      const errorMessage = errorData?.message || errorData?.error || 'Unauthorized';
      
      console.log("❌ 401 Unauthorized Error:");
      console.log("  URL:", url);
      console.log("  Error Message:", errorMessage);
      console.log("  Error Data:", JSON.stringify(errorData, null, 2));
      
      // Check if Authorization header was sent
      const requestHeaders = error.config?.headers || {};
      const authHeader = requestHeaders.Authorization || requestHeaders.authorization;
      if (authHeader) {
        console.log("  ✅ Authorization header was sent:", `${authHeader.substring(0, 30)}...`);
        console.log("  ⚠️ Token might be expired or invalid");
      } else {
        console.log("  ❌ Authorization header was NOT sent!");
        console.log("  ⚠️ This is likely the cause of the 401 error");
        console.log("  Request Headers:", JSON.stringify(requestHeaders, null, 2));
      }

      // Only logout for critical auth endpoints, not for data fetching
      // This prevents redirecting to login when just fetching amenities
      const isAuthEndpoint = url.includes('/auth/') || url.includes('/login/') || url.includes('/verify-otp');
      
      if (isAuthEndpoint) {
        console.log("🔐 Auth endpoint - logging out user");
        // logout action only for auth-related endpoints
        await handleLogout();
      } else {
        // For other endpoints, just reject the error without logging out
        // This allows the component to handle the error gracefully
        console.log("⚠️ 401 error on non-auth endpoint, not logging out");
        console.log("  Component should handle this error gracefully");
        
        // Create a more descriptive error
        const enhancedError = {
          ...error,
          message: errorMessage || 'Unauthorized - Please check your token',
          isUnauthorized: true,
          tokenWasSent: !!authHeader,
        };
        return Promise.reject(enhancedError);
      }
    }
    else if(error?.response?.status === 403) {
      const url = error.config?.url || '';
      const errorData = error?.response?.data || {};
      const errorMessage = errorData?.message || errorData?.error || 'Forbidden - You do not have permission to access this resource';
      
      console.log("🚫 403 Forbidden Error:");
      console.log("  URL:", url);
      console.log("  Error Message:", errorMessage);
      console.log("  Error Data:", JSON.stringify(errorData, null, 2));
      console.log("  This usually means the user doesn't have the required permissions/role");
      
      // Add a more descriptive error message
      const enhancedError = {
        ...error,
        message: errorMessage,
        isPermissionError: true,
        status: 403,
      };
      
      return Promise.reject(enhancedError);
    }
    else {
      return Promise.reject(error);
    }
  }
}
