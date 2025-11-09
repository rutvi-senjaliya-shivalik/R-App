import apiClient from './apiClient';

// Types
export interface Project {
  _id: string;
  name: string;
  address: string;
  amenities: string[];
  images: string[];
  description: string;
  units: string[];
  isActive: boolean;
  launchDate: string;
  expectedCompletion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isCompleted: boolean;
  thumbnail?: string;
  budgetRange?: {
    min: number;
    max: number;
  };
}

export interface GetActiveProjectsResponse {
  count: number;
  projects: Project[];
}

class ProjectsService {
  // Get active projects
  async getActiveProjects(): Promise<GetActiveProjectsResponse> {
    try {
      const response = await apiClient.get<GetActiveProjectsResponse>(
        '/projects/active'
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

export default new ProjectsService();
