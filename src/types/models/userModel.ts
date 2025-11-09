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
  societyId?: string;
  property?: PropertyModel | null;
  unitNumber?: string;
}

export interface PropertyModel {
  address: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  description: string;
  logo: string;
  projectType: string;
  societyCode: string;
  societyName: string;
  status: string;
  totalUnits: number;
  _id: string;
}
