import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const cancelTokenSource = axios.CancelToken.source();
      activeHttpRequests.current.push(cancelTokenSource);

      try {
        const response = await axios({
          method,
          url,
          data: body,
          headers,
          cancelToken: cancelTokenSource.token,
        });
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== cancelTokenSource
        );
        setIsLoading(false);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((cancelTokenSource) =>
        cancelTokenSource.cancel()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
