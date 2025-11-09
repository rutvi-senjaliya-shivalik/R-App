import { useState } from 'react';
import { projectsService } from '../services/api';

export const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getActiveProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectsService.getActiveProjects();
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch projects';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getActiveProjects,
    loading,
    error,
  };
};
