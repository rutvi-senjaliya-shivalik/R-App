import apiClient from './apiClient';

class BookingsService {
  // Get total bookings count
  async getTotalBookingsCount(): Promise<{ count: number }> {
    try {
      const response = await apiClient.get<{ count: number }>(
        '/bookings/count/total'
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

export default new BookingsService();
