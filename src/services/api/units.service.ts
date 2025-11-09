import apiClient from './apiClient';

// Types
export interface Unit {
  _id: string;
  projectId: string;
  projectName: string;
  unitNumber: string;
  configuration: string;
  floor: string;
  facing: string;
  carpetArea: number;
  builtupArea: number;
  basePrice: number;
  totalPrice: number;
  pricePerSqFt: number;
  status: 'available' | 'sold' | 'blocked' | 'on-hold';
  holdHistory: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetUnitsByProjectResponse {
  projectId: string;
  projectName: string;
  count: number;
  units: Unit[];
}

class UnitsService {
  // Get units by project ID
  async getUnitsByProject(projectId: string): Promise<GetUnitsByProjectResponse> {
    try {
      const response = await apiClient.get<GetUnitsByProjectResponse>(
        `/units/project/${projectId}`
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new UnitsService();
