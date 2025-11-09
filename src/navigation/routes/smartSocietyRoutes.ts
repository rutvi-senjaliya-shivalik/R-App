// Smart Society Route Names
export const SMART_SOCIETY_ROUTES = {
  // Main
  ROLE_SELECTION: 'RoleSelection',
  SMART_SOCIETY: 'SmartSociety',

  // Bills & Finance
  MY_BILLS: 'MyBills',
  BILL_GENERATION: 'BillGeneration',
  PAYMENT_SCREEN: 'PaymentScreen',
  RECEIPT_SCREEN: 'ReceiptScreen',
  EXPENSE_TRACKING: 'ExpenseTracking',

  // Complaints
  COMPLAINTS_LIST: 'ComplaintsList',
  ADD_COMPLAINT: 'AddComplaint',
  COMPLAINT_DETAIL: 'ComplaintDetail',
  ADMIN_COMPLAINT_MANAGEMENT: 'AdminComplaintManagement',

  // Notices
  NOTICES_LIST: 'NoticesList',
  ADD_NOTICE: 'AddNotice',
  NOTICE_DETAIL: 'NoticeDetail',

  // Events
  EVENTS_LIST: 'EventsList',
  ADD_EVENT: 'AddEvent',
  EVENT_DETAIL: 'EventDetail',

  // Society Rules
  SOCIETY_RULES: 'SocietyRules',

  // Logs (Resident View)
  VISITOR_LOGS: 'VisitorLogs',
  PARCEL_LOGS: 'ParcelLogs',

  // Watchman
  ADD_VISITOR_ENTRY: 'AddVisitorEntry',
  MARK_VISITOR_EXIT: 'MarkVisitorExit',
  RECORD_PARCEL: 'RecordParcel',
  ADD_VISITOR: 'AddVisitor',
  QR_SCANNER: 'QRScanner',
  EXPECTED_VISITORS: 'ExpectedVisitors',
  MEMBER_DIRECTORY: 'MemberDirectory',
  EMERGENCY_ALERTS: 'EmergencyAlerts',
  REPORT_ACTIVITY: 'ReportActivity',
  UPDATE_LOG_STATUS: 'UpdateLogStatus',

  // Resident Actions
  RESIDENT_ADD_VISITOR_ENTRY: 'ResidentAddVisitorEntry',
  RESIDENT_RECORD_PARCEL: 'ResidentRecordParcel',

  // Profile & Settings
  VEHICLE_REGISTRATION: 'VehicleRegistration',
  EDIT_PROFILE: 'EditProfile',
  
  // Security & Emergency
  PANIC_SOS_ALERT: 'PanicSOSAlert',

  // Admin Management
  ADMIN_MEMBER_MANAGEMENT: 'AdminMemberManagement',
  ADMIN_PARKING_MANAGEMENT: 'AdminParkingManagement',
  
  // Amenities
  ADMIN_AMENITIES_MANAGEMENT: 'AdminAmenitiesManagement',
  ADD_AMENITY: 'AddAmenity',
  ADMIN_AMENITY_BOOKINGS: 'AdminAmenityBookings',
  AMENITIES_LIST: 'AmenitiesList',
  AMENITY_DETAIL: 'AmenityDetail',
  BOOK_AMENITY: 'BookAmenity',
  MY_BOOKINGS: 'MyBookings',

  // Lost & Found
  LOST_FOUND_LIST: 'LostFoundList',
  ADD_LOST_FOUND: 'AddLostFound',
  LOST_FOUND_DETAIL: 'LostFoundDetail',
} as const;

// Route Configuration with role-based access
export const ROUTE_CONFIG: Record<
  string,
  {
    route: string;
    allowedRoles: string[];
    params?: Record<string, any>;
  }
