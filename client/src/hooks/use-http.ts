import { useState, useCallback } from 'react';
import { StatusCode } from '../constants';

interface UseHttp {
  loading: boolean;
  error: string;
  request: (
    url: string,
    method?: string,
    body?: Object,
    headers?: HeadersInit,
    isLoading?: boolean,
  ) => Promise<any>;
  clearError: () => void;
}

export const useHttp = (defaultLoading: boolean): UseHttp => {
  const [loading, setLoading] = useState<boolean>(defaultLoading);
  const [error, setError] = useState<string>(null);

  const request = useCallback(async (
    url: string,
    method = 'GET',
    body: Object,
    headers: HeadersInit = {},
    isLoading = true,
  ) => {
    isLoading && setLoading(true);
    const reqHeaders = new Headers(headers);

    try {
      if (body) {
        body = JSON.stringify(body);
        reqHeaders.set('Content-Type', 'application/json');
      }

      const response = await fetch(url, { method, body, headers: reqHeaders } as RequestInit);
      const data = response.status !== StatusCode.NO_CONTENT
        && response.status !== StatusCode.NOT_FOUND
        && await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong');
      }

      isLoading && setLoading(false);

      return data;
    } catch (error) {
      isLoading && setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
