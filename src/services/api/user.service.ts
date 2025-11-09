import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  role: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserProfileResponse {
  success: boolean;
  data: UserProfile;
}

class UserService {
  // Get user profile
  async getUserProfile(): Promise<GetUserProfileResponse> {
    try {
      console.log('UserService: Fetching user profile from /cp-users/profile');
      const response = await apiClient.get<GetUserProfileResponse>('/cp-users/profile');
      console.log('UserService: Profile response:', JSON.stringify(response, null, 2));
      
      // Cache the successful response
      await AsyncStorage.setItem('cachedProfile', JSON.stringify(response.data));
      
      return response;
    } catch (error: any) {
      console.error('UserService: Error fetching profile:', error);
      console.error('UserService: Error response:', error.response?.data);
      console.error('UserService: Error status:', error.response?.status);
      
      // Try to get cached profile data first
      try {
        const cachedProfile = await AsyncStorage.getItem('cachedProfile');
        if (cachedProfile) {
          console.log('UserService: Using cached profile data');
          return {
            success: true,
            data: JSON.parse(cachedProfile),
          };
        }
      } catch (cacheError) {
        console.error('UserService: Error reading cached profile:', cacheError);
      }
      
      // Fallback to userData from login
      try {
        const cachedUserData = await AsyncStorage.getItem('userData');
        if (cachedUserData) {
          console.log('UserService: Using cached user data from login');
          const userData = JSON.parse(cachedUserData);
          // Transform cached data to match expected format
          const nameParts = (userData.name || '').split(' ');
          return {
            success: true,
            data: {
              _id: userData._id || userData.id || '',
              firstName: userData.firstName || nameParts[0] || '',
              lastName: userData.lastName || nameParts.slice(1).join(' ') || '',
              email: userData.email || '',
              contactNumber: userData.contactNumber || userData.phone || '',
              role: userData.role || '',
              profilePicture: userData.profilePicture,
              createdAt: userData.createdAt || '',
              updatedAt: userData.updatedAt || '',
            },
          };
        }
      } catch (cacheError) {
        console.error('UserService: Error reading cached user data:', cacheError);
      }
      
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.message || 
                     error.response.data?.error ||
                     `Server error: ${error.response.status}`;
      const newError: any = new Error(message);
      newError.response = error.response;
      return newError;
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new UserService();
