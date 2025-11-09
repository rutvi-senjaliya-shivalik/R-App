// Export all services from a single entry point
export { default as authService } from './auth.service';
export { default as leadsService } from './leads.service';
export { default as unitsService } from './units.service';
export { default as projectsService } from './projects.service';
export { default as invoicesService } from './invoices.service';
export { default as bookingsService } from './bookings.service';
export { default as userService } from './user.service';
export { default as apiClient } from './apiClient';

// Export types
export type { LoginRequest, LoginResponse } from './auth.service';

export type {
  CreateLeadRequest,
  Lead,
  CreateLeadResponse,
  GetLeadsResponse,
  GetLeadByIdResponse,
  UpdateLeadRequest,
  UpdateLeadResponse,
} from './leads.service';

export type { Unit, GetUnitsByProjectResponse } from './units.service';

export type { Project, GetActiveProjectsResponse } from './projects.service';

export type {
  CreateInvoiceRequest,
  Invoice,
  CreateInvoiceResponse,
} from './invoices.service';

export type {
  UserProfile,
  GetUserProfileResponse,
} from './user.service';
