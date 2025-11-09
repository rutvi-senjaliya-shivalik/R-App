import apiClient from './apiClient';

// Types
export interface CreateInvoiceRequest {
  bookingId: string;
  subTotal: number;
  gstPercentage: number;
  gstAmount: number;
  totalAmount: number;
  dateOfInvoice: string; // YYYY-MM-DD format
}

export interface Invoice {
  _id: string;
  bookingId: string;
  subTotal: number;
  gstPercentage: number;
  gstAmount: number;
  totalAmount: number;
  dateOfInvoice: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateInvoiceResponse {
  success: boolean;
  message: string;
  data: Invoice;
}

class InvoicesService {
  // Create a new invoice
  async createInvoice(data: CreateInvoiceRequest): Promise<CreateInvoiceResponse> {
    try {
      console.log('InvoicesService: Creating invoice');
      console.log('Data:', JSON.stringify(data, null, 2));
      
      const response = await apiClient.post<CreateInvoiceResponse>('/invoices', data);
      
      console.log('InvoicesService: Create invoice response:', JSON.stringify(response, null, 2));
      return response;
    } catch (error: any) {
      console.error('InvoicesService: Create invoice error:', error);
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

export default new InvoicesService();