> = {
  // Resident Features
  r1: {
    route: SMART_SOCIETY_ROUTES.MY_BILLS,
    allowedRoles: ['resident'],
  },
  r2: {
    route: SMART_SOCIETY_ROUTES.EXPENSE_TRACKING,
    allowedRoles: ['resident'],
    params: { viewOnly: true },
  },
  r3: {
    route: SMART_SOCIETY_ROUTES.ADD_COMPLAINT,
    allowedRoles: ['resident'],
  },
  r4: {
    route: SMART_SOCIETY_ROUTES.COMPLAINTS_LIST,
    allowedRoles: ['resident'],
  },
  r5: {
    route: SMART_SOCIETY_ROUTES.NOTICES_LIST,
    allowedRoles: ['resident', 'admin', 'watchman'],
  },
  r6: {
    route: SMART_SOCIETY_ROUTES.EVENTS_LIST,
    allowedRoles: ['resident', 'admin'],
  },
  r7: {
    route: SMART_SOCIETY_ROUTES.SOCIETY_RULES,
    allowedRoles: ['resident', 'admin', 'watchman'],
  },
  r8: {
    route: SMART_SOCIETY_ROUTES.VISITOR_LOGS,
    allowedRoles: ['resident'],
  },
  r9: {
    route: SMART_SOCIETY_ROUTES.PARCEL_LOGS,
    allowedRoles: ['resident'],
  },
  r13: {
    route: SMART_SOCIETY_ROUTES.RESIDENT_ADD_VISITOR_ENTRY,
    allowedRoles: ['resident'],
  },
  r14: {
    route: SMART_SOCIETY_ROUTES.RESIDENT_RECORD_PARCEL,
    allowedRoles: ['resident'],
  },
  // Profile & Settings - Available to all members (residents)
  r11: {
    route: SMART_SOCIETY_ROUTES.VEHICLE_REGISTRATION,
    allowedRoles: ['resident'], // Members can register and manage vehicles
  },
  r12: {
    route: SMART_SOCIETY_ROUTES.EDIT_PROFILE,
    allowedRoles: ['resident'], // Members can edit their profile and flat information
  },
  r10: {
    route: SMART_SOCIETY_ROUTES.PANIC_SOS_ALERT,
    allowedRoles: ['resident'], // Emergency alert for residents
  },
  r15: {
    route: SMART_SOCIETY_ROUTES.AMENITIES_LIST,
    allowedRoles: ['resident'],
  },
  r16: {
    route: SMART_SOCIETY_ROUTES.MY_BOOKINGS,
    allowedRoles: ['resident'],
  },
  r17: {
    route: SMART_SOCIETY_ROUTES.LOST_FOUND_LIST,
    allowedRoles: ['resident', 'admin'], // Lost & Found for residents and admins
  },

  // Admin Features
  a1: {
    route: SMART_SOCIETY_ROUTES.ADMIN_COMPLAINT_MANAGEMENT,
    allowedRoles: ['admin'],
  },
  a2: {
    route: SMART_SOCIETY_ROUTES.ADD_NOTICE,
    allowedRoles: ['admin'],
  },
  a3: {
    route: SMART_SOCIETY_ROUTES.NOTICES_LIST,
    allowedRoles: ['admin'],
  },
  a4: {
    route: SMART_SOCIETY_ROUTES.ADD_EVENT,
    allowedRoles: ['admin'],
  },
  a5: {
    route: SMART_SOCIETY_ROUTES.EVENTS_LIST,
    allowedRoles: ['admin'],
  },
  a6: {
    route: SMART_SOCIETY_ROUTES.ADMIN_MEMBER_MANAGEMENT,
    allowedRoles: ['admin'],
  },
  a7: {
    route: SMART_SOCIETY_ROUTES.ADMIN_PARKING_MANAGEMENT,
    allowedRoles: ['admin'],
  },
  a8: {
    route: SMART_SOCIETY_ROUTES.ADMIN_AMENITIES_MANAGEMENT,
    allowedRoles: ['admin'],
  },
  a9: {
    route: SMART_SOCIETY_ROUTES.LOST_FOUND_LIST,
    allowedRoles: ['admin'], // Admin can manage Lost & Found
  },

  // Watchman Features
  w1: {
    route: SMART_SOCIETY_ROUTES.ADD_VISITOR_ENTRY,
    allowedRoles: ['watchman'],
  },
  w2: {
    route: SMART_SOCIETY_ROUTES.MARK_VISITOR_EXIT,
    allowedRoles: ['watchman'],
  },
  w4: {
    route: SMART_SOCIETY_ROUTES.RECORD_PARCEL,
    allowedRoles: ['watchman'],
  },
};

// Special case: r4 can also navigate to admin complaint management
export const getComplaintRoute = (roleId: string) => {
  if (roleId === 'admin') {
    return SMART_SOCIETY_ROUTES.ADMIN_COMPLAINT_MANAGEMENT;
  }
  return SMART_SOCIETY_ROUTES.COMPLAINTS_LIST;
};
