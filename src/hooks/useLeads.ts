import { useState } from 'react';
import { leadsService, CreateLeadRequest, UpdateLeadRequest } from '../services/api';

export const useLeads = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLead = async (data: CreateLeadRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.createLead(data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create lead';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLeads = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.getLeads(page, limit);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch leads';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLeadById = async (leadId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.getLeadById(leadId);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch lead details';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (leadId: string, data: UpdateLeadRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.updateLead(leadId, data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update lead';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (leadId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.deleteLead(leadId);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete lead';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getScheduledVisits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.getScheduledVisits();
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch scheduled visits';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rescheduleSiteVisit = async (
    leadId: string,
    data: { newSiteVisitDate: string; remark?: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.rescheduleSiteVisit(leadId, data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reschedule site visit';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStage = async (
    leadId: string,
    data: {
      newStage: string;
      remark?: string;
      lostReason?: string;
      siteVisitDate?: string;
    }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.updateLeadStage(leadId, data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update lead stage';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await leadsService.uploadDocument(file);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to upload document';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    getScheduledVisits,
    rescheduleSiteVisit,
    updateLeadStage,
    uploadDocument,
    loading,
    error,
  };
};
