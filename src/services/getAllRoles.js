import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';

export const GetAllRoless = () => {
  const axios = useAxiosPrivate();

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['allRoles'],
    queryFn: async () => {
      const { data } = await axios.get(`/role`);

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
