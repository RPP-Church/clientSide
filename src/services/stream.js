import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';

export const GetStream = () => {
  const axios = useAxiosPrivate();

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['stream'],
    queryFn: async () => {
      const { data } = await axios.get(`/stream`);

      return data;
    },
  });

  return {
    data,
    isFetching,
    refetch,
    isError,
    error,
  };
};
