import { useSearchParams } from 'next/navigation';

const useGroupedParams = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const value = searchParams.get('value');
  const isDomain = type === 'domain' && value;

  return { isDomain, type, value } as const;
};

export default useGroupedParams;
