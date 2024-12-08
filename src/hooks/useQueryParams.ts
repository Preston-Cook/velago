import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

  function getQueryParam(key: string) {
    const val = currentParams.get(key);
    return val;
  }

  function setQueryParam(key: string, value: string) {
    currentParams.set(key, value);
    currentParams.sort();

    const query = currentParams.toString();

    router.replace(`${pathname}?${query}`);
  }

  function deleteQueryParam(key: string) {
    currentParams.delete(key);

    const search = currentParams.toString();
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}${query}`);
  }

  return { getQueryParam, setQueryParam, deleteQueryParam };
}
