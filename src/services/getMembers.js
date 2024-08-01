import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';

export const GetMembers = (query) => {
  console.log(query?.page);
  const axios = useAxiosPrivate();
  const params = `${`?page=${query.page || 1}`}`;

  console.log(params);
  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['getMember' + params],
    queryFn: async () => {
      const { data } = await axios.get(`/member${params}`);

      return data;
    },
    retry: false,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};
