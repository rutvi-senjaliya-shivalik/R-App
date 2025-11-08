export interface UserModel {
  mobileNumber: string;
  countryCode: string;
  isMobileVerified: boolean;
  isProfileComplete: boolean;
  token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
