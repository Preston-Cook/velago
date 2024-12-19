import { debounce } from 'lodash';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useQueryParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize the current params to prevent unnecessary recreations
  const currentParams = useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams],
  );

  const updateUrl = useCallback((url: string) => {
    // Use history.replaceState to update URL without triggering a reload
    window.history.replaceState(null, '', url);
  }, []);

  const debouncedReplace = useMemo(() => debounce(updateUrl, 300), [updateUrl]);

  // Use useCallback to memoize functions and prevent unnecessary re-renders
  const getQueryParam = useCallback(
    (key: string) => {
      return currentParams.get(key);
    },
    [currentParams],
  );

  const setQueryParam = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(currentParams);
      newParams.set(key, value);
      newParams.sort();

      const query = newParams.toString();
      debouncedReplace(`${pathname}?${query}`);
    },
    [pathname, currentParams, debouncedReplace],
  );

  const setQueryParamPriority = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(currentParams);
      newParams.set(key, value);
      newParams.sort();

      const query = newParams.toString();
      updateUrl(`${pathname}?${query}`);
    },
    [currentParams, pathname, updateUrl],
  );

  const deleteQueryParam = useCallback(
    (key: string) => {
      // Create a new URLSearchParams to avoid mutating the original
      const newParams = new URLSearchParams(currentParams);
      newParams.delete(key);

      const search = newParams.toString();
      const query = search ? `?${search}` : '';

      // Use history.replaceState to update URL
      updateUrl(`${pathname}${query}`);
    },
    [pathname, updateUrl, currentParams],
  );

  // Optionally add a method to reset all query params
  const resetQueryParams = useCallback(() => {
    updateUrl(pathname);
  }, [pathname, updateUrl]);

  return {
    setQueryParamPriority,
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
    resetQueryParams,
  };
}
