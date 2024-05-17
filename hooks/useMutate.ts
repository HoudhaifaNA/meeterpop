import { useSWRConfig } from "swr";

const useMutate = () => {
  const { mutate, cache } = useSWRConfig();
  const keysArray = Array.from(cache.keys());

  const refresh = (urlRegex: RegExp) => {
    keysArray.forEach((key) => {
      if (urlRegex.test(key)) {
        mutate(key);
      }
    });
  };

  return { refresh };
};

export default useMutate;
