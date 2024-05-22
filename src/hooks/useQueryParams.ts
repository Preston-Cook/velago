import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

  function setQueryParam(key: string, value: string) {
    currentParams.set(key, value);
    currentParams.sort();

    const q = currentParams.get('q');

    let query;

    if (q === null) {
      const search = currentParams.toString();
      query = search ? `?${search}` : '';
    } else {
      currentParams.delete('q');
      const search = currentParams.toString();
      query = search ? `?q=${q}&${search}` : `?q=${q}`;
    }

    router.push(`${pathname}${query}`);
  }

  function deleteQueryParam(key: string) {
    currentParams.delete(key);

    const search = currentParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  }

  return { setQueryParam, deleteQueryParam };
}
