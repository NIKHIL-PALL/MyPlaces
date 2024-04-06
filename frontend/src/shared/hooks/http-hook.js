import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      const httpAbortCtrll = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrll);
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrll.signal,
        });
        const responseData = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl != httpAbortCtrll
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(response)
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrll) =>
        abortCtrll.abortCtrl.abort()
      );
    };
  }, []);
  return { isLoading, error, sendRequest,clearError };
};
