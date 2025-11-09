export interface RecentBookingDataModel {
  amenity: AmenitiesModel;
  id: string;
  bookingDate: string;
  bookingStartTime: string;
  bookingEndTime: string;
  amount: number;
  createdAt: string;
  isDeleted: false;
  paymentMethod: string;
  paymentStatus: string;
  qrCodeScanned: boolean;
  remarks?: string;
  status: string;
  updatedAt: string;
  user: string;
}

export interface AmenitiesModel {
  amount: string;
  endTime: string;
  isPaid: boolean;
  name: string;
  qrCode: string;
  startTime: string;
  _id: string;
}
