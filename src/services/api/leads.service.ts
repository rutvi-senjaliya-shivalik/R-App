import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export interface CreateLeadRequest {
  clientName: string;
  clientContactNumber: string;
  clientEmail: string;
  projectId: string;
  projectName: string;
  unitId: string;
  minBudget: number;
  maxBudget: number;
  leadSource: string;
  remark: string;
  nextFollowupDate: string;
  documents: string[];
  stage: string;
}

export interface Lead {
  _id: string;
  cpId: string;
  cpUserId: string;
  unitId: string;
  projectId: string;
  projectName: string;
  budgetRange: {
    min: number;
    max: number;
  };
  clientName: string;
  clientContactNumber: string;
  clientEmail: string;
  leadSource: string;
  stage: string;
  nextFollowupDate: string;
  leadTimeline: Array<{
    newStage: string;
    date: string;
    remark: string;
  }>;
  documents: string[];
  siteVisitCompleted: boolean;
  convertedToBooking: boolean;
  remarks: Array<{
    description: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateLeadResponse {
  success: boolean;
  message: string;
  data: Lead;
}

export interface GetLeadsResponse {
  cpId: string;
  count: number;
  leads: Lead[];
}

// The API returns the lead object directly, not wrapped
export type GetLeadByIdResponse = Lead;

export interface UpdateLeadRequest {
  clientName?: string;
  clientContactNumber?: string;
  clientEmail?: string;
  projectId?: string;
  projectName?: string;
  unitId?: string;
  minBudget?: number;
  maxBudget?: number;
  leadSource?: string;
  remark?: string;
  nextFollowupDate?: string;
  documents?: string[];
  stage?: string;
}

export interface UpdateLeadResponse {
  success: boolean;
  message: string;
  data: Lead;
}

class LeadsService {
  // Decode JWT token to get user role
  private async getUserRole(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token exists:', !!token);
      if (!token) return null;

      // Decode JWT token (simple base64 decode of payload)
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      console.log('Decoded role:', decodedPayload.role);
      return decodedPayload.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Create a new lead
  async createLead(data: CreateLeadRequest): Promise<CreateLeadResponse> {
    try {
      const response = await apiClient.post<CreateLeadResponse>('/leads', data);
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get all leads (role-based, no pagination)
  async getLeads(page: number = 1, limit: number = 10): Promise<GetLeadsResponse> {
    try {
      const role = await this.getUserRole();
      console.log('User role for leads:', role);
      
      // Always use /my endpoint for now since /all requires special permissions
      const endpoint = '/leads/cp/my';
      
      console.log('Using endpoint:', endpoint);

      const response = await apiClient.get<GetLeadsResponse>(endpoint);
      console.log('API response:', response);
      return response;
    } catch (error: any) {
      console.error('getLeads error:', error);
      throw this.handleError(error);
    }
  }

  // Get lead by ID
  async getLeadById(leadId: string): Promise<GetLeadByIdResponse> {
    try {
      console.log('LeadsService: Fetching lead with ID:', leadId);
      const response = await apiClient.get<GetLeadByIdResponse>(`/leads/${leadId}`);
      console.log('LeadsService: Raw API response:', JSON.stringify(response, null, 2));
      return response;
    } catch (error: any) {
      console.error('LeadsService: Error fetching lead:', error);
      throw this.handleError(error);
    }
  }

  // Update lead
  async updateLead(
    leadId: string,
    data: UpdateLeadRequest
  ): Promise<UpdateLeadResponse> {
    try {
      const response = await apiClient.put<UpdateLeadResponse>(
        `/leads/${leadId}`,
        data
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete lead
  async deleteLead(leadId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(
        `/leads/${leadId}`
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get scheduled visits
  async getScheduledVisits(): Promise<GetLeadsResponse> {
    try {
      const response = await apiClient.get<GetLeadsResponse>(
        '/leads/site-visits/scheduled'
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get active leads count
  async getActiveLeadsCount(): Promise<{ count: number }> {
    try {
      const response = await apiClient.get<{ count: number }>(
        '/leads/count/active'
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Reschedule site visit
  async rescheduleSiteVisit(
    leadId: string,
    data: { newSiteVisitDate: string; remark?: string }
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('LeadsService: Rescheduling site visit');
      console.log('Lead ID:', leadId);
      console.log('Data:', JSON.stringify(data, null, 2));
      console.log('Full URL:', `/leads/${leadId}/site-visit/reschedule`);
      
      const response = await apiClient.patch<{ success: boolean; message: string }>(
        `/leads/${leadId}/site-visit/reschedule`,
        data
      );
      
      console.log('LeadsService: Reschedule response:', JSON.stringify(response, null, 2));
      return response;
    } catch (error: any) {
      console.error('LeadsService: Reschedule error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw this.handleError(error);
    }
  }

  // Update lead stage
  async updateLeadStage(
    leadId: string,
    data: {
      newStage: string;
      remark?: string;
      lostReason?: string;
      siteVisitDate?: string;
    }
  ): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      console.log('LeadsService: Updating lead stage');
      console.log('Lead ID:', leadId);
      console.log('Data:', JSON.stringify(data, null, 2));
      
      const response = await apiClient.patch<{ success: boolean; message: string; data?: any }>(
        `/leads/${leadId}/stage`,
        data
      );
      
      console.log('LeadsService: Update stage response:', JSON.stringify(response, null, 2));
      return response;
    } catch (error: any) {
      console.error('LeadsService: Update stage error:', error);
      throw this.handleError(error);
    }
  }

  // Upload document for lead
  async uploadDocument(file: any): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post<{ url: string }>(
        '/leads/upload-document',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error: any) {
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

export default new LeadsService();
