import { useState } from 'react';
import { invoicesService, CreateInvoiceRequest } from '../services/api';

export const useInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (data: CreateInvoiceRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoicesService.createInvoice(data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create invoice';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createInvoice,
    loading,
    error,
  };
};
